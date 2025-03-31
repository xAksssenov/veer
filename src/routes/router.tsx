import { RouteObject, useRoutes } from "react-router";
import {
  CardRoute,
  CartRoute,
  GaleryRoute,
  HomeRoute,
  MainRoute,
} from "./config";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import AboutCard from "../pages/AboutCard";
import MainLayout from "../layout/MainLayout";
import Gallery from "../pages/Galery";

const Router = () => {
  const basedPath: RouteObject[] = [
    {
      path: MainRoute,
      element: <MainLayout />,
      children: [
        { path: HomeRoute, element: <Home /> },
        { path: CartRoute, element: <Cart /> },
        { path: GaleryRoute, element: <Gallery /> },
        { path: CardRoute, element: <AboutCard /> },
      ],
    },
  ];

  return useRoutes(basedPath);
};

export default Router;
