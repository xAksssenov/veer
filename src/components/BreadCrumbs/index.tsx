import { Link } from "react-router";
import { ReactSVG } from "react-svg";
import Arrow from "../../assets/svg/arrowRight.svg";
import styles from "./index.module.scss";

interface BreadCrumb {
  id: number;
  title: string;
  link: string;
}

interface BreadCrumbsProps {
  items: Array<BreadCrumb>;
}

const BreadCrumbs = ({ items }: BreadCrumbsProps) => {
  return (
    <div className={styles.nav}>
      {items.map((item, index) => (
        <div key={item.id} className={styles.nav__item}>
          <Link className={styles.nav__link} to={item.link}>
            <p className={styles.nav__title}>{item.title}</p>
          </Link>
          {index < items.length - 1 && (
            <ReactSVG src={Arrow} className={styles.nav__arrow} />
          )}
        </div>
      ))}
    </div>
  );
};

export default BreadCrumbs;
