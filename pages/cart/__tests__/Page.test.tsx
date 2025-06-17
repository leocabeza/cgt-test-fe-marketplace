import { useCartStore } from '@/stores/cart';
import type { Product } from '@/types';
import { fireEvent, render, screen } from '@testing-library/react';
import Page from '../+Page';

// Mock the cart store
vi.mock('@/stores/cart');

const mockUseCartStore = vi.mocked(useCartStore);

const mockProduct1: Product = {
  id: '1',
  slug: 'test-product-1',
  name: 'Test Product 1',
  price: 10.99,
  description: 'Test product 1 description',
  image: '/test-image-1.webp',
};

const mockProduct2: Product = {
  id: '2',
  slug: 'test-product-2',
  name: 'Test Product 2',
  price: 25.5,
  description: 'Test product 2 description',
  image: '/test-image-2.webp',
};

const mockCartItem1 = { ...mockProduct1, quantity: 2 };
const mockCartItem2 = { ...mockProduct2, quantity: 1 };

describe('Cart Page', () => {
  const mockRemoveProduct = vi.fn();
  const mockUpdateQuantity = vi.fn();
  const mockGetTotalPrice = vi.fn();
  const mockClearCart = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Empty cart', () => {
    beforeEach(() => {
      mockUseCartStore.mockReturnValue({
        items: [],
        addProduct: vi.fn(),
        removeProduct: mockRemoveProduct,
        updateQuantity: mockUpdateQuantity,
        getTotalPrice: mockGetTotalPrice.mockReturnValue(0),
        getTotalItems: vi.fn().mockReturnValue(0),
        clearCart: mockClearCart,
      });
    });

    it('renders without crashing', () => {
      const { container } = render(<Page />);
      expect(container).toBeDefined();
    });

    it('displays the cart heading', () => {
      render(<Page />);
      expect(screen.getByText('Your Cart')).toBeInTheDocument();
    });

    it('displays empty cart message and start shopping link', () => {
      render(<Page />);

      const heading = screen.getByRole('heading', { name: 'Your Cart' });
      expect(heading).toBeInTheDocument();

      expect(screen.getByText('Your cart is empty, dude!')).toBeInTheDocument();

      const startShoppingLink = screen.getByRole('link', {
        name: 'Start shopping',
      });
      expect(startShoppingLink).toBeInTheDocument();
      expect(startShoppingLink).toHaveAttribute('href', '/');
    });
  });

  describe('Cart with items', () => {
    beforeEach(() => {
      mockGetTotalPrice.mockReturnValue(47.48);
      mockUseCartStore.mockReturnValue({
        items: [mockCartItem1, mockCartItem2],
        addProduct: vi.fn(),
        removeProduct: mockRemoveProduct,
        updateQuantity: mockUpdateQuantity,
        getTotalPrice: mockGetTotalPrice,
        getTotalItems: vi.fn().mockReturnValue(3),
        clearCart: mockClearCart,
      });
    });

    it('displays cart items correctly', () => {
      render(<Page />);

      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(
        screen.getByText('Test product 1 description')
      ).toBeInTheDocument();
      expect(screen.getByText('$10.99 each')).toBeInTheDocument();

      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
      expect(
        screen.getByText('Test product 2 description')
      ).toBeInTheDocument();
      expect(screen.getByText('$25.50 each')).toBeInTheDocument();
    });

    it('displays correct quantities for each item', () => {
      render(<Page />);

      // Quantities are displayed as text content in spans, not form inputs
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('displays item subtotals correctly', () => {
      render(<Page />);

      expect(screen.getByText('Subtotal: $21.98')).toBeInTheDocument(); // 10.99 * 2
      expect(screen.getByText('Subtotal: $25.50')).toBeInTheDocument(); // 25.50 * 1
    });

    it('displays total price and item count', () => {
      render(<Page />);

      expect(screen.getByText('Total: $47.48')).toBeInTheDocument();
      expect(screen.getByText('3 items in cart')).toBeInTheDocument();
    });

    it('displays product images with correct attributes', () => {
      render(<Page />);

      const image1 = screen.getByAltText('Test Product 1');
      expect(image1).toHaveAttribute('src', '/test-image-1.webp');

      const image2 = screen.getByAltText('Test Product 2');
      expect(image2).toHaveAttribute('src', '/test-image-2.webp');
    });

    it('calls updateQuantity when increment button is clicked', () => {
      render(<Page />);

      const incrementButtons = screen.getAllByText('+');
      fireEvent.click(incrementButtons[0]); // Click first product's increment

      expect(mockUpdateQuantity).toHaveBeenCalledWith('1', 3); // 2 + 1
    });

    it('calls updateQuantity when decrement button is clicked', () => {
      render(<Page />);

      const decrementButtons = screen.getAllByText('-');
      fireEvent.click(decrementButtons[0]); // Click first product's decrement

      expect(mockUpdateQuantity).toHaveBeenCalledWith('1', 1); // 2 - 1
    });

    it('calls removeProduct when remove button is clicked', () => {
      render(<Page />);

      const removeButtons = screen.getAllByText('Remove');
      fireEvent.click(removeButtons[0]);

      expect(mockRemoveProduct).toHaveBeenCalledWith('1');
    });

    it('calls clearCart when clear cart button is clicked', () => {
      render(<Page />);

      const clearCartButton = screen.getByRole('button', {
        name: 'Clear Cart',
      });
      fireEvent.click(clearCartButton);

      expect(mockClearCart).toHaveBeenCalled();
    });

    it('displays checkout and continue shopping buttons', () => {
      render(<Page />);

      const checkoutButton = screen.getByRole('button', { name: 'Checkout' });
      expect(checkoutButton).toBeInTheDocument();

      const continueShoppingLink = screen.getByRole('link', {
        name: 'Continue Shopping',
      });
      expect(continueShoppingLink).toBeInTheDocument();
      expect(continueShoppingLink).toHaveAttribute('href', '/products');
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      mockGetTotalPrice.mockReturnValue(47.48);
      mockUseCartStore.mockReturnValue({
        items: [mockCartItem1],
        addProduct: vi.fn(),
        removeProduct: mockRemoveProduct,
        updateQuantity: mockUpdateQuantity,
        getTotalPrice: mockGetTotalPrice,
        getTotalItems: vi.fn().mockReturnValue(2),
        clearCart: mockClearCart,
      });
    });

    it('has proper button types for all interactive elements', () => {
      render(<Page />);

      const buttons = screen.getAllByRole('button');
      for (let i = 0; i < buttons.length; i++) {
        expect(buttons[i]).toHaveAttribute('type', 'button');
      }
    });

    it('has proper heading structure', () => {
      render(<Page />);

      const heading = screen.getByRole('heading', { name: 'Your Cart' });
      expect(heading).toBeInTheDocument();
    });

    it('has accessible image alt text', () => {
      render(<Page />);

      const image = screen.getByRole('img', { name: 'Test Product 1' });
      expect(image).toHaveAttribute('alt', 'Test Product 1');
    });
  });
});
