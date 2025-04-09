import { useState } from "react";
import data from "../data/cards.json";
import { Card } from "../Types/cardType";

const CardHook = () => {
  const [card, setCard] = useState<Card | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isAddedCart, setIsAddedCart] = useState(false);

  const fetchCard = (id: string) => {
    const foundCard = data.find((item) => item.id === Number(id));
    if (foundCard) {
      setCard(foundCard);
      setSelectedImage(foundCard.image[0]);
    }
  };

  const addInCart = () => {
    setIsAddedCart(true);
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 3000);
  };

  return {
    card,
    selectedImage,
    setSelectedImage,
    fetchCard,
    openSection,
    setOpenSection,
    isVisible,
    isAddedCart,
    addInCart,
  };
};

export default CardHook;
