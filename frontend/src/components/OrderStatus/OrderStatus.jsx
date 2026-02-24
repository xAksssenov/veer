import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Order from "../Order/Order";
import Clock from "./Clock";
import CheckMark from "./CheckMark";
import TruckDeliveryAnimation from "./Delivery";
import Box from "./Box";
import './OrderStatus.css';

export default function OrderStatus() {
    const { order_key } = useParams(); 
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        if (!order_key) return;

        async function fetchOrder() {
            setLoading(true);
            try {
                const res = await fetch(`http://127.0.0.1:8080/orders/order/${order_key}`);
                if (!res.ok) throw new Error("Заказ не найден");
                const data = await res.json();

                setOrder({
                    status: data.status,
                    title: data.item_title,
                    image: data.item_image.startsWith('http') 
                        ? data.item_image 
                        : `http://127.0.0.1:8080/${data.item_image}`,
                });
            } catch (err) {
                console.error(err);
                setOrder(null);
            } finally {
                setLoading(false);
            }
        }

        fetchOrder();
    }, [order_key]);

    if (loading) return <p style={{ color: "#fff" }}>Загрузка статуса...</p>;
    if (!order) return <p style={{ color: "#fff" }}>Заказ не найден</p>;

    // Настраиваем компонент для стикера, текст и описание
    let StatusComponent = null;
    let statusText = order.status;
    let statusProps = "";

    switch (order.status.toLowerCase()) {
        case "processing":
        case "в обработке":
            StatusComponent = Clock;
            statusText = "В обработке";
            statusProps = "Ваш заказ в обработке. Скоро мы всё проверим и отправим заказ";
            break;
        case "accepted":
        case "принят":
            StatusComponent = CheckMark;
            statusText = "Принят";
            statusProps = "Ваш заказ принят. Осталось дождаться отправки!";
            break;
        case "sent":
        case "отправлен":
            StatusComponent = TruckDeliveryAnimation;
            statusText = "Отправлен";
            statusProps = "Ваш заказ отправлен. Вы можете отследить его по трек номеру.";
            break;
        case "delivered":
        case "доставлен":
            StatusComponent = Box;
            statusText = "Доставлен";
            statusProps = "Ваш заказ должен быть у вас. Спасибо за доверие!";
            break;
        default:
            StatusComponent = () => <span>❔</span>;
            statusText = "Неизвестен";
            statusProps = "";
    }

    return (
        <div className="order-status">
            <span className="order-attention" title="Информация о заказе хранится только на вашем устройстве." onClick={() => alert("Информация о заказе хранится только на вашем устройстве. Если вы стёрли память или утеряли доступ к своему устройству, то отобразить этот заказ можно будет только через поддержку. Пожалуйста, во избежании неприятных ситуаций, запишите свой номер заказа.")}>!</span>           

            <div className={`status-card`}>
                <div className="status-sticker">
                    <StatusComponent />
                </div>
                <h2 className="status-text">{statusText}</h2>
                <p className="status-props">{statusProps}</p>
                <div className="status-order-key">Заказ №{order_key}</div>
            </div>

            <button className="details-button" onClick={() => setShowDetails(true)}>
                Показать подробности
            </button>

            {showDetails && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close-button" onClick={() => setShowDetails(false)}>×</button>
                        <Order orderKey={order_key} />
                    </div>
                </div>
            )}
        </div>
    );
}
