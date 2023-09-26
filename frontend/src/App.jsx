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

const router = createBrowserRouter([
  {
    element: <AppLayout />,

    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "product/:id",
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
            ],
          },
        ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
