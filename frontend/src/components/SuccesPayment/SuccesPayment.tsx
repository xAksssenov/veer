import React from "react";
import { motion } from "framer-motion";
import "./SuccesPayment.css";

export default function SuccesPayment({ stickerUrl = "https://api.iconify.design/mdi:ghost.svg" }) {
  return (
    <div className="succes-payment">
      <motion.div
        className="sticker-container"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
      >
        <motion.img
          src={stickerUrl}
          alt="sticker"
          className="sticker-image"
          animate={{ y: [0, -8, 0], rotate: [0, -3, 3, 0] }}
          transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
        />

        <svg viewBox="0 0 100 100" className="sticker-necklace">
          <g>
            <circle cx="50" cy="20" r="16" fill="none" stroke="white" strokeWidth="2" />
            <rect x="46" y="36" width="8" height="18" rx="1" fill="white" />
            <rect x="42" y="46" width="16" height="6" rx="1" fill="white" />
          </g>
        </svg>

        <motion.div
          className="sticker-earring"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
        >
          <svg viewBox="0 0 24 24" width="26" height="26">
            <path d="M12 2 L15 8 L22 9 L17 14 L18 21 L12 18 L6 21 L7 14 L2 9 L9 8 Z" fill="white" />
          </svg>
        </motion.div>

        <motion.div
          className="spark1"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <svg viewBox="0 0 10 10" width="12" height="12">
            <path d="M5 0 L6 3 L9 4 L6 5 L5 8 L4 5 L1 4 L4 3 Z" fill="black" />
          </svg>
        </motion.div>

        <motion.div
          className="spark2"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ repeat: Infinity, duration: 2.4 }}
        >
          <svg viewBox="0 0 10 10" width="10" height="10">
            <path d="M5 0 L6 3 L9 4 L6 5 L5 8 L4 5 L1 4 L4 3 Z" fill="black" />
          </svg>
        </motion.div>
      </motion.div>

      <motion.h1
        className="success-title"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Оплата прошла успешно!
      </motion.h1>

      <motion.p
        className="success-text"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        Спасибо! Транзакция подтверждена. Если возникнут вопросы — <a href="https://t.me/veer_michael" target="__blank">@veer_michael</a>
      </motion.p>
    </div>
  );
}
