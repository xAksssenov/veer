import axios from "axios";
import { useState } from "react";
import { Card } from "../Types/cardType";

const HomeHook = () => {
  const [cardSales, setCardSales] = useState<Card[]>([]);
  const [cardPopulars, setCardPopulars] = useState<Card[]>([]);

  const [isLoadingSale, isSetLoadingSale] = useState(false);
  const [isLoadingPopular, isSetLoadingPopular] = useState(false);

  const fetchCardSales = async (limitSale: number) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8080/card/sale?skip=0&limit=${limitSale}`,
        {
          withCredentials: true,
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setCardSales(response.data);
        isSetLoadingSale(true);
      }
    } catch (error) {
      console.log("Ошибка получения карточек: ", error);
      isSetLoadingSale(false);
    }
  };

  const fetchCardPopulars = async (limitPopular: number) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8080/card/popular?skip=0&limit=${limitPopular}`,
        {
          withCredentials: true,
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setCardPopulars(response.data);
        isSetLoadingPopular(true);
      }
    } catch (error) {
      console.log("Ошибка получения карточек: ", error);
      isSetLoadingPopular(false);
    }
  };

  return {
    cardSales,
    cardPopulars,
    isLoadingSale,
    isLoadingPopular,
    fetchCardSales,
    fetchCardPopulars,
  };
};

export default HomeHook;
