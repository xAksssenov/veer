import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './CheckOrders.css';

export default function CheckOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const orderKeys = JSON.parse(localStorage.getItem("order_keys") || "[]");
        if (!orderKeys.length) {
            setLoading(false);
            return;
        }

        async function fetchOrders() {
            try {
                const fetchedOrders = [];
                for (const key of orderKeys) {
                    const res = await fetch(`http://127.0.0.1:8080/orders/order/${key}`);
                    if (res.ok) {
                        const data = await res.json();
                        fetchedOrders.push({
                            id: data.id,
                            status: data.status,
                            order_key: data.order_key,
                            createdAt: new Date(data.created_at || Date.now()).toLocaleDateString("ru-RU"),
                            items: [{
                                id: data.item_id,
                                title: data.item_title,
                                price: data.item_price,
                                image: "https://www.imfdb.org/images/thumb/7/7c/BornFourth_019.JPG/750px-BornFourth_019.JPG"
                            }]
                        });
                    }
                }
                setOrders(fetchedOrders);
            } catch (err) {
                console.error("Ошибка при загрузке заказов:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, []);

    if (loading) return <p style={{ color: "#fff" }}>Загрузка заказов...</p>;
    if (!orders.length) return <p style={{ color: "#fff" }}>У вас пока нет заказов.</p>;

    return (
        <div className="orders">
            {orders.map(order => {
                const total = order.items.reduce((s, i) => s + i.price, 0);

                return (
                    <div
                        key={order.id}
                        className="orders__order"
                        onClick={() => navigate(`/order/${order.order_key}`)}
                        style={{ cursor: "pointer" }}
                    >
                        <div className="orders__order-header">
                            <span>Заказ #{order.order_key}</span>
                            <span>{order.createdAt}</span>
                            <span className="orders__order-total">{total} ₽</span>
                        </div>

                        <div className="orders__items">
                            {order.items.map(item => (
                                <div key={item.id} className="orders__card">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="orders__card-image"
                                    />
                                    <h2 className="orders__card-title">{item.title}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
