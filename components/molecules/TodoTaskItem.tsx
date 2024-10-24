import React, { useEffect } from 'react';

import { Href, Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import ThemedIcon from '../atoms/ThemedIcon';
import { ThemedText } from '../atoms/ThemedText';
import { ThemedView } from '../atoms/ThemedView';
import { Colors } from '@/constants/Colors';
import { TodoStatus } from '@/constants/Enums';
import { TaskStatus } from '@/constants/Types';

export interface ITodoTaskItemProps {
  id: number;
  title: string;
  status: TaskStatus;
  onDelete: (id: number) => void;
  onAction: (id: number, action: TaskStatus) => void;
}

export default function TodoTaskItem({
  id,
  title,
  status,
  onDelete,
  onAction,
}: ITodoTaskItemProps) {
  const animatedWidth = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedWidth.value}%`,
    };
  });

  const animatedColor = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedWidth.value, [0, 98], [1, 0.5]),
    };
  });

  useEffect(() => {
    if (status === TodoStatus.COMPLETED) {
      animatedWidth.value = withTiming(98, { duration: 1000 });
    } else {
      animatedWidth.value = withTiming(0, { duration: 1000 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const ActionButton = () => {
    switch (status) {
      case TodoStatus.ACTIVE:
        return (
          <ThemedIcon
            name="square-outline"
            size={16}
            onPress={() => onAction(id, TodoStatus.ACTIVE)}
          />
        );
      case TodoStatus.TODO:
        return (
          <ThemedIcon
            name="play"
            size={16}
            onPress={() => onAction(id, TodoStatus.TODO)}
          />
        );
      case TodoStatus.COMPLETED:
        return (
          <ThemedIcon
            name="checkbox-outline"
            size={16}
            onPress={() => onAction(id, TodoStatus.COMPLETED)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ThemedView lightColor="#ddd" darkColor="#333" style={styles.container}>
      <View style={styles.titleContainer}>
        <ThemedText type="subtitle" style={animatedColor}>
          {title}
        </ThemedText>
        <Animated.View style={[styles.bar, animatedStyle]} />
      </View>
      <View style={styles.buttonsContainer}>
        <ActionButton />
        <Link href={`/tasks/${id}` as Href<string>}>
          <ThemedIcon name="pencil" size={16} />
        </Link>
        <ThemedIcon name="close" size={16} onPress={() => onDelete(id)} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  bar: {
    position: 'absolute',
    height: 2,
    borderRadius: 5,
    backgroundColor: Colors.misc.gray,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
});
