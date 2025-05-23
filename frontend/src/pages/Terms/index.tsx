import { Link } from "react-router";
import styles from "./index.module.scss";

const Terms = () => {
  return (
    <div className={styles.termsContainer}>
      <h1 className={styles.title}>Пользовательское соглашение</h1>
      <p>
        Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует
        отношения между интернет-магазином Veer&Rza и пользователями
        (покупателями) сайта veer-rza.com.
      </p>
      <h2>1. Общие положения</h2>
      <p>
        1.1. Использование сайта означает согласие пользователя с условиями
        настоящего Соглашения.
      </p>
      <p>
        1.2. Администрация сайта оставляет за собой право изменять условия
        Соглашения без предварительного уведомления пользователей.
      </p>
      <h2>2. Оформление заказа</h2>
      <p>
        2.1. Пользователь оформляет заказ через корзину на сайте, указывая
        необходимые данные для доставки.
      </p>
      <p>
        2.2. После оформления заказа на указанный email пользователя приходит
        подтверждение с деталями заказа.
      </p>
      <h2>3. Оплата и доставка</h2>
      <p>
        3.1. Оплата товаров осуществляется удобным способом, указанным на сайте.
      </p>
      <p>
        3.2. Доставка товаров осуществляется по указанному пользователем адресу
        согласно условиям доставки интернет-магазина.
      </p>
      <h2>4. Возврат и обмен</h2>
      <p>
        4.1. Пользователь имеет право на возврат или обмен товара в течение 14
        дней с момента получения, если товар не был в употреблении и сохранена
        его упаковка.
      </p>
      <p>
        4.2. Возврат денежных средств производится после проверки товара
        интернет-магазином.
      </p>
      <h2>5. Заключительные положения</h2>
      <p>
        5.1. В случае возникновения вопросов и претензий пользователь может
        обратиться в службу поддержки интернет-магазина.
      </p>
      <p>
        5.2. Все споры разрешаются путем переговоров, а при невозможности
        урегулирования – в судебном порядке в соответствии с законодательством
        РФ.
      </p>
      <Link to="/cart" className={styles.backButton}>
        Назад в корзину
      </Link>
    </div>
  );
};

export default Terms;
