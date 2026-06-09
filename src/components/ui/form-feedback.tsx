'use client';

import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

/**
 * Toast context for managing notifications
 */
const ToastContext = React.createContext<{
  toasts: Toast[];
  addToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
} | null>(null);

/**
 * ToastProvider - Context provider for toast notifications
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType = 'info', duration = 5000) => {
    const id = Date.now().toString();
    const newToast: Toast = { id, message, type, duration };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

/**
 * useToast - Hook to use toast notifications
 */
export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

/**
 * ToastContainer - Displays all active toasts
 */
function ToastContainer({
  toasts,
  onRemove,
}: {
  toasts: Toast[];
  onRemove: (id: string) => void;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-3 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

/**
 * ToastItem - Individual toast notification
 */
function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) {
  const [isExiting, setIsExiting] = useState(false);

  const bgColor = {
    success: 'bg-green-500/90',
    error: 'bg-red-500/90',
    info: 'bg-blue-500/90',
  }[toast.type];

  const Icon = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  }[toast.type];

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onRemove(toast.id), 150);
  };

  return (
    <div
      className={`
        pointer-events-auto
        flex items-start gap-3 
        ${bgColor} 
        text-white rounded-lg 
        px-4 py-3 
        shadow-lg backdrop-blur-sm
        transform transition-all duration-150
        ${isExiting ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'}
        max-w-sm
      `}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <p className="text-sm font-medium flex-1">{toast.message}</p>
      <button
        onClick={handleClose}
        className="text-white/70 hover:text-white transition-colors flex-shrink-0 ml-2"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

/**
 * FormFeedback component - Displays form submission status
 */
interface FormFeedbackProps {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export function FormFeedback({ status, message }: FormFeedbackProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (status !== 'idle') {
      setIsVisible(true);
    }
  }, [status]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (status) {
      case 'loading':
        return <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return null;
    }
  };

  const getBgColor = () => {
    switch (status) {
      case 'success':
        return 'bg-green-500/10 border-green-500/20';
      case 'error':
        return 'bg-red-500/10 border-red-500/20';
      case 'loading':
        return 'bg-blue-500/10 border-blue-500/20';
      default:
        return 'bg-white/5 border-white/10';
    }
  };

  const getText = () => {
    if (message) return message;
    switch (status) {
      case 'loading':
        return 'Processing...';
      case 'success':
        return 'Success! Your message has been sent.';
      case 'error':
        return 'Error! Please try again.';
      default:
        return '';
    }
  };

  return (
    <div
      className={`
        flex items-center gap-3 p-4 rounded-lg border
        ${getBgColor()}
        transition-all duration-200
      `}
    >
      {getIcon()}
      <p className="text-sm text-white/80">{getText()}</p>
    </div>
  );
}
