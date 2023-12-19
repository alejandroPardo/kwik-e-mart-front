// src/App.js
import React from "react";
import ProductsPage from "./pages/ProductsPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SettingsPage from "./pages/SettingsPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ProductsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
