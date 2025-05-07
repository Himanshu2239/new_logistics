import { toast } from 'react-hot-toast';

export function useToast() {
  return {
    toast: (message, options = {}) => {
      if (options.type === 'error') {
        return toast.error(message, options);
      }
      if (options.type === 'success') {
        return toast.success(message, options);
      }
      return toast(message, options);
    },
    dismiss: toast.dismiss,
  };
} 