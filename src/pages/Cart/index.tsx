import BreadCrumbs from "../../components/BreadCrumbs";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import styles from "./index.module.scss";
import { ReactSVG } from "react-svg";
import addSvg from "../../assets/svg/add.svg";
import deleteSvg from "../../assets/svg/delete.svg";
import cross from "../../assets/svg/cross.svg";
import emptyCartImg from "../../assets/svg/cart.svg";
import {
  selectCart,
  removeItemFromCart,
  updateItemQuantity,
} from "../../store/cartSlice";

const Cart = () => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);

  const breadCrumbs = [
    {
      id: 1,
      title: "Главная",
      link: "/",
    },
    {
      id: 2,
      title: "Корзина",
      link: "#",
    },
  ];

  return (
    <div>
      <BreadCrumbs items={breadCrumbs} />

      <h2 className={styles.title}>Корзина</h2>

      {cart.length ? (
        <>
          {cart.map((item) => (
            <div key={item.id} className={styles.product}>
              <Link to={`/card/${item.id}`} className={styles.product__section}>
                <img
                  className={styles.product__image}
                  src={item.card.image[0]}
                  alt={item.card.title}
                />
                <div className={styles.product__group}>
                  <p className={styles.product__title}>{item.card.title}</p>
                  <p className={styles.product__description}>
                    {item.card.description}
                  </p>
                </div>
              </Link>

              <div className={styles.product__cost}>
                <p className={styles.product__price}>
                  {item.card.price * item.quantity} ₽
                </p>

                <div className={styles.product__addDelete}>
                  <ReactSVG
                    onClick={() =>
                      dispatch(
                        updateItemQuantity({
                          id: item.id,
                          quantity: item.quantity - 1,
                        })
                      )
                    }
                    src={deleteSvg}
                    className={styles.product__icon}
                  />
                  <p className={styles.product__quantity}>{item.quantity}</p>
                  <ReactSVG
                    onClick={() =>
                      dispatch(
                        updateItemQuantity({
                          id: item.id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                    src={addSvg}
                    className={styles.product__icon}
                  />
                </div>
              </div>

              <ReactSVG
                onClick={() => dispatch(removeItemFromCart(item.id))}
                src={cross}
                className={styles.product__cross}
              />
            </div>
          ))}
          <div className={styles.checkoutContainer}>
            <div className={styles.agreement}>
              <input
                type="checkbox"
                id="agreement"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <label htmlFor="agreement">
                Я согласен с{" "}
                <Link to="/terms">пользовательским соглашением</Link>
              </label>
            </div>
            <button className={styles.orderButton} disabled={!isChecked}>
              Оформить заказ
            </button>
          </div>
        </>
      ) : (
        <div className={styles.emptyCart}>
          <img
            src={emptyCartImg}
            alt="Корзина пуста"
            className={styles.emptyCart__img}
          />
          <h3 className={styles.emptyCart__title}>Ваша корзина пуста</h3>
          <p className={styles.emptyCart__text}>
            Добавьте товары, чтобы увидеть их здесь.
          </p>
          <Link to="/" className={styles.emptyCart__button}>
            Перейти в каталог
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
