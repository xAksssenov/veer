import { useState } from "react";
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
    image: string[];
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
  });
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isChecked) {
      alert("Необходимо согласие с условиями");
      return;
    }
    onConfirm(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.deliveryForm}>
        <ReactSVG onClick={onClose} src={cross} className={styles.cross} />
        <h3 className={styles.formTitle}>Оформление заказа</h3>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Ваше имя"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={styles.formInput}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={styles.formInput}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="tel"
              placeholder="Телефон"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className={styles.formInput}
              pattern="[+]{0,1}[0-9\s\-\(\)]+"
              inputMode="tel"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Адрес доставки"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className={styles.formInput}
              required
            />
          </div>

          <div className={styles.orderSummary}>
            <h4 className={styles.summaryTitle}>Ваш заказ:</h4>
            {cart.map((item) => (
              <div key={item.id} className={styles.orderItem}>
                <span className={styles.itemName}>
                  {item.card.title} × {item.quantity}
                </span>
                <span className={styles.itemPrice}>
                  {item.card.price * item.quantity} ₽
                </span>
              </div>
            ))}
            <div className={styles.orderTotal}>
              <strong>Итого:</strong>
              <strong>{totalAmount} ₽</strong>
            </div>
          </div>

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

          <div className={styles.checkoutContainer}>
            <button
              type="submit"
              className={styles.orderButton}
              disabled={!isChecked}
            >
              Подтвердить заказ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeliveryForm;
