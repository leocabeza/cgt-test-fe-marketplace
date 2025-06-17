import type { Product } from '@/types';
import { act, renderHook } from '@testing-library/react';
import { useCartStore } from '../cart';
import { useToastStore } from '../toast';

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

// Mock localStorage to avoid persistence during tests
const mockStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockStorage,
});

describe('useCartStore', () => {
  beforeEach(() => {
    // Clear all mocks and reset store state
    vi.clearAllMocks();

    // Reset the cart store state by clearing it
    const { result: cartResult } = renderHook(() => useCartStore());
    act(() => {
      cartResult.current.clearCart();
    });

    // Reset the toast store state by clearing toasts
    const { result: toastResult } = renderHook(() => useToastStore());
    act(() => {
      for (const toast of toastResult.current.toasts) {
        toastResult.current.removeToast(toast.id);
      }
    });
  });

  describe('initial state', () => {
    it('starts with empty cart', () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.items).toEqual([]);
      expect(result.current.getTotalPrice()).toBe(0);
      expect(result.current.getTotalItems()).toBe(0);
    });
  });

  describe('addProduct', () => {
    it('adds a new product to empty cart', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addProduct(mockProduct1);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0]).toEqual({
        ...mockProduct1,
        quantity: 1,
      });
    });

    it('shows success toast when adding new product', () => {
      const { result: cartResult } = renderHook(() => useCartStore());
      const { result: toastResult } = renderHook(() => useToastStore());

      act(() => {
        cartResult.current.addProduct(mockProduct1);
      });

      expect(toastResult.current.toasts).toHaveLength(1);
      expect(toastResult.current.toasts[0]).toMatchObject({
        message: 'Test Product 1 added to cart!',
        type: 'success',
        isVisible: true,
      });
    });

    it('increments quantity when adding existing product', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addProduct(mockProduct1);
        result.current.addProduct(mockProduct1);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(2);
    });

    it('shows quantity increased toast when adding existing product', () => {
      const { result: cartResult } = renderHook(() => useCartStore());
      const { result: toastResult } = renderHook(() => useToastStore());

      act(() => {
        cartResult.current.addProduct(mockProduct1);
      });

      // Clear the first toast to focus on the second one
      act(() => {
        for (const toast of toastResult.current.toasts) {
          toastResult.current.removeToast(toast.id);
        }
      });

      act(() => {
        cartResult.current.addProduct(mockProduct1);
      });

      expect(toastResult.current.toasts).toHaveLength(1);
      expect(toastResult.current.toasts[0]).toMatchObject({
        message: 'Test Product 1 quantity increased in cart!',
        type: 'success',
        isVisible: true,
      });
    });

    it('adds multiple different products', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addProduct(mockProduct1);
        result.current.addProduct(mockProduct2);
      });

      expect(result.current.items).toHaveLength(2);
      expect(result.current.items[0].id).toBe('1');
      expect(result.current.items[1].id).toBe('2');
      expect(result.current.items[0].quantity).toBe(1);
      expect(result.current.items[1].quantity).toBe(1);
    });

    it('shows separate toasts for different products', () => {
      const { result: cartResult } = renderHook(() => useCartStore());
      const { result: toastResult } = renderHook(() => useToastStore());

      act(() => {
        cartResult.current.addProduct(mockProduct1);
        cartResult.current.addProduct(mockProduct2);
      });

      expect(toastResult.current.toasts).toHaveLength(2);
      expect(toastResult.current.toasts[0].message).toBe(
        'Test Product 1 added to cart!'
      );
      expect(toastResult.current.toasts[1].message).toBe(
        'Test Product 2 added to cart!'
      );
      expect(toastResult.current.toasts[0].type).toBe('success');
      expect(toastResult.current.toasts[1].type).toBe('success');
    });
  });

  describe('removeProduct', () => {
    it('removes product from cart', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addProduct(mockProduct1);
        result.current.addProduct(mockProduct2);
      });

      expect(result.current.items).toHaveLength(2);

      act(() => {
        result.current.removeProduct('1');
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].id).toBe('2');
    });

    it('does nothing when removing non-existent product', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addProduct(mockProduct1);
      });

      expect(result.current.items).toHaveLength(1);

      act(() => {
        result.current.removeProduct('non-existent');
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].id).toBe('1');
    });
  });

  describe('updateQuantity', () => {
    it('updates product quantity', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addProduct(mockProduct1);
      });

      act(() => {
        result.current.updateQuantity('1', 5);
      });

      expect(result.current.items[0].quantity).toBe(5);
    });

    it('removes product when quantity is set to 0', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addProduct(mockProduct1);
        result.current.addProduct(mockProduct2);
      });

      expect(result.current.items).toHaveLength(2);

      act(() => {
        result.current.updateQuantity('1', 0);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].id).toBe('2');
    });

    it('removes product when quantity is negative', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addProduct(mockProduct1);
      });

      act(() => {
        result.current.updateQuantity('1', -1);
      });

      expect(result.current.items).toHaveLength(0);
    });

    it('does nothing when updating non-existent product', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addProduct(mockProduct1);
      });

      act(() => {
        result.current.updateQuantity('non-existent', 5);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(1);
    });
  });

  describe('getTotalPrice', () => {
    it('returns 0 for empty cart', () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.getTotalPrice()).toBe(0);
    });

    it('calculates total price for single product', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addProduct(mockProduct1);
      });

      expect(result.current.getTotalPrice()).toBe(10.99);
    });

    it('calculates total price for multiple quantities of same product', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addProduct(mockProduct1);
        result.current.updateQuantity('1', 3);
      });

      expect(result.current.getTotalPrice()).toBeCloseTo(32.97, 2);
    });

    it('calculates total price for multiple different products', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addProduct(mockProduct1); // 10.99
        result.current.addProduct(mockProduct2); // 25.50
        result.current.updateQuantity('1', 2); // 10.99 * 2 = 21.98
      });

      // 21.98 + 25.50 = 47.48
      expect(result.current.getTotalPrice()).toBeCloseTo(47.48, 2);
    });
  });

  describe('getTotalItems', () => {
    it('returns 0 for empty cart', () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.getTotalItems()).toBe(0);
    });

    it('returns total number of items for single product', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addProduct(mockProduct1);
      });

      expect(result.current.getTotalItems()).toBe(1);
    });

    it('returns total number of items for multiple quantities', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addProduct(mockProduct1);
        result.current.updateQuantity('1', 5);
      });

      expect(result.current.getTotalItems()).toBe(5);
    });

    it('returns total number of items for multiple different products', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addProduct(mockProduct1);
        result.current.addProduct(mockProduct2);
        result.current.updateQuantity('1', 3);
        result.current.updateQuantity('2', 2);
      });

      expect(result.current.getTotalItems()).toBe(5);
    });
  });

  describe('clearCart', () => {
    it('clears all items from cart', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addProduct(mockProduct1);
        result.current.addProduct(mockProduct2);
      });

      expect(result.current.items).toHaveLength(2);

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
      expect(result.current.getTotalPrice()).toBe(0);
      expect(result.current.getTotalItems()).toBe(0);
    });

    it('does nothing when cart is already empty', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('edge cases and integration', () => {
    it('handles decimal calculations correctly', () => {
      const { result } = renderHook(() => useCartStore());

      const expensiveProduct: Product = {
        id: '3',
        slug: 'expensive-product',
        name: 'Expensive Product',
        price: 99.99,
        description: 'Very expensive',
        image: '/expensive.webp',
      };

      act(() => {
        result.current.addProduct(expensiveProduct);
        result.current.updateQuantity('3', 3);
      });

      expect(result.current.getTotalPrice()).toBeCloseTo(299.97, 2);
    });

    it('toast integration does not affect cart operations', () => {
      const { result: cartResult } = renderHook(() => useCartStore());
      const { result: toastResult } = renderHook(() => useToastStore());

      // Add products and verify both cart and toast state
      act(() => {
        cartResult.current.addProduct(mockProduct1);
        cartResult.current.addProduct(mockProduct2);
        cartResult.current.addProduct(mockProduct1); // Should increment quantity
      });

      // Verify cart state is correct
      expect(cartResult.current.items).toHaveLength(2);
      expect(cartResult.current.items[0].quantity).toBe(2);
      expect(cartResult.current.items[1].quantity).toBe(1);
      expect(cartResult.current.getTotalPrice()).toBeCloseTo(47.48, 2);
      expect(cartResult.current.getTotalItems()).toBe(3);

      // Verify toasts were created
      expect(toastResult.current.toasts).toHaveLength(3);

      // Remove a product and verify cart still works correctly
      act(() => {
        cartResult.current.removeProduct('1');
      });

      expect(cartResult.current.items).toHaveLength(1);
      expect(cartResult.current.items[0].id).toBe('2');
      expect(cartResult.current.getTotalPrice()).toBe(25.5);

      // Clear cart and verify it works
      act(() => {
        cartResult.current.clearCart();
      });

      expect(cartResult.current.items).toHaveLength(0);
      expect(cartResult.current.getTotalPrice()).toBe(0);
      expect(cartResult.current.getTotalItems()).toBe(0);
    });

    it('maintains cart state through multiple operations', () => {
      const { result } = renderHook(() => useCartStore());

      // Add products
      act(() => {
        result.current.addProduct(mockProduct1);
        result.current.addProduct(mockProduct2);
        result.current.addProduct(mockProduct1); // Should increment quantity
      });

      expect(result.current.items).toHaveLength(2);
      expect(
        result.current.items.find((item) => item.id === '1')?.quantity
      ).toBe(2);

      // Update quantities
      act(() => {
        result.current.updateQuantity('2', 3);
      });

      // Remove one product
      act(() => {
        result.current.removeProduct('1');
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].id).toBe('2');
      expect(result.current.items[0].quantity).toBe(3);
      expect(result.current.getTotalPrice()).toBeCloseTo(76.5, 2);
      expect(result.current.getTotalItems()).toBe(3);
    });
  });
});
