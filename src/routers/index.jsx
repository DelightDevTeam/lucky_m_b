import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PromotionPage from "../pages/PromotionPage";
import ProfilePage from "../pages/ProfilePage";
import UpdateProfilePage from "../pages/UpdateProfilePage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import DepositPage from "../pages/DepositPage";
import WithDrawPage from "../pages/WithDrawPage";
import Games from "../pages/Games";
import TransactionHistoryPage from "../pages/TransactionHistoryPage";
import GameLogsPage from "../pages/GameLogsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/games/:type/:provider",
        element: <Games />
      },
      {
        path: "/promotion",
        element: <PromotionPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/transaction-history",
        element: <TransactionHistoryPage />,
      },
      {
        path: "/game-logs",
        element: <GameLogsPage />,
      },
      {
        path: "/change-password",
        element: <ChangePasswordPage />,
      },
      {
        path: "/deposit",
        element: <DepositPage />,
      },
      {
        path: "/with-draw",
        element: <WithDrawPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export default router;