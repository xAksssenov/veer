import { RouteObject, useRoutes } from "react-router";
import {
  CardRoute,
  CartRoute,
  GaleryRoute,
  HomeRoute,
  MainRoute,
  TermsRoute,
  SuccesPayment,
  CheckOrders,
  CheckOrder
} from "./config";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import AboutCard from "../pages/AboutCard";
import MainLayout from "../layout/MainLayout";
import Gallery from "../pages/Galery";
import Terms from "../pages/Terms";
import SuccesPaymentComponent from "../components/SuccesPayment/SuccesPayment";
import CheckOrdersComponent from "../components/CheckOrders/CheckOrders";
// import CheckOrderComponent from "../components/Order/Order";
import OrderStatus from "../components/OrderStatus/OrderStatus";

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
        { path: SuccesPayment, element: <SuccesPaymentComponent /> },
        { path: CheckOrders, element: <CheckOrdersComponent /> },
        { path: CheckOrder, element: <OrderStatus /> }
      ],
    },
  ];

  return useRoutes(basedPath);
};

export default Router;
