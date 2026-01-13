import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';

interface SafeContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

// SafeContainer.tsx
export function SafeContainer({ children, style, edges = ['top'] }: SafeContainerProps) {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: colors.background,
        },
        style,
      ]}
      edges={edges}>
      {children}
    </SafeAreaView>
  );
}
