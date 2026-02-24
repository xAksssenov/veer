import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Order.css';

export default function Order() {
    const { order_key } = useParams(); // <-- обращаем внимание на точное имя параметра из маршрута
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log(order_key);

    useEffect(() => {
        if (!order_key) { // если ключа нет, выходим
            setLoading(false);
            setError("Некорректный заказ");
            return;
        }

        async function fetchOrder() {
            try {
                const res = await fetch(`http://127.0.0.1:8080/orders/order/${order_key}`);
                if (!res.ok) throw new Error("Заказ не найден");
                const data = await res.json();

                if (!data || !data.id) throw new Error("Заказ не найден");

                setOrder({
                    id: data.id,
                    status: data.status,
                    order_key: data.order_key,
                    createdAt: new Date(data.created_at || Date.now()).toLocaleDateString("ru-RU"),
                    items: [{
                        id: data.item_id,
                        title: data.item_title,
                        price: data.item_price,
                        image: data.item_image.startsWith('http') ? data.item_image : `http://127.0.0.1:8080/${data.item_image}`
                    }],
                    client: {
                        name: data.client_name,
                        email: data.client_email,
                        phone: data.client_phone,
                        address: data.client_address,
                        promocode: data.client_promocode,
                    },
                    delivery: data.order_delivery,
                    trackingNumber: data.tracking_number,
                });
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false); // <- ключевой момент, всегда снимаем загрузку
            }
        }

        fetchOrder();
    }, [order_key]);

    if (loading) return <p>Загрузка заказа...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!order) return <p>Заказ не найден</p>;

    const total = order.items.reduce((s, i) => s + i.price, 0);

    return (
        <div className="order">
            <h1>Заказ #{order.order_key}</h1>
            <p>Статус: <strong>{order.status}</strong></p>
            <p>Дата: {order.createdAt}</p>
            <p>Сумма: {total} ₽</p>
            <p>Доставка: {order.delivery}</p>
            <p>Трек-номер: {order.trackingNumber || "-"}</p>

            <h2>Клиент</h2>
            <p>ФИО: {order.client.name}</p>
            <p>Email: {order.client.email}</p>
            <p>Телефон: {order.client.phone}</p>
            <p>Адрес: {order.client.address}</p>
            <p>Промокод: {order.client.promocode || "-"}</p>

            <h2>Товары</h2>
            <div className="order__items">
                {order.items.map(item => (
                    <div key={item.id} className="order__card">
                        <img src={item.image} alt={item.title} className="order__card-image" />
                        <h3>{item.title}</h3>
                        <p>{item.price} ₽</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
