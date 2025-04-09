import styles from "./index.module.scss";

const SuccessfullyAdded = (props: { itemName: string; cart: boolean }) => {
  return (
    <div className={styles.add}>
      <p className={styles.add__title}>Товар: {props.itemName}</p>
      {props.cart && (
        <p className={styles.add__text}>Успешно добавлен в корзину</p>
      )}
    </div>
  );
};

export default SuccessfullyAdded;
