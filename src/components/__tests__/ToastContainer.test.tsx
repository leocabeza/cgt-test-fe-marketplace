import { useToastStore } from '@/stores/toast';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import ToastContainer from '../ToastContainer';

// Mock the Toast component to simplify testing
vi.mock('../Toast', () => ({
  default: ({
    toast,
    onRemove,
  }: {
    toast: { id: string; message: string };
    onRemove: (id: string) => void;
  }) => (
    <div data-testid={`toast-${toast.id}`}>
      <span>{toast.message}</span>
      <button type="button" onClick={() => onRemove(toast.id)}>
        Remove
      </button>
    </div>
  ),
}));

describe('ToastContainer Component', () => {
  beforeEach(() => {
    // Clear all toasts before each test
    const { result } = renderHook(() => useToastStore());
    act(() => {
      for (const toast of result.current.toasts) {
        result.current.removeToast(toast.id);
      }
    });
  });

  describe('rendering', () => {
    it('renders nothing when there are no toasts', () => {
      const { container } = render(<ToastContainer />);
      expect(container.firstChild).toBeNull();
    });

    it('has proper accessibility attributes when toasts are present', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Test toast');
      });

      render(<ToastContainer />);

      const container = screen.getByLabelText('Notifications');
      expect(container).toHaveAttribute('aria-live', 'polite');
    });

    it('renders single toast', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Single toast message');
      });

      render(<ToastContainer />);

      expect(screen.getByText('Single toast message')).toBeInTheDocument();
      expect(screen.getByTestId(/toast-/)).toBeInTheDocument();
    });

    it('renders multiple toasts', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('First toast');
        result.current.addToast('Second toast');
        result.current.addToast('Third toast');
      });

      render(<ToastContainer />);

      expect(screen.getByText('First toast')).toBeInTheDocument();
      expect(screen.getByText('Second toast')).toBeInTheDocument();
      expect(screen.getByText('Third toast')).toBeInTheDocument();
      expect(screen.getAllByTestId(/toast-/)).toHaveLength(3);
    });
  });

  describe('container layout', () => {
    it('renders container when toasts are present', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Test toast');
      });

      render(<ToastContainer />);

      const container = screen.getByLabelText('Notifications');
      expect(container).toBeInTheDocument();
    });

    it('toast items are properly wrapped', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Test toast');
      });

      render(<ToastContainer />);

      const toastWrapper = screen.getByTestId(/toast-/).parentElement;
      expect(toastWrapper).toBeInTheDocument();
    });
  });

  describe('toast management integration', () => {
    it('passes correct props to Toast components', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Success message', 'success');
        result.current.addToast('Error message', 'error');
      });

      render(<ToastContainer />);

      expect(screen.getByText('Success message')).toBeInTheDocument();
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('handles toast removal through onRemove callback', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Toast to remove');
        result.current.addToast('Toast to keep');
      });

      render(<ToastContainer />);

      expect(screen.getByText('Toast to remove')).toBeInTheDocument();
      expect(screen.getByText('Toast to keep')).toBeInTheDocument();

      // Click remove button on first toast
      const removeButtons = screen.getAllByText('Remove');
      fireEvent.click(removeButtons[0]);

      // First toast should be removed, second should remain
      expect(screen.queryByText('Toast to remove')).not.toBeInTheDocument();
      expect(screen.getByText('Toast to keep')).toBeInTheDocument();
    });

    it('updates when toasts are added dynamically', () => {
      const { result } = renderHook(() => useToastStore());

      const { rerender } = render(<ToastContainer />);

      // Initially no toasts
      expect(screen.queryByTestId(/toast-/)).not.toBeInTheDocument();

      act(() => {
        result.current.addToast('New toast');
      });

      rerender(<ToastContainer />);

      expect(screen.getByText('New toast')).toBeInTheDocument();
    });

    it('updates when toasts are removed dynamically', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Toast 1');
        result.current.addToast('Toast 2');
      });

      const { rerender } = render(<ToastContainer />);

      expect(screen.getByText('Toast 1')).toBeInTheDocument();
      expect(screen.getByText('Toast 2')).toBeInTheDocument();

      // Remove first toast
      const toastId = result.current.toasts[0].id;
      act(() => {
        result.current.removeToast(toastId);
      });

      rerender(<ToastContainer />);

      expect(screen.queryByText('Toast 1')).not.toBeInTheDocument();
      expect(screen.getByText('Toast 2')).toBeInTheDocument();
    });
  });

  describe('toast ordering', () => {
    it('renders toasts in the order they were added', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('First toast');
        result.current.addToast('Second toast');
        result.current.addToast('Third toast');
      });

      render(<ToastContainer />);

      const toasts = screen.getAllByTestId(/toast-/);
      expect(toasts[0]).toHaveTextContent('First toast');
      expect(toasts[1]).toHaveTextContent('Second toast');
      expect(toasts[2]).toHaveTextContent('Third toast');
    });

    it('maintains consistent keys for React rendering', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Toast 1');
        result.current.addToast('Toast 2');
      });

      const { rerender } = render(<ToastContainer />);

      const initialToasts = screen.getAllByTestId(/toast-/);
      const secondToastId = initialToasts[1].getAttribute('data-testid');

      // Remove middle toast and add new one
      act(() => {
        result.current.removeToast(result.current.toasts[0].id);
        result.current.addToast('Toast 3');
      });

      rerender(<ToastContainer />);

      const updatedToasts = screen.getAllByTestId(/toast-/);
      expect(updatedToasts).toHaveLength(2);
      expect(updatedToasts[0]).toHaveAttribute('data-testid', secondToastId);
      expect(updatedToasts[1]).toHaveTextContent('Toast 3');
    });
  });

  describe('edge cases', () => {
    it('handles rapid toast additions and removals', () => {
      const { result } = renderHook(() => useToastStore());

      render(<ToastContainer />);

      act(() => {
        // Add multiple toasts rapidly
        for (let i = 0; i < 5; i++) {
          result.current.addToast(`Toast ${i}`);
        }
      });

      expect(screen.getAllByTestId(/toast-/)).toHaveLength(5);

      act(() => {
        // Remove some toasts rapidly
        const toastsToRemove = result.current.toasts.slice(0, 3);
        for (const toast of toastsToRemove) {
          result.current.removeToast(toast.id);
        }
      });

      expect(screen.getAllByTestId(/toast-/)).toHaveLength(2);
    });

    it('handles toasts with identical messages', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Identical message');
        result.current.addToast('Identical message');
        result.current.addToast('Identical message');
      });

      render(<ToastContainer />);

      const toasts = screen.getAllByText('Identical message');
      expect(toasts).toHaveLength(3);

      // Each should have unique test IDs (based on unique toast IDs)
      const toastElements = screen.getAllByTestId(/toast-/);
      const testIds = toastElements.map((el) => el.getAttribute('data-testid'));
      const uniqueTestIds = new Set(testIds);
      expect(uniqueTestIds.size).toBe(3);
    });

    it('handles store state changes during render', () => {
      const { result } = renderHook(() => useToastStore());

      act(() => {
        result.current.addToast('Initial toast');
      });

      const { rerender } = render(<ToastContainer />);

      expect(screen.getByText('Initial toast')).toBeInTheDocument();

      // Simulate state change during component lifecycle
      act(() => {
        result.current.addToast('Added during render');
        result.current.removeToast(result.current.toasts[0].id);
      });

      rerender(<ToastContainer />);

      expect(screen.queryByText('Initial toast')).not.toBeInTheDocument();
      expect(screen.getByText('Added during render')).toBeInTheDocument();
    });
  });
});
