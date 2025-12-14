import { RouteObject, useRoutes } from "react-router";
import {
  CardRoute,
  CartRoute,
  GaleryRoute,
  HomeRoute,
  MainRoute,
  TermsRoute,
  SuccesPayment,
} from "./config";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import AboutCard from "../pages/AboutCard";
import MainLayout from "../layout/MainLayout";
import Gallery from "../pages/Galery";
import Terms from "../pages/Terms";
import SuccesPaymentComponent from "../components/SuccesPayment/SuccesPayment";

const Router = () => {
  const basedPath: RouteObject[] = [
    {
      path: MainRoute,
      element: <MainLayout />,
      children: [
        { path: HomeRoute, element: <Home /> },
        { path: TermsRoute, element: <Terms /> },
        { path: CartRoute, element: <Cart /> },
        { path: GaleryRoute, element: <Gallery /> },
        { path: CardRoute, element: <AboutCard /> },
        { path: SuccesPayment, element: <SuccesPaymentComponent /> }
      ],
    },
  ];

  return useRoutes(basedPath);
};

export default Router;
