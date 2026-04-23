"use client";

import { toast as sonnerToast } from 'sonner';

/**
 * Toast 알림을 쉽게 사용하기 위한 Hook
 */
export const useToast = () => {
  const success = (message: string) => {
    sonnerToast.success(message);
  };

  const error = (message: string) => {
    sonnerToast.error(message);
  };

  const info = (message: string) => {
    sonnerToast.info(message);
  };

  const warning = (message: string) => {
    sonnerToast.warning(message);
  };

  return {
    success,
    error,
    info,
    warning,
    toast: sonnerToast,
  };
};
