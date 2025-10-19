import { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./index.module.scss";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ImageSlider = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://veerutility.ru/slider-images/")
    // fetch("http://127.0.0.1:8000/slider-images/")
      .then((res) => res.json())
      .then((data) => {
        const urls = data.map((item: { image_url: string }) => item.image_url);
        setImages(urls);
      })
      .catch((err) => console.error("Ошибка загрузки изображений:", err))
      .finally(() => setLoading(false));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
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
        {loading ? (
          <div className={styles.skeletonWrapper}>
            {[...Array(2)].map((_, i) => (
              <div key={i} className={styles.skeletonSlide}></div>
            ))}
          </div>
        ) : (
          <Slider ref={sliderRef} {...settings}>
            {images.map((src, index) => (
              <div key={index} className={styles.slide}>
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className={styles.image}
                  loading="lazy"
                />
              </div>
            ))}
          </Slider>
        )}
      </div>
      <button
        className={styles.arrowRight}
        onClick={() => sliderRef.current?.slickNext()}
      >
        <FaChevronRight />
      </button>
      <h1 className={styles.overlayText}>VEER&RZA</h1>
    </div>
  );
};

export default ImageSlider;
