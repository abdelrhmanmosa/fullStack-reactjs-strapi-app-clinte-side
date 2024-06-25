import { Route, Routes } from "react-router-dom";
import HomePage from "./pages";
import AboutPage from "./pages/AboutPage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./components/ProductPage";

import LoginPage from "./pages/Login";
import AppLayout from "./Layouts/AppLayout";
import cookieServices from "./services/cookieServices";
import CartDrawer from "./components/CartDrawer";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import AdminDashboard from "./pages/dashboard";
import TableProductsDashboard from "./pages/dashboard/TableProductsDashboard";
import { useEffect } from "react";

const App = () => {
  const token = cookieServices.get("jwt");
  const isAuthenticated = Boolean(token);


  return (
    <>
      <CartDrawer />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="About" element={<AboutPage />} />
          <Route path="Products" element={<ProductsPage />} />
          <Route path="product/:id" element={<ProductPage />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path={"products"} element={<TableProductsDashboard />} />
          <Route path={"categories"} element={<h2>Categories</h2>} />
        </Route>
        <Route
          path="login"
          element={<LoginPage isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </>
  );
};

export default App;
