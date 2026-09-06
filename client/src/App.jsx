import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/shop/marketplace" replace />} />
        <Route path="/shop" element={<Navigate to="/shop/marketplace" replace />} />
        <Route path="/shop/brands" element={<ShopPage />} />
        <Route path="/shop/stores" element={<ShopPage />} />
        <Route path="/shop/marketplace" element={<ShopPage />} />
        <Route path="/shop/marketplace/:slug" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;