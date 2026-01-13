import React, { createContext, useContext, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from './ThemeContext';
import { CircleCheck as CheckCircle, CircleAlert as AlertCircle, Circle as XCircle, Info } from 'lucide-react-native';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const { colors } = useTheme();

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now().toString();
    const newToast: Toast = { id, message, type };
    
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  const getToastIcon = (type: ToastType) => {
    const iconProps = { size: 20, color: colors.white };
    
    switch (type) {
      case 'success':
        return <CheckCircle {...iconProps} />;
      case 'error':
        return <XCircle {...iconProps} />;
      case 'warning':
        return <AlertCircle {...iconProps} />;
      default:
        return <Info {...iconProps} />;
    }
  };

  const getToastColor = (type: ToastType) => {
    switch (type) {
      case 'success':
        return colors.success;
      case 'error':
        return colors.error;
      case 'warning':
        return colors.warning;
      default:
        return colors.secondary;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <View style={styles.toastContainer}>
        {toasts.map((toast) => (
          <View
            key={toast.id}
            style={[
              styles.toast,
              { backgroundColor: getToastColor(toast.type) }
            ]}
          >
            {getToastIcon(toast.type)}
            <Text style={[styles.toastText, { color: colors.white }]}>
              {toast.message}
            </Text>
          </View>
        ))}
      </View>
    </ToastContext.Provider>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    zIndex: 9999,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  toastText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 8,
    flex: 1,
  },
});

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}