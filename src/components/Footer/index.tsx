import { FaTelegram } from "react-icons/fa";
import avitoIcon from "../../assets/svg/avito.svg";
import { ReactSVG } from "react-svg";
import styles from "./index.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBottom}>
        <span>© 2025 VEER&RZA</span>
        <div className={styles.socialLinks}>
          <div className={styles.socialItem}>
            <a
              href="https://t.me/veerrza"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
            >
              <FaTelegram size={32} />
            </a>
          </div>
          <div className={styles.socialItem}>
            <a
              href="https://avito.ru/brands/48b7c944caab3c6f9cab563ca0a0eeda"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Avito"
            >
              <ReactSVG src={avitoIcon} className={styles.avitoIcon} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
