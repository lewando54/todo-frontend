import React from 'react';

import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';
import { TodoStatus } from '@/constants/Enums';

export interface IPillProps {
  variant: TodoStatus | string;
  style?: StyleProp<ViewStyle>;
}

export default function Pill({ variant, style }: IPillProps) {
  switch (variant) {
    case TodoStatus.TODO:
      return (
        <View style={[styles.container, styles.todoContainer, style]}>
          <ThemedText style={styles.pillText}>Todo</ThemedText>
        </View>
      );
    case TodoStatus.ACTIVE:
      return (
        <View style={[styles.container, styles.activeContainer, style]}>
          <ThemedText style={styles.pillText}>Active</ThemedText>
        </View>
      );
    case TodoStatus.COMPLETED:
      return (
        <View style={[styles.container, styles.completedContainer, style]}>
          <ThemedText style={styles.pillText}>Completed</ThemedText>
        </View>
      );
    default:
      <View style={[styles.container, style]}>
        <ThemedText>{variant}</ThemedText>
      </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5000,
    paddingHorizontal: 10,
    paddingVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  todoContainer: {
    backgroundColor: Colors.misc.todoPill,
    borderColor: Colors.misc.todoPillText,
  },
  activeContainer: {
    backgroundColor: Colors.misc.activePill,
    borderColor: Colors.misc.activePillText,
  },
  completedContainer: {
    backgroundColor: Colors.misc.completedPill,
    borderColor: Colors.misc.completedPillText,
  },
  pillText: {
    color: Colors.light.background,
  },
});
