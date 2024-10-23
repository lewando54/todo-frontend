import { View, Text } from 'react-native'
import React, { ComponentProps } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/hooks/useThemeColor'

export interface IThemedIconProps {
    name: ComponentProps<typeof Ionicons>['name'],
    size: number,
    lightColor?: string,
    darkColor?: string,
}

export default function ThemedIcon(
    { name, size, lightColor, darkColor }: IThemedIconProps
) {
  const color = useThemeColor({light: lightColor, dark: darkColor}, 'text')

  return (
    <Ionicons name={name} size={size} color={color} />
  )
}