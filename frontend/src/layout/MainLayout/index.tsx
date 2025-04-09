import React from "react";
import Header from "../../components/Header";
import { Outlet } from "react-router";
import styles from "./index.module.scss";
import Footer from "../../components/Footer";

const MainLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.wrapper}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
