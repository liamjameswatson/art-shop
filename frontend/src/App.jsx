import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
