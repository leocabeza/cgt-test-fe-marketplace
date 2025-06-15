import { render, screen } from '../test-utils';
import Products from './index';

describe('Products', () => {
  it('renders without crashing', () => {
    render(<Products />);
  });

  it('displays the products heading', () => {
    render(<Products />);

    expect(screen.getByText('Our Products')).toBeInTheDocument();
  });

  it('has the correct structure', () => {
    render(<Products />);

    const heading = screen.getByRole('heading', { name: 'Our Products' });
    expect(heading).toBeInTheDocument();
  });
});
