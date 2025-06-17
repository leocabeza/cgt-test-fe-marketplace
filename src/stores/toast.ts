import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  isVisible: boolean;
  hideTimeoutId?: ReturnType<typeof setTimeout>;
  removeTimeoutId?: ReturnType<typeof setTimeout>;
}

interface ToastState {
  toasts: Toast[];
  addToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
  hideToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],

  addToast: (message: string, type: ToastType = 'info', duration = 4000) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    let hideTimeoutId: NodeJS.Timeout | undefined;
    let removeTimeoutId: NodeJS.Timeout | undefined;

    const toast: Toast = {
      id,
      message,
      type,
      duration,
      isVisible: true,
    };

    // Auto-remove toast after duration
    if (duration > 0) {
      hideTimeoutId = setTimeout(() => {
        get().hideToast(id);
        removeTimeoutId = setTimeout(() => {
          get().removeToast(id);
        }, 300); // Wait for hide animation to complete

        // Update the toast with removeTimeoutId
        set((state) => ({
          toasts: state.toasts.map((t) =>
            t.id === id ? { ...t, removeTimeoutId } : t
          ),
        }));
      }, duration);

      // Add timeout IDs to toast
      toast.hideTimeoutId = hideTimeoutId;
    }

    set((state) => ({
      toasts: [...state.toasts, toast],
    }));
  },

  removeToast: (id: string) =>
    set((state) => {
      const toastToRemove = state.toasts.find((toast) => toast.id === id);

      // Clear any pending timeouts
      if (toastToRemove) {
        if (toastToRemove.hideTimeoutId) {
          clearTimeout(toastToRemove.hideTimeoutId);
        }
        if (toastToRemove.removeTimeoutId) {
          clearTimeout(toastToRemove.removeTimeoutId);
        }
      }

      return {
        toasts: state.toasts.filter((toast) => toast.id !== id),
      };
    }),

  hideToast: (id: string) =>
    set((state) => ({
      toasts: state.toasts.map((toast) =>
        toast.id === id ? { ...toast, isVisible: false } : toast
      ),
    })),
}));
