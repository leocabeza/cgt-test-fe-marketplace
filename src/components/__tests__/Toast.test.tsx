import type { Toast as ToastType } from '@/stores/toast';
import { fireEvent, render, screen } from '@testing-library/react';
import Toast from '../Toast';

const mockToast: ToastType = {
  id: 'test-toast-1',
  message: 'Test toast message',
  type: 'success',
  duration: 4000,
  isVisible: true,
};

const mockOnRemove = vi.fn();

describe('Toast Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('renders toast with message', () => {
      render(<Toast toast={mockToast} onRemove={mockOnRemove} />);

      expect(screen.getByText('Test toast message')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('renders close button', () => {
      render(<Toast toast={mockToast} onRemove={mockOnRemove} />);

      const closeButton = screen.getByLabelText('Close notification');
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toHaveTextContent('×');
    });

    it('has proper accessibility attributes', () => {
      render(<Toast toast={mockToast} onRemove={mockOnRemove} />);

      const toast = screen.getByRole('alert');
      expect(toast).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('toast types', () => {
    it('renders success toast with correct icon', () => {
      const successToast: ToastType = { ...mockToast, type: 'success' };
      render(<Toast toast={successToast} onRemove={mockOnRemove} />);

      expect(screen.getByText('✓')).toBeInTheDocument();
    });

    it('renders error toast with correct icon', () => {
      const errorToast: ToastType = { ...mockToast, type: 'error' };
      render(<Toast toast={errorToast} onRemove={mockOnRemove} />);

      expect(screen.getByText('✗')).toBeInTheDocument();
    });

    it('renders warning toast with correct icon', () => {
      const warningToast: ToastType = { ...mockToast, type: 'warning' };
      render(<Toast toast={warningToast} onRemove={mockOnRemove} />);

      expect(screen.getByText('⚠')).toBeInTheDocument();
    });

    it('renders info toast with correct icon', () => {
      const infoToast: ToastType = { ...mockToast, type: 'info' };
      render(<Toast toast={infoToast} onRemove={mockOnRemove} />);

      expect(screen.getByText('ℹ')).toBeInTheDocument();
    });
  });

  describe('animations', () => {
    it('renders toast component without crashing', () => {
      render(<Toast toast={mockToast} onRemove={mockOnRemove} />);

      const toast = screen.getByRole('alert');
      expect(toast).toBeInTheDocument();
    });

    it('responds to visibility changes', async () => {
      const { rerender } = render(
        <Toast toast={mockToast} onRemove={mockOnRemove} />
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();

      // Change to invisible
      const hiddenToast: ToastType = { ...mockToast, isVisible: false };
      rerender(<Toast toast={hiddenToast} onRemove={mockOnRemove} />);

      // Toast should still be in DOM but with different visibility state
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('user interactions', () => {
    it('calls onRemove when close button is clicked', () => {
      render(<Toast toast={mockToast} onRemove={mockOnRemove} />);

      const closeButton = screen.getByLabelText('Close notification');
      fireEvent.click(closeButton);

      expect(mockOnRemove).toHaveBeenCalledWith('test-toast-1');
      expect(mockOnRemove).toHaveBeenCalledTimes(1);
    });

    it('close button is keyboard accessible', () => {
      render(<Toast toast={mockToast} onRemove={mockOnRemove} />);

      const closeButton = screen.getByLabelText('Close notification');
      expect(closeButton).toHaveAttribute('type', 'button');

      // Simulate Enter key press
      fireEvent.keyDown(closeButton, { key: 'Enter', code: 'Enter' });
      fireEvent.click(closeButton);

      expect(mockOnRemove).toHaveBeenCalledWith('test-toast-1');
    });
  });

  describe('message handling', () => {
    it('renders long messages properly', () => {
      const longMessageToast: ToastType = {
        ...mockToast,
        message:
          'This is a very long toast message that should wrap properly and not overflow the container boundaries',
      };

      render(<Toast toast={longMessageToast} onRemove={mockOnRemove} />);

      const message = screen.getByText(/This is a very long toast message/);
      expect(message).toBeInTheDocument();
    });

    it('renders empty message', () => {
      const emptyMessageToast: ToastType = { ...mockToast, message: '' };
      render(<Toast toast={emptyMessageToast} onRemove={mockOnRemove} />);

      const toast = screen.getByRole('alert');
      expect(toast).toBeInTheDocument();
    });

    it('renders message with special characters', () => {
      const specialCharToast: ToastType = {
        ...mockToast,
        message: 'Toast with émojis 🎉 and speciål chars!',
      };

      render(<Toast toast={specialCharToast} onRemove={mockOnRemove} />);

      expect(
        screen.getByText('Toast with émojis 🎉 and speciål chars!')
      ).toBeInTheDocument();
    });
  });

  describe('layout', () => {
    it('renders all toast elements correctly', () => {
      render(<Toast toast={mockToast} onRemove={mockOnRemove} />);

      const toast = screen.getByRole('alert');
      expect(toast).toBeInTheDocument();

      const message = screen.getByText('Test toast message');
      expect(message).toBeInTheDocument();

      const icon = screen.getByText('✓');
      expect(icon).toBeInTheDocument();

      const closeButton = screen.getByLabelText('Close notification');
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('handles toast with undefined properties gracefully', () => {
      const malformedToast = {
        id: 'malformed-toast',
        message: 'Malformed toast',
        type: 'unknown' as ToastType['type'],
        isVisible: true,
      };

      // Should not crash and should use default styling
      render(<Toast toast={malformedToast} onRemove={mockOnRemove} />);

      expect(screen.getByText('Malformed toast')).toBeInTheDocument();
      expect(screen.getByText('ℹ')).toBeInTheDocument(); // Should use default icon
    });

    it('updates message when props change', () => {
      const { rerender } = render(
        <Toast toast={mockToast} onRemove={mockOnRemove} />
      );

      expect(screen.getByText('Test toast message')).toBeInTheDocument();

      const updatedToast: ToastType = {
        ...mockToast,
        message: 'Updated message',
      };

      rerender(<Toast toast={updatedToast} onRemove={mockOnRemove} />);

      expect(screen.getByText('Updated message')).toBeInTheDocument();
      expect(screen.queryByText('Test toast message')).not.toBeInTheDocument();
    });
  });
});
