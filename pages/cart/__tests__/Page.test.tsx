import { render, screen } from '../../../src/test-utils';
import Page from '../+Page';

describe('Cart Page', () => {
  it('renders without crashing', () => {
    const { container } = render(<Page />);
    expect(container).toBeDefined();
  });

  it('displays the cart heading', () => {
    render(<Page />);

    expect(screen.getByText('Your Cart')).toBeInTheDocument();
  });

  it('has the correct structure', () => {
    render(<Page />);

    const heading = screen.getByRole('heading', { name: 'Your Cart' });
    expect(heading).toBeInTheDocument();

    // Should show empty cart message
    expect(screen.getByText('Your cart is empty, dude!')).toBeInTheDocument();
    expect(screen.getByText('Start shopping')).toBeInTheDocument();
  });
});
