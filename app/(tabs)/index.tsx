import { Image, StyleSheet, Platform, View } from 'react-native';

import { ThemedText } from '@/components/atoms/ThemedText';
import { ThemedView } from '@/components/atoms/ThemedView';
import { Link } from 'expo-router';
import IconButton from '@/components/atoms/IconButton';
import TodoPageTemplate from '@/components/templates/TodoPageTemplate';

export default function HomeScreen() {
  return (
    <TodoPageTemplate />
  );
}
