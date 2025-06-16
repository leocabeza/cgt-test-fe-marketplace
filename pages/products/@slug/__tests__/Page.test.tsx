import { render, screen } from '../../../../src/test-utils';
import Page from '../+Page';

import { vi } from 'vitest';

// Mock vike-react/useData
const mockUseData = vi.fn();
vi.mock('vike-react/useData', () => ({
  useData: () => mockUseData(),
}));

describe('Product Detail Page', () => {
  it('renders without crashing with valid product', () => {
    mockUseData.mockReturnValue({
      product: {
        id: 1,
        name: 'Product A',
        price: 99,
        image: '/src/assets/a.jpg',
        description: 'A great product',
      },
    });
    render(<Page />);
  });

  it('displays the product detail heading for a product', () => {
    mockUseData.mockReturnValue({
      product: {
        id: 1,
        name: 'Product A',
        price: 99,
        image: '/src/assets/a.jpg',
        description: 'A great product',
      },
    });
    render(<Page />);

    expect(
      screen.getByRole('heading', { name: 'Product A' })
    ).toBeInTheDocument();
    expect(screen.getByText('Price: $99')).toBeInTheDocument();
    expect(screen.getByText('Add to cart')).toBeInTheDocument();
  });

  it('shows not found for invalid product', () => {
    mockUseData.mockReturnValue({
      product: null,
    });
    render(<Page />);

    expect(
      screen.getByRole('heading', { name: 'Product Not Found' })
    ).toBeInTheDocument();
    expect(
      screen.getByText("The product you're looking for doesn't exist, dude!")
    ).toBeInTheDocument();
  });
});
