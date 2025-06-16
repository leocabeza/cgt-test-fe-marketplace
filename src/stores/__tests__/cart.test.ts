import type { Product } from '@/types';
import { act, renderHook } from '@testing-library/react';
import { useCartStore } from '../cart';

const mockProduct1: Product = {
  id: '1',
  slug: 'test-product-1',
  name: 'Test Product 1',
  price: 10.99,
  description: 'Test product 1 description',
  image: '/test-image-1.avif',
};

const mockProduct2: Product = {
  id: '2',
  slug: 'test-product-2',
  name: 'Test Product 2',
  price: 25.5,
  description: 'Test product 2 description',
  image: '/test-image-2.avif',
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

    // Reset the store state by clearing it
    const { result } = renderHook(() => useCartStore());
    act(() => {
      result.current.clearCart();
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

    it('increments quantity when adding existing product', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addProduct(mockProduct1);
        result.current.addProduct(mockProduct1);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(2);
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
        image: '/expensive.avif',
      };

      act(() => {
        result.current.addProduct(expensiveProduct);
        result.current.updateQuantity('3', 3);
      });

      expect(result.current.getTotalPrice()).toBeCloseTo(299.97, 2);
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
