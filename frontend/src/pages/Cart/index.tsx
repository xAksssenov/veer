import { useEffect, useState } from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
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
  clearCart,
} from "../../store/cartSlice";
import axios from "axios";
import DeliveryForm from "../../components/DeliveryForm.tsx";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

const API_BASE = "http://81.177.136.42:8000";

const Cart = () => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const breadCrumbs = [
    { id: 1, title: "Главная", link: "/" },
    { id: 2, title: "Корзина", link: "#" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      if (cart.length === 0) {
        setProducts([]);
        return;
      }
      setLoading(true);
      setError(null);

      try {
        const idsQuery = cart.map((item) => item.id).join(",");
        const response = await axios.get<Product[]>(`${API_BASE}/items`, {
          params: { ids: idsQuery },
        });
        setProducts(response.data);
      } catch {
        setError("Ошибка при загрузке товаров из корзины");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [cart]);

  const cartWithProductData = cart
    .map((item) => ({
      ...item,
      card: products.find((p) => p.id === item.id),
    }))
    .filter((item) => item.card !== undefined) as {
    id: number;
    quantity: number;
    card: Product;
  }[];

  const totalAmount = cartWithProductData.reduce((sum, item) => {
    if (!item.card) return sum;
    return sum + item.card.price * item.quantity;
  }, 0);

  const handleOrderConfirm = async (formData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    deliveryMethod: string;
  }) => {
    try {
      const response = await axios.post(
        "https://api.veerrzastore.ru/api/payments/create-payment/",
        {
          amount: totalAmount,
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
          },
          items: cartWithProductData.map((item) => ({
            id: item.id,
            title: item.card?.title,
            quantity: item.quantity,
            price: item.card?.price,
          })),
          delivery_method: formData.deliveryMethod,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        dispatch(clearCart());
        localStorage.setItem("currentPayment", response.data.payment_id);
        window.location.href = response.data.confirmation_url;
      }
    } catch (error) {
      console.error("Ошибка при создании платежа", error);
    }
  };

  const SKELETON_COUNT = 3;

  return (
    <div>
      <BreadCrumbs items={breadCrumbs} />

      <h2 className={styles.title}>Корзина</h2>

      {loading ? (
        <>
          {[...Array(SKELETON_COUNT)].map((_, index) => (
            <div
              key={index}
              className={styles.product}
              style={{ display: "flex", alignItems: "center", marginBottom: 20 }}
            >
              <div className={`${styles.skeleton} ${styles.skeletonImage}`}></div>
              <div style={{ flex: 1 }}>
                <div className={`${styles.skeleton} ${styles.skeletonText}`}></div>
                <div
                  className={`${styles.skeleton} ${styles.skeletonText} ${styles.skeletonTextShort}`}
                ></div>
                <div className={`${styles.skeleton} ${styles.skeletonPrice}`}></div>
              </div>
            </div>
          ))}
        </>
      ) : error ? (
        <p>{error}</p>
      ) : cart.length ? (
        <>
          {cartWithProductData.map((item) => {
            if (!item.card) return null;

            const imageUrl =
              Array.isArray(item.card.images) && item.card.images.length > 0
                ? item.card.images[0]
                : "";

            return (
              <div key={item.id} className={styles.product}>
                <Link to={`/card/${item.id}`} className={styles.product__section}>
                  <img
                    className={styles.product__image}
                    src={imageUrl}
                    alt={item.card.title || "Товар"}
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
            );
          })}

          <div className={styles.checkoutContainer}>
            <button
              className={styles.orderButton}
              onClick={() => setShowForm(true)}
            >
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

      {showForm && cartWithProductData.length > 0 && (
        <DeliveryForm
          totalAmount={totalAmount}
          cart={cartWithProductData}
          onConfirm={handleOrderConfirm}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Cart;
