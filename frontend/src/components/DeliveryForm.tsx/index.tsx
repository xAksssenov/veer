import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { ReactSVG } from "react-svg";
import cross from "../../assets/svg/cross.svg";

interface CartItem {
  id: number;
  quantity: number;
  card: {
    title: string;
    price: number;
    images: string[];
    description: string;
  };
}

interface DeliveryFormProps {
  totalAmount: number;
  cart: CartItem[];
  onConfirm: (formData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    deliveryMethod: string;
    promocode?: string;
  }) => void;
  onClose: () => void;
}

const DeliveryForm: React.FC<DeliveryFormProps> = ({
  totalAmount,
  cart,
  onConfirm,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    deliveryMethod: "CDEK",
    promocode: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [promoValid, setPromoValid] = useState<boolean | null>(null);
  const [discount, setDiscount] = useState(0);
  const [checkingPromo, setCheckingPromo] = useState(false);

  // Опции доставки
  const deliveryOptions = [
    { value: "CDEK", label: "СДЭК" },
    { value: "YANDEX", label: "Яндекс Доставка" },
    { value: "BOXBERY", label: "Boxberry" },
  ];

  // Дебаунс-проверка промокода
  useEffect(() => {
    if (!formData.promocode.trim()) {
      setPromoValid(null);
      setDiscount(0);
      return;
    }

    const timeout = setTimeout(() => {
      setCheckingPromo(true);
      fetch("https://veerutility.ru/promocodes/")
      // fetch("http://127.0.0.1:8000/promocodes/")
        .then((res) => res.json())
        .then((data) => {
          const promo = data.find(
            (p: any) =>
              p.promocode.toLowerCase() === formData.promocode.toLowerCase()
          );
          if (promo) {
            setPromoValid(true);
            setDiscount(promo.discount_percent);
          } else {
            setPromoValid(false);
            setDiscount(0);
          }
        })
        .catch(() => {
          setPromoValid(false);
          setDiscount(0);
        })
        .finally(() => setCheckingPromo(false));
    }, 500);

    return () => clearTimeout(timeout);
  }, [formData.promocode]);

  const handleChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isChecked) {
      alert("Необходимо согласие с условиями");
      return;
    }
    if (promoValid === false) {
      alert("Промокод неверный");
      return;
    }
    onConfirm(formData);
    Payment();
  };

  async function Payment(){
    try {
      const response = await fetch("https://veerutility.ru/payment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: finalAmount,
          email: formData.email,
          description: `Оплата заказа на сумму ${finalAmount} ₽`,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Ошибка создания платежа");
      }
  
      const data = await response.json();
  
      if (data.confirmation && data.confirmation.confirmation_url) {
        // Перенаправляем пользователя на Юкассу
        window.location.href = data.confirmation.confirmation_url;
      } else {
        alert("Ошибка: не удалось получить ссылку на оплату");
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка при оплате. Попробуйте позже.");
    }
  };
  

  const finalAmount = discount
    ? Math.round(totalAmount - (totalAmount * discount) / 100)
    : totalAmount;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.deliveryForm}>
        <ReactSVG onClick={onClose} src={cross} className={styles.cross} />
        <h3 className={styles.formTitle}>Оформление заказа</h3>

        <form onSubmit={handleSubmit}>
          {/* Имя */}
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Ваше ФИО"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={styles.formInput}
              required
            />
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={styles.formInput}
              required
            />
          </div>

          {/* Телефон */}
          <div className={styles.formGroup}>
            <input
              type="tel"
              placeholder="Телефон"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={styles.formInput}
              pattern="[+]{0,1}[0-9\s\-\(\)]+"
              inputMode="tel"
              required
            />
          </div>

          {/* Доставка */}
          <div className={styles.formGroup}>
            <select
              value={formData.deliveryMethod}
              onChange={(e) => handleChange("deliveryMethod", e.target.value)}
              className={styles.formInput}
              required
            >
              {deliveryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Адрес */}
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Адрес ближайшего пункта выдачи"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className={styles.formInput}
              required
            />
          </div>

          {/* Промокод */}
          <div className={styles.formGroup} style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Промокод"
              value={formData.promocode}
              onChange={(e) => handleChange("promocode", e.target.value)}
              className={styles.formInput}
            />
            {promoValid !== null && !checkingPromo && (
              <span
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "22px",
                  color: promoValid ? "green" : "red",
                }}
              >
                {promoValid ? "✓" : "X"}
              </span>
            )}
          </div>

          {/* Итог */}
          <div className={styles.orderSummary}>
            <h4 className={styles.summaryTitle}>Ваш заказ:</h4>
            {cart.map((item) => (
              <div key={item.id} className={styles.orderItem}>
                <span className={styles.itemName}>
                  {item.card.title} х {item.quantity}
                </span>
                <span className={styles.itemPrice}>
                  {item.card.price * item.quantity} ₽
                </span>
              </div>
            ))}
            <div className={styles.orderTotal}>
              <strong>Итого:</strong>
              <strong>
                {finalAmount} ₽
                {discount ? ` (-${discount}%)` : ""}
              </strong>
            </div>
          </div>

          {/* Согласие */}
          <div className={styles.agreement}>
            <input
              type="checkbox"
              id="deliveryAgreement"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className={styles.checkbox}
            />
            <label htmlFor="deliveryAgreement">
              Я согласен с{" "}
              <Link to="/terms" className={styles.termsLink}>
                пользовательским соглашением
              </Link>
            </label>
          </div>

          {/* Кнопка */}
          <div className={styles.checkoutContainer}>
            <button type="submit" className={styles.orderButton} disabled={!isChecked || promoValid === false}>Подтвердить заказ</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeliveryForm;
