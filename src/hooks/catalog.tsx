import { useState } from "react";
import { Card } from "../Types/cardType";
import { Catalog } from "../Types/catalogType";
import axios from "axios";

const CatalogHook = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [catalog, setCatalog] = useState<Catalog[]>([]);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(false);
  const [isLoadingCards, setIsLoadingCards] = useState(false);

  const fetchCardCatalog = async (catalogId: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/card/only/${catalogId}`,
        {
          withCredentials: true,
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setCards(response.data);
        setIsLoadingCards(true);
      }
    } catch (error) {
      console.log("Ошибка получения карточек: ", error);
      setIsLoadingCards(false);
    }
  };

  const fetchCatalog = async () => {
    try {
      const response = await axios.get("http://localhost:8080/category", {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.status === 200) {
        setCatalog(response.data);
        setIsLoadingCatalog(true);
      }
    } catch (error) {
      console.log("Ошибка получения каталога: ", error);
      setIsLoadingCatalog(false);
    }
  };

  return {
    cards,
    fetchCardCatalog,
    isLoadingCatalog,
    catalog,
    isLoadingCards,
    fetchCatalog,
  };
};

export default CatalogHook;
