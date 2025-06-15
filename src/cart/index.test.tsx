import { render, screen } from '../test-utils';
import Cart from './index';

describe('Cart', () => {
  it('renders without crashing', () => {
    render(<Cart />);
  });

  it('displays the cart heading', () => {
    render(<Cart />);

    expect(screen.getByText('Your Shopping Cart')).toBeInTheDocument();
  });

  it('has the correct structure', () => {
    render(<Cart />);

    const heading = screen.getByRole('heading', { name: 'Your Shopping Cart' });
    expect(heading).toBeInTheDocument();
  });
});
