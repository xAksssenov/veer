from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
from django.conf import settings
import uuid
from .models import Payment


class CreatePaymentView(APIView):
    def post(self, request):
        amount = request.data.get("amount")
        customer = request.data.get("customer", {})
        items = request.data.get("items", [])
        
        if not amount or not customer or not items:
            return Response(
                {"error": "Missing required parameters"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        order_id = str(uuid.uuid4())
        amount_value = float(amount)
        
        receipt_items = []
        for item in items:
            receipt_items.append({
                "description": item.get("title", "Товар"),
                "quantity": str(item.get("quantity", 1)),
                "amount": {
                    "value": f"{float(item.get('price', 0)):.2f}",
                    "currency": "RUB"
                },
                "vat_code": "1",
                "payment_mode": "full_payment",
                "payment_subject": "commodity"
            })

        payload = {
            "amount": {
                "value": f"{amount_value:.2f}",
                "currency": "RUB"
            },
            "capture": True,
            "confirmation": {
                "type": "redirect",
                "return_url": "http://localhost:5173/"
            },
            "description": f"Order {order_id}",
            "receipt": {
                "customer": {
                    "email": customer.get("email", ""),
                    "phone": customer.get("phone", ""),
                    "full_name": customer.get("name", "")
                },
                "items": receipt_items
            },
            "metadata": {
                "customer_name": customer.get("name", ""),
                "customer_address": customer.get("address", ""),
                "order_id": order_id
            },
            "test": True
        }

        try:
            response = requests.post(
                'https://api.yookassa.ru/v3/payments',
                auth=(settings.YOOKASSA_SHOP_ID, settings.YOOKASSA_SECRET_KEY),
                json=payload,
                headers={"Idempotence-Key": order_id}
            )
            data = response.json()

            if response.status_code == 200:
                Payment.objects.create(
                    order_id=order_id,
                    amount=amount,
                    payment_id=data["id"],
                    status=data["status"],
                    customer_email=customer.get("email", ""),
                    customer_phone=customer.get("phone", ""),
                    customer_name=customer.get("name", "")
                )
                return Response({
                    "confirmation_url": data["confirmation"]["confirmation_url"],
                    "payment_id": data["id"]
                })
            
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response(
                {"error": str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )