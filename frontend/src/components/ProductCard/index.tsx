import { Link } from "react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cartSlice";
import { Card } from "../../Types/cardType";
import styles from "./index.module.scss";
import SuccessfullyAdded from "../SuccessfullyAdded";

const ProductCard = (props: Card) => {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addItemToCart({ id: props.id }));

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 3000);
  };

  return (
    <div>
      <div className={styles.card}>
        <Link to={`/card/${props.id}`} key={props.id} className={styles.link}>
          <img
            className={styles.link__img}
            src={props.image[0]}
            alt={`photo_${props.id}`}
            loading="lazy"
          />
          <p className={styles.link__title}>{props.title}</p>
          <p className={styles.link__price}>{`${props.price} ₽`}</p>
        </Link>
        <button className={styles.link__button} onClick={handleAddToCart}>
          Добавить в корзину
        </button>
      </div>
      {isAdded && <SuccessfullyAdded itemName={props.title} cart={isAdded} />}
    </div>
  );
};

export default ProductCard;
