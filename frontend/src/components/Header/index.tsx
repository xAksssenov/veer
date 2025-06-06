import { Link } from "react-router";
import cartIcon from "../../assets/svg/cart.svg";
import logoIcon from "/assets/img/logo_1.png";
import { ReactSVG } from "react-svg";
import styles from "./index.module.scss";
import { useState } from "react";

const Header = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/" className={styles.header__logo}>
          <img src={logoIcon} className={styles.header__icon} />
        </Link>

        <div className={styles.header__nav}>
          <Link to="/gallery" className={styles.header__button}>
            Галерея
          </Link>
          <Link to="/cart">
            <ReactSVG src={cartIcon} className={styles.icon} />
          </Link>
        </div>

        <div className={styles.header__burger} onClick={togglePopup}>
          <span className={styles.burger__line} />
          <span className={styles.burger__line} />
          <span className={styles.burger__line} />
        </div>
      </div>

      {isPopupOpen && (
        <div className={styles.popup} onClick={togglePopup}>
          <div className={styles.popup__content}>
            <nav className={styles.popup__nav}>
              <Link to="/gallery" className={styles.header__button}>
                Галерея
              </Link>
              <Link to="/cart" className={styles.header__button}>
                Корзина
              </Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
