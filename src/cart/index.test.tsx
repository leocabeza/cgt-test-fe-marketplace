import { render, screen } from '../test-utils';
import Cart from './index';

describe('Cart', () => {
  it('renders without crashing', () => {
    const { container } = render(<Cart />);
    expect(container).toBeDefined();
  });

  it('displays the cart heading', () => {
    render(<Cart />);

    expect(screen.getByText('Your Cart')).toBeInTheDocument();
  });

  it('has the correct structure', () => {
    render(<Cart />);

    const heading = screen.getByRole('heading', { name: 'Your Cart' });
    expect(heading).toBeInTheDocument();

    // Should show empty cart message
    expect(screen.getByText('Your cart is empty, dude!')).toBeInTheDocument();
    expect(screen.getByText('Start shopping')).toBeInTheDocument();
  });
});
