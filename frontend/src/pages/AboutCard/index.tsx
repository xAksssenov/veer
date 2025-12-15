import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { useParams } from "react-router";
import BreadCrumbs from "../../components/BreadCrumbs";
import SuccessfullyAdded from "../../components/SuccessfullyAdded";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cartSlice";
import axios from "axios";

const API_BASE = "https://api.veerutility.ru";

interface CardType {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  image?: string[]; // для совместимости с фронтом
}

const AboutCard = () => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<CardType | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [openSection, setOpenSection] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAddedCart, setIsAddedCart] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();

  const fetchCard = async (id: string) => {
    try {
      const response = await axios.get(`${API_BASE}/items/item/${id}`);
      const data = response.data;
      const cardWithImage = { ...data, image: data.images }; // адаптируем для фронта
      setCard(cardWithImage);
      setSelectedImage(data.images[0]);
    } catch (error) {
      console.error("Ошибка при загрузке карточки:", error);
    }
  };

  useEffect(() => {
    if (id) fetchCard(id);
  }, [id]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleSection = (section: string) => {
    setOpenSection((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleAddToCart = () => {
    if (!card) return;

    dispatch(addItemToCart({ id: card.id }));
    setIsAddedCart(true);
    setIsVisible(true);

    setTimeout(() => {
      setIsAddedCart(false);
      setIsVisible(false);
    }, 3000);
  };

  const handleImageSelect = (img: string) => {
    setSelectedImage(img);
  };

  const breadCrumbs = [
    { id: 1, title: "Главная", link: "/" },
    { id: 2, title: card?.title || "Товар", link: `/card/${id}` },
  ];

  return (
    <div>
      <BreadCrumbs items={breadCrumbs} />

      {card ? (
        <div className={styles.product}>
          <div className={styles.gallery}>
            <div className={styles.gallery__thumbnails}>
              {card.image?.map((img, index) => (
                <img
                  key={index}
                  src={`https://api.veerutility.ru/${img}`}
                  alt={`Thumbnail ${index}`}
                  className={`${styles.thumbnail} ${
                    selectedImage === img ? styles.thumbnail__active : ""
                  }`}
                  onClick={() => handleImageSelect(img)}
                  loading="eager"
                />
              ))}
            </div>
            <img
              className={styles.gallery__img}
              src={selectedImage || card.image?.[0]}
              alt={card.title}
              onClick={toggleFullscreen}
              loading="eager"
            />
          </div>

          <div className={styles.details}>
            <div className={styles.details__section}>
              <h1 className={styles.details__title}>{card.title}</h1>
              <p className={styles.details__price}>{card.price} ₽</p>
            </div>

            <p className={styles.details__description}>{card.description}</p>

            <div className={styles.buttons}>
              <button
                onClick={handleAddToCart}
                className={styles.buttons__cart}
              >
                Добавить в корзину
              </button>
            </div>

            <div className={styles.additional}>
              {["description", "delivery"].map((section) => (
                <div key={section}>
                  <button
                    className={`${styles.additional__title} ${
                      openSection.includes(section) ? styles.open : ""
                    }`}
                    onClick={() => toggleSection(section)}
                  >
                    {section === "description" && "Описание и состав:"}
                    {section === "delivery" && "Доставка:"}
                    <span className={styles.arrow} />
                  </button>
                  {openSection.includes(section) && (
                    <div className={styles.additional__content}>
                      {section === "description" && (
                        <p>
                          Этот товар изготовлен из высококачественных
                          материалов, обеспечивающих долгий срок службы.
                        </p>
                      )}
                      {section === "delivery" && (
                        <p>
                          Доставка заказов осуществляется преимущественно службой СДЭК, также возможна отправка через Яндекс.Доставку. Отправка товаров производится по понедельникам и четвергам. Исключение составляют лимитированные коллекции и предзаказы, условия доставки которых указываются отдельно для каждой позиции. Сроки доставки: в среднем 4–5 дней (Москва – 1 день, для близлежащих регионов – быстрее).
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {isVisible && (
            <SuccessfullyAdded itemName={card.title} cart={isAddedCart} />
          )}
        </div>
      ) : (
        <h3 className={styles.loading}>Загрузка страницы...</h3>
      )}

      {isFullscreen && (
        <div className={styles.fullscreen} onClick={toggleFullscreen}>
          <img
            className={styles.fullscreen__img}
            src={selectedImage || card?.image?.[0]}
            alt={card?.title}
          />
        </div>
      )}
    </div>
  );
};

export default AboutCard;
