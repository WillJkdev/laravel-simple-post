import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast, Toaster } from 'sonner';

export default function FlashMessage() {
  // Obtener `flash.message`, asegurando que `flash` existe
  const { flash } = usePage().props as { flash?: { type?: string; message?: string } };

  useEffect(() => {
    if (flash?.message) {
      switch (flash.type) {
        case 'success':
          toast.success(flash.message);
          break;
        case 'error':
          toast.error(flash.message);
          break;
        case 'warning':
          toast.warning(flash.message);
          break;
        case 'info':
          toast.info(flash.message);
          break;
        default:
          toast(flash.message);
      }
    }
  }, [flash?.message]);

  return <Toaster position="top-right" richColors />;
}
