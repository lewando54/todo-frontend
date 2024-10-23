import React, { ComponentProps } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleProp, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ColorVariants } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

export interface IIconButtonProps {
  icon: ComponentProps<typeof Ionicons>['name'];
  color?: string;
  size: number;
  onPress: () => void;
  variant: 'default' | 'primary' | 'secondary';
  style?: StyleProp<View>;
}

export default function IconButton({
  icon,
  color,
  size,
  onPress,
  variant = 'default',
  style,
}: IIconButtonProps) {
  const variantBGSelected =
    variant === 'default'
      ? 'primaryBg'
      : (`${variant}Bg` as keyof ColorVariants);
  const variantBg = useThemeColor({}, variantBGSelected);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: variantBg,
          width: size + 20,
          height: size + 20,
        },
      ]}
    >
      <Ionicons name={icon} size={size} color={color || variantBg} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5000,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
