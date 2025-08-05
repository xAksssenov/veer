import styles from "./index.module.scss";
import ProductList from "../../components/ProductCard/ProductList";
import ImageSlider from "../../components/Slider";

const Home = () => {
  return (
    <div>
      <ImageSlider />

      <section className={styles.brandPhilosophy}>
        <h2 className={styles.brandPhilosophy__title}>
          Мы верим в качество для всех
        </h2>
        <p className={styles.brandPhilosophy__text}>
          Мы верим, что высокое качество не должно быть привилегией. Наши
          продукты разрабатываются с вниманием к каждой детали и использованием
          лучших материалов, чтобы вы могли наслаждаться долговечностью и
          стилем, не переплачивая. Наша идея в том, что каждый человек имеет
          право носить стильную и качественную одежду, которая имеет свою
          философию, и она должна быть ему доступна.
        </p>
        <blockquote className={styles.brandPhilosophy__slogan}>
          Будь ярким изнутри, и таинственно мрачным снаружи с Veer&Rza
        </blockquote>
      </section>

      <section className={styles.products}>
        <div className={styles.cards}>
          <ProductList />
        </div>
      </section>
    </div>
  );
};

export default Home;
