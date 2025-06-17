import { useToastStore } from '@/stores/toast';
import Toast from './Toast';

const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed top-4 right-2 left-2 z-[9999] mx-auto flex max-w-sm flex-col gap-2 sm:top-6 sm:right-4 sm:left-auto sm:mx-0 sm:max-w-md sm:gap-3"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast toast={toast} onRemove={removeToast} />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
