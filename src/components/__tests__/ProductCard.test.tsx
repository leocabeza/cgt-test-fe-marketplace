import { render, screen } from '@/test-utils';
import ProductCard from '../ProductCard';

const mockProduct = {
  id: '1',
  slug: 'test-product',
  name: 'Test Product',
  price: 99.99,
  description: 'This is a test product description',
  image: '/test-image.webp',
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(
      screen.getByText('This is a test product description')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Test Product' })
    ).toBeInTheDocument();
  });

  it('renders default button text when not provided', () => {
    render(<ProductCard product={mockProduct} />);

    expect(
      screen.getByRole('link', { name: 'View Details' })
    ).toBeInTheDocument();
  });

  it('renders custom button text when provided', () => {
    render(<ProductCard product={mockProduct} buttonText="Buy Now" />);

    expect(screen.getByRole('link', { name: 'Buy Now' })).toBeInTheDocument();
  });

  it('creates correct link href for product slug', () => {
    render(<ProductCard product={mockProduct} />);

    const link = screen.getByRole('link', { name: 'View Details' });
    expect(link).toHaveAttribute('href', '/products/test-product');
  });

  it('applies correct image height class for tall variant (default)', () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByRole('img', { name: 'Test Product' });
    expect(image).toHaveClass('h-64');
  });

  it('applies correct image height class for short variant', () => {
    render(<ProductCard product={mockProduct} imageHeight="short" />);

    const image = screen.getByRole('img', { name: 'Test Product' });
    expect(image).toHaveClass('h-32');
  });

  it('applies correct title size class for large variant (default)', () => {
    render(<ProductCard product={mockProduct} />);

    const title = screen.getByText('Test Product');
    expect(title).toHaveClass('text-2xl');
  });

  it('applies correct title size class for medium variant', () => {
    render(<ProductCard product={mockProduct} titleSize="medium" />);

    const title = screen.getByText('Test Product');
    expect(title).toHaveClass('text-xl');
  });

  it('applies correct price size class for large variant (default)', () => {
    render(<ProductCard product={mockProduct} />);

    const price = screen.getByText('$99.99');
    expect(price).toHaveClass('text-xl');
  });

  it('applies correct price size class for medium variant', () => {
    render(<ProductCard product={mockProduct} priceSize="medium" />);

    const price = screen.getByText('$99.99');
    expect(price).toHaveClass('text-lg');
  });

  it('has correct image attributes for accessibility and performance', () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByRole('img', { name: 'Test Product' });
    expect(image).toHaveAttribute('src', '/test-image.webp');
    expect(image).toHaveAttribute('alt', 'Test Product');
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('decoding', 'async');
  });

  it('includes picture element with source for webp format', () => {
    const { container } = render(<ProductCard product={mockProduct} />);

    const picture = container.querySelector('picture');
    expect(picture).toBeInTheDocument();

    const source = picture?.querySelector('source');
    expect(source).toHaveAttribute('srcset', '/test-image.webp');
    expect(source).toHaveAttribute('type', 'image/webp');
  });

  it('applies all required CSS classes for styling', () => {
    const { container } = render(<ProductCard product={mockProduct} />);

    const cardContainer = container.firstChild as HTMLElement;
    expect(cardContainer).toHaveClass('from-dark-surface');
    expect(cardContainer).toHaveClass('to-retro-purple/20');
    expect(cardContainer).toHaveClass('border-neon-cyan');
    expect(cardContainer).toHaveClass('shadow-retro-glow');

    const title = screen.getByText('Test Product');
    expect(title).toHaveClass('text-neon-cyan-soft');
    expect(title).toHaveClass('font-bold');

    const price = screen.getByText('$99.99');
    expect(price).toHaveClass('text-neon-lime-soft');
    expect(price).toHaveClass('font-black');
    expect(price).toHaveClass('drop-shadow-[0_0_15px_currentColor]');

    const description = screen.getByText('This is a test product description');
    expect(description).toHaveClass('text-text-soft');
  });

  it('formats price correctly with dollar sign', () => {
    const productWithDifferentPrice = {
      ...mockProduct,
      price: 1234.56,
    };

    render(<ProductCard product={productWithDifferentPrice} />);

    expect(screen.getByText('$1234.56')).toBeInTheDocument();
  });
});
