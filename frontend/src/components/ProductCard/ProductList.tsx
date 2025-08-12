import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { Card } from "../../Types/cardType";
import styles from "./index.module.scss";

const ProductList = () => {
    const [items, setItems] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://veerutility.ru/items/")
            .then((res) => res.json())
            .then((data) => {
                const processed = data.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    description: item.description,
                    gender: item.gender,
                    image: [item.images[0]],
                }));
                setItems(processed);
            })
            .catch((error) => {
                console.error("Ошибка при загрузке:", error);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className={styles["grid-items"]}>
            {loading
                ? [...Array(6)].map((_, i) => (
                    <div key={i} className={styles["product-list__skeleton"]}>
                        <div className={styles["product-list__skeleton-img"]}></div>
                        <div className={styles["product-list__skeleton-text"]}></div>
                        <div className={styles["product-list__skeleton-text"]}></div>
                        <div className={styles["product-list__skeleton-btn"]}></div>
                    </div>
                ))
                : items.map((item) => (
                    <ProductCard key={item.id} {...item} />
                ))}
        </div>
    );
};

export default ProductList;
