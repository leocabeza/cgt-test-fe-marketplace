import { act, renderHook } from '@testing-library/react';
import { useToastStore } from '../toast';

// Mock timers for testing auto-dismiss functionality
vi.useFakeTimers();

describe('useToastStore', () => {
  beforeEach(() => {
    // Reset the store state and clear timers
    const { result } = renderHook(() => useToastStore());
    act(() => {
      for (const toast of result.current.toasts) {
        result.current.removeToast(toast.id);
      }
    });
    vi.clearAllTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  describe('initial state', () => {
    it('starts with empty toasts array', () => {
      const { result } = renderHook(() => useToastStore());
      expect(result.current.toasts).toEqual([]);
    });
  });

  describe('addToast', () => {
    it('adds a toast with default parameters', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Test message');
      });

      expect(result.current.toasts).toHaveLength(1);
      expect(result.current.toasts[0]).toMatchObject({
        message: 'Test message',
        type: 'info',
        duration: 4000,
        isVisible: true,
      });
      expect(result.current.toasts[0].id).toBeDefined();
    });

    it('adds a toast with custom type', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Success message', 'success');
      });

      expect(result.current.toasts[0]).toMatchObject({
        message: 'Success message',
        type: 'success',
        duration: 4000,
        isVisible: true,
      });
    });

    it('adds a toast with custom duration', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Custom duration', 'error', 2000);
      });

      expect(result.current.toasts[0]).toMatchObject({
        message: 'Custom duration',
        type: 'error',
        duration: 2000,
        isVisible: true,
      });
    });

    it('adds multiple toasts', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('First toast', 'success');
        result.current.addToast('Second toast', 'error');
      });

      expect(result.current.toasts).toHaveLength(2);
      expect(result.current.toasts[0].message).toBe('First toast');
      expect(result.current.toasts[1].message).toBe('Second toast');
    });

    it('generates unique IDs for each toast', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Toast 1');
        result.current.addToast('Toast 2');
      });

      const ids = result.current.toasts.map((toast) => toast.id);
      expect(ids[0]).not.toBe(ids[1]);
      expect(ids[0]).toBeDefined();
      expect(ids[1]).toBeDefined();
    });
  });

  describe('removeToast', () => {
    it('removes toast by ID', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Toast 1');
        result.current.addToast('Toast 2');
      });

      const toastId = result.current.toasts[0].id;

      act(() => {
        result.current.removeToast(toastId);
      });

      expect(result.current.toasts).toHaveLength(1);
      expect(result.current.toasts[0].message).toBe('Toast 2');
    });

    it('does nothing when removing non-existent toast', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Test toast');
      });

      act(() => {
        result.current.removeToast('non-existent-id');
      });

      expect(result.current.toasts).toHaveLength(1);
    });
  });

  describe('hideToast', () => {
    it('sets toast visibility to false', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Test toast');
      });

      const toastId = result.current.toasts[0].id;
      expect(result.current.toasts[0].isVisible).toBe(true);

      act(() => {
        result.current.hideToast(toastId);
      });

      expect(result.current.toasts[0].isVisible).toBe(false);
    });

    it('does nothing when hiding non-existent toast', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Test toast');
      });

      expect(result.current.toasts[0].isVisible).toBe(true);

      act(() => {
        result.current.hideToast('non-existent-id');
      });

      expect(result.current.toasts[0].isVisible).toBe(true);
    });
  });

  describe('auto-dismiss functionality', () => {
    it('auto-hides toast after specified duration', async () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Auto-dismiss toast', 'info', 2000);
      });

      expect(result.current.toasts[0].isVisible).toBe(true);

      // Fast-forward time to just before hide
      act(() => {
        vi.advanceTimersByTime(1999);
      });
      expect(result.current.toasts[0].isVisible).toBe(true);

      // Fast-forward time to trigger hide
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(result.current.toasts[0].isVisible).toBe(false);
    });

    it('auto-removes toast after hide animation', async () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Auto-remove toast', 'info', 1000);
      });

      expect(result.current.toasts).toHaveLength(1);

      // Fast-forward to hide time
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(result.current.toasts[0].isVisible).toBe(false);

      // Fast-forward additional 300ms for removal
      act(() => {
        vi.advanceTimersByTime(300);
      });
      expect(result.current.toasts).toHaveLength(0);
    });

    it('does not auto-dismiss when duration is 0', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Persistent toast', 'info', 0);
      });

      expect(result.current.toasts[0].isVisible).toBe(true);

      // Fast-forward time significantly
      act(() => {
        vi.advanceTimersByTime(10000);
      });

      expect(result.current.toasts).toHaveLength(1);
      expect(result.current.toasts[0].isVisible).toBe(true);
    });

    it('handles multiple toasts with different durations', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Short toast', 'info', 1000);
        result.current.addToast('Long toast', 'info', 3000);
      });

      expect(result.current.toasts).toHaveLength(2);

      // Fast-forward to hide first toast
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(result.current.toasts[0].isVisible).toBe(false);
      expect(result.current.toasts[1].isVisible).toBe(true);

      // Fast-forward to remove first toast
      act(() => {
        vi.advanceTimersByTime(300);
      });
      expect(result.current.toasts).toHaveLength(1);
      expect(result.current.toasts[0].message).toBe('Long toast');

      // Fast-forward to hide second toast
      act(() => {
        vi.advanceTimersByTime(1700);
      });
      expect(result.current.toasts[0].isVisible).toBe(false);

      // Fast-forward to remove second toast
      act(() => {
        vi.advanceTimersByTime(300);
      });
      expect(result.current.toasts).toHaveLength(0);
    });
  });

  describe('toast types', () => {
    it('supports all toast types', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Success toast', 'success');
        result.current.addToast('Error toast', 'error');
        result.current.addToast('Warning toast', 'warning');
        result.current.addToast('Info toast', 'info');
      });

      expect(result.current.toasts).toHaveLength(4);
      expect(result.current.toasts[0].type).toBe('success');
      expect(result.current.toasts[1].type).toBe('error');
      expect(result.current.toasts[2].type).toBe('warning');
      expect(result.current.toasts[3].type).toBe('info');
    });
  });

  describe('timeout cleanup', () => {
    it('clears timeouts when toast is manually removed before auto-dismiss', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Test toast', 'info', 2000);
      });

      const toastId = result.current.toasts[0].id;
      expect(result.current.toasts).toHaveLength(1);

      // Manually remove toast before auto-dismiss
      act(() => {
        result.current.removeToast(toastId);
      });

      expect(result.current.toasts).toHaveLength(0);

      // Fast-forward past when auto-dismiss would have happened
      act(() => {
        vi.advanceTimersByTime(3000);
      });

      // Should still be empty (no resurrection of toast)
      expect(result.current.toasts).toHaveLength(0);
    });

    it('stores timeout IDs when creating toasts with duration > 0', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Test toast', 'info', 1000);
      });

      const toast = result.current.toasts[0];
      expect(toast.hideTimeoutId).toBeDefined();
      expect(typeof toast.hideTimeoutId).toBe('object'); // NodeJS.Timeout is an object
    });

    it('does not store timeout IDs when duration is 0', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Persistent toast', 'info', 0);
      });

      const toast = result.current.toasts[0];
      expect(toast.hideTimeoutId).toBeUndefined();
      expect(toast.removeTimeoutId).toBeUndefined();
    });

    it('stores removeTimeoutId after hideTimeout executes', async () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Test toast', 'info', 1000);
      });

      // Initially only hideTimeoutId should be set
      expect(result.current.toasts[0].hideTimeoutId).toBeDefined();
      expect(result.current.toasts[0].removeTimeoutId).toBeUndefined();

      // Fast-forward to trigger hide (which sets removeTimeoutId)
      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(result.current.toasts[0].removeTimeoutId).toBeDefined();
    });
  });

  describe('edge cases', () => {
    it('handles empty message', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('');
      });

      expect(result.current.toasts).toHaveLength(1);
      expect(result.current.toasts[0].message).toBe('');
    });

    it('handles negative duration', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Negative duration', 'info', -1000);
      });

      expect(result.current.toasts[0].duration).toBe(-1000);

      // Should not auto-dismiss with negative duration
      act(() => {
        vi.advanceTimersByTime(5000);
      });

      expect(result.current.toasts).toHaveLength(1);
      expect(result.current.toasts[0].isVisible).toBe(true);
    });
  });
});
