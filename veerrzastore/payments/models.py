from django.db import models

class Payment(models.Model):
    DELIVERY_CHOICES = [
        ('CDEK', 'СДЭК'),
        ('YANDEX', 'Яндекс Доставка'),
        ('BOXBERY', 'Boxberry'),
    ]

    order_id = models.CharField(max_length=255)
    payment_id = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50)
    customer_email = models.EmailField(blank=True, null=True)
    customer_phone = models.CharField(max_length=20, blank=True, null=True)
    customer_name = models.CharField(max_length=100, blank=True, null=True)
    delivery_method = models.CharField(
        max_length=20, 
        choices=DELIVERY_CHOICES, 
        null=True, 
        blank=True
    )
    delivery_address = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.order_id} - {self.amount}"