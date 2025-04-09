import styles from "./index.module.scss";

const images = [
  "/assets/img/gal_1.webp",
  "/assets/img/gal_2.webp",
  "/assets/img/gal_3.webp",
  "/assets/img/gal_4.webp",
  "/assets/img/gal_5.webp",
  "/assets/img/gal_6.webp",
  "/assets/img/gal_7.webp",
  "/assets/img/gal_8.webp",
];

const Gallery = () => {
  return (
    <div className={styles.gallery}>
      {images.map((image, index) => (
        <div key={index} className={styles.galleryItem}>
          <img
            src={image}
            alt={`Gallery Image ${index + 1}`}
            className={styles.image}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
