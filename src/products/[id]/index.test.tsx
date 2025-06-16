import { MemoryRouter, Route, Routes } from 'react-router';
import { render as originalRender, screen } from '@testing-library/react';
import ProductDetail from './index';

// Custom render function for this component since it needs route params
const renderWithRouter = (productId: string) => {
  return originalRender(
    <MemoryRouter initialEntries={[`/products/${productId}`]}>
      <Routes>
        <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('ProductDetail', () => {
  it('renders without crashing', () => {
    renderWithRouter('a');
  });

  it('displays the product detail heading for Product A', () => {
    renderWithRouter('a');

    expect(
      screen.getByRole('heading', { name: 'Product A' })
    ).toBeInTheDocument();
    expect(screen.getByText('Price: $10.00 USD')).toBeInTheDocument();
  });

  it('displays the product detail heading for Product B', () => {
    renderWithRouter('b');

    expect(
      screen.getByRole('heading', { name: 'Product B' })
    ).toBeInTheDocument();
    expect(screen.getByText('Price: $30.00 USD')).toBeInTheDocument();
  });

  it('shows not found for invalid product', () => {
    renderWithRouter('invalid');

    expect(
      screen.getByRole('heading', { name: 'Product Not Found' })
    ).toBeInTheDocument();
    expect(
      screen.getByText("The product you're looking for doesn't exist, dude!")
    ).toBeInTheDocument();
  });
});
