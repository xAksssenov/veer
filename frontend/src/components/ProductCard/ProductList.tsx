import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { Card } from "../../Types/cardType";
import styles from "./index.module.scss";

const ProductList = () => {
    const [items, setItems] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://81.177.136.42:8000/items/")
            .then((res) => res.json())
            .then((data) => {
                const processed = data.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    description: item.description,
                    gender: item.gender,
                    image: [item.images[0]], // ❗️только первая картинка
                }));
                setItems(processed);
            })
            .catch((error) => {
                console.error("Ошибка при загрузке:", error);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Загрузка товаров...</p>;

    return (
        <div className={styles["grid-items"]}>
            {items.map((item) => (
                <ProductCard key={item.id} {...item} />
            ))}
        </div>
    );
};

export default ProductList;
