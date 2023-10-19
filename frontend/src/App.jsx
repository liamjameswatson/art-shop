import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DeliveryAddressPage from "./pages/DeliveryAddressPage";
import ProtectedRoute from "./ui/ProtectedRoute";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import ProfilePage from "./pages/ProfilePage";
import AdminRoute from "./ui/AdminRoute";
import OrderListPage from "./pages/admin/OrderListPage";
import ProductListPage from "./pages/admin/ProductListPage";
import ProductEditPage from "./pages/admin/ProductEditPage";
import UserListPage from "./pages/admin/UserListPage";
import UserEditPage from "./pages/admin/UserEditPage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,

    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/page/:pageNumber",
        element: <HomePage />,
      },
      {
        path: "/search/:keyword",
        element: <HomePage />,
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      //USERS ONLY
      {
        path: "",
        element: <ProtectedRoute />,
        children: [
          {
            path: "checkout",
            element: <DeliveryAddressPage />,
          },
          {
            path: "payment",
            element: <PaymentPage />,
          },
          {
            path: "placeorder",
            element: <PlaceOrderPage />,
          },
          {
            path: "order/:id",
            element: <OrderPage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
        ],
      },
      // ADMIN ONLY
      {
        path: "",
        element: <AdminRoute />,
        children: [
          {
            path: "admin/orderlist",
            element: <OrderListPage />,
          },
          {
            path: "admin/productlist",
            element: <ProductListPage />,
          },
          {
            path: "admin/productlist/:pageNumber",
            element: <ProductListPage />,
          },
          {
            path: "admin/product/:id/edit",
            element: <ProductEditPage />,
          },
          {
            path: "admin/userlist",
            element: <UserListPage />,
          },
          {
            path: "admin/user/:id/edit",
            element: <UserEditPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
