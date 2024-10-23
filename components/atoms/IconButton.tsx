import { View, Text, StyleProp } from 'react-native'
import React, { ComponentProps } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useThemeColor } from '@/hooks/useThemeColor'
import { ColorVariants } from '@/constants/Colors'

export interface IIconButtonProps {
    icon: ComponentProps<typeof Ionicons>['name'],
    color?: string,
    size: number,
    onPress: () => void,
    variant: 'default' | 'primary' | 'secondary',
    style?: StyleProp<View>
}

export default function IconButton({
  icon,
  color,
  size,
  onPress,
  variant,
  style,
}: IIconButtonProps) {
  const variantSelected = variant === 'default' ? 'text' : variant+'Bg' as keyof ColorVariants
  const variantColor = useThemeColor({}, variantSelected)

  return (
    <View style={
      [
        {
          backgroundColor: variantColor,
          borderRadius: 50,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          width: size + 20,
          height: size + 20,
        }
      ]
    }>
      <Ionicons name={icon} size={size} color={color || variantColor} onPress={onPress} />
    </View>
  )
}