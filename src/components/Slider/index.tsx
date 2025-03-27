import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./index.module.scss";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  "/assets/img/slider_1.png",
  "/assets/img/slider_2.png",
  "/assets/img/slider_3.png",
];

const ImageSlider = () => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <div className={styles.sliderWrapper}>
      <button
        className={styles.arrowLeft}
        onClick={() => sliderRef.current?.slickPrev()}
      >
        <FaChevronLeft />
      </button>
      <div className={styles.sliderContainer}>
        <Slider ref={sliderRef} {...settings}>
          {images.map((src, index) => (
            <div key={index} className={styles.slide}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className={styles.image}
              />
            </div>
          ))}
        </Slider>
      </div>
      <button
        className={styles.arrowRight}
        onClick={() => sliderRef.current?.slickNext()}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ImageSlider;
