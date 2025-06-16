import { render, screen } from '@/test-utils';
import Page from '../+Page';

import { vi } from 'vitest';

// Mock vike-react/useData
vi.mock('vike-react/useData', () => ({
  useData: () => ({
    products: [
      {
        id: 1,
        name: 'Product A',
        price: 99,
        image: '/src/assets/a.jpg',
      },
      {
        id: 2,
        name: 'Product B',
        price: 149,
        image: '/src/assets/b.jpg',
      },
    ],
  }),
}));

describe('Products Page', () => {
  it('renders without crashing', () => {
    render(<Page />);
  });

  it('displays the products heading', () => {
    render(<Page />);

    expect(screen.getByText('All Products')).toBeInTheDocument();
  });

  it('has the correct structure', () => {
    render(<Page />);

    const heading = screen.getByRole('heading', { name: 'All Products' });
    expect(heading).toBeInTheDocument();

    // Check that both products are rendered
    expect(screen.getByText('Product A')).toBeInTheDocument();
    expect(screen.getByText('Product B')).toBeInTheDocument();
    expect(screen.getByText('$99')).toBeInTheDocument();
    expect(screen.getByText('$149')).toBeInTheDocument();
  });
});
