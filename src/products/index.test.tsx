import { render, screen } from '../test-utils';
import Products from './index';

describe('Products', () => {
  it('renders without crashing', () => {
    render(<Products />);
  });

  it('displays the products heading', () => {
    render(<Products />);

    expect(screen.getByText('All Products')).toBeInTheDocument();
  });

  it('has the correct structure', () => {
    render(<Products />);

    const heading = screen.getByRole('heading', { name: 'All Products' });
    expect(heading).toBeInTheDocument();

    // Check that both products are rendered
    expect(screen.getByText('Product A')).toBeInTheDocument();
    expect(screen.getByText('Product B')).toBeInTheDocument();
    expect(screen.getByText('$10.00 USD')).toBeInTheDocument();
    expect(screen.getByText('$30.00 USD')).toBeInTheDocument();
  });
});
