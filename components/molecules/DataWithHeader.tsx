import React from 'react';

import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { ThemedText } from '../atoms/ThemedText';

export interface ITextWithHeaderProps {
  title: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

export default function DataWithHeader({
  title,
  children,
  style,
  titleStyle,
}: ITextWithHeaderProps) {
  return (
    <View style={[styles.container, style]}>
      <ThemedText style={[styles.titleStyle, titleStyle]}>{title}</ThemedText>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    alignItems: 'flex-start',
    gap: 5,
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
