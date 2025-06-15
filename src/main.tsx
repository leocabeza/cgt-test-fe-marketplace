import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx';
import Cart from './cart/index.tsx';
import ProductDetail from './products/:id/index.tsx';
import Products from './products/index.tsx';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />

        <Route path="cart" element={<Cart />} />

        <Route path="products">
          <Route index element={<Products />} />
          <Route path=":productId" element={<ProductDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
