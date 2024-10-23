import React, { ComponentProps } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export interface IThemedIconProps {
  name: ComponentProps<typeof Ionicons>['name'];
  size: number;
  onPress?: () => void;
  lightColor?: string;
  darkColor?: string;
}

export default function ThemedIcon({
  name,
  size,
  lightColor,
  darkColor,
  onPress,
}: IThemedIconProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Ionicons
      name={name}
      size={size}
      color={color}
      onPress={onPress}
      style={{
        cursor: onPress ? 'pointer' : 'auto',
      }}
    />
  );
}
