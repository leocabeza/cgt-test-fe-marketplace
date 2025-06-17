import { render, screen } from '@testing-library/react';
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

  it('formats price correctly with dollar sign', () => {
    const productWithDifferentPrice = {
      ...mockProduct,
      price: 1234.56,
    };

    render(<ProductCard product={productWithDifferentPrice} />);

    expect(screen.getByText('$1234.56')).toBeInTheDocument();
  });
});
