import axios from "axios";
import { CartList } from "../Types/cartType";
import { useState } from "react";
import { Card } from "../Types/cardType";

const CartHook = () => {
  const [cart, setCart] = useState<CartList[] | null>(null);
  const [cards, setCards] = useState<{ [key: number]: Card }>({});

  const fetchCard = async (id: number) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8080/card/${id}`, {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.status === 200) {
        setCards((item) => ({
          ...item,
          [id]: response.data,
        }));
      }
    } catch (error) {
      console.error("Ошибка получения карточки: ", error);
    }
  };

  const deleteCard = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8080/cart?cart_id=${id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setCart(
          (prevCart) => prevCart?.filter((item) => item.id !== id) || null
        );
      }
    } catch (error) {
      console.log("Ошибка удаления карточки", error);
    }
  };

  const quantityCard = async (id: number, quantity: number) => {
    if (quantity > 0) {
      try {
        const response = await axios.put(
          `http://127.0.0.1:8080/cart/update_quantity?cart_id=${id}&new_quantity=${quantity}`,
          {},
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setCart(
            (prev) =>
              prev?.map((item) =>
                item.id === id ? { ...item, quantity } : item
              ) || null
          );
        }
      } catch (error) {
        console.log("Ошибка удаления карточки", error);
      }
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/cart", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setCart(response.data);
        response.data.forEach((item: CartList) => {
          fetchCard(item.card_id);
        });
      }
    } catch (error) {
      console.log("Ошибка получения корзины", error);
    }
  };

  return {
    cards,
    cart,
    deleteCard,
    fetchCart,
    quantityCard,
  };
};

export default CartHook;
