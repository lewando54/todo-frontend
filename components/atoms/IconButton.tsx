import React, { ComponentProps } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { ColorVariants } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

export interface IIconButtonProps {
  children: React.ReactElement;
  icon: ComponentProps<typeof Ionicons>['name'];
  color?: string;
  size: number;
  onPress: () => void;
  variant:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'warning';
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
}

export default function IconButton({
  children,
  icon,
  color,
  size,
  onPress,
  variant = 'default',
  style,
  isLoading,
}: IIconButtonProps) {
  const variantBGSelected =
    variant === 'default'
      ? 'primaryBg'
      : (`${variant}Bg` as keyof ColorVariants);
  const variantBg = useThemeColor({}, variantBGSelected);
  const iconColor = useThemeColor({}, 'text');

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: variantBg,
        },
        style,
      ]}
    >
      {children}
      {isLoading ? (
        <ActivityIndicator size="small" color={iconColor} />
      ) : (
        <Ionicons name={icon} size={size} color={color || iconColor} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 7,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
