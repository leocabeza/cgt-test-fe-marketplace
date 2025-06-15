import { render, screen } from '../../test-utils';
import ProductDetail from './index';

describe('ProductDetail', () => {
  it('renders without crashing', () => {
    render(<ProductDetail />);
  });

  it('displays the product detail heading', () => {
    render(<ProductDetail />);

    expect(screen.getByText('Product Detail')).toBeInTheDocument();
  });

  it('has the correct structure', () => {
    render(<ProductDetail />);

    const heading = screen.getByRole('heading', { name: 'Product Detail' });
    expect(heading).toBeInTheDocument();
  });
});
