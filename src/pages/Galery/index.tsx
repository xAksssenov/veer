import styles from "./index.module.scss";

const images = [
  "/assets/img/gal_1.jpg",
  "/assets/img/gal_2.jpg",
  "/assets/img/gal_3.jpg",
  "/assets/img/gal_4.jpg",
  "/assets/img/gal_5.jpg",
  "/assets/img/gal_6.jpg",
  "/assets/img/gal_7.jpg",
  "/assets/img/gal_8.jpg",
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
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
