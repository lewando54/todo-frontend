import React, { useEffect } from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
import { useThemeColor } from '@/hooks/useThemeColor';

export interface ITodoTaskItemProps {
  id: number;
  title: string;
  status: TaskStatus;
  onDetails: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onAction: (id: number, action: TaskStatus) => void;
  isPending?: boolean;
}

export default function TodoTaskItem({
  id,
  title,
  status,
  onDetails,
  onEdit,
  onDelete,
  onAction,
  isPending,
}: ITodoTaskItemProps) {
  const indicatorColor = useThemeColor({}, 'text');
  const boxColor = useThemeColor({}, 'boxBg');
  const animatedWidth = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${interpolate(animatedWidth.value, [0, 1], [0, 95])}%`,
    };
  });

  const animatedColor = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedWidth.value, [0, 1], [1, 0.4]),
    };
  });

  useEffect(() => {
    if (status === TodoStatus.COMPLETED) {
      animatedWidth.value = withTiming(1, { duration: 1000 });
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
    <ThemedView
      lightColor={boxColor}
      darkColor={boxColor}
      style={styles.container}
    >
      <TouchableOpacity
        style={styles.titleContainer}
        onPress={() => onDetails(id)}
      >
        <ThemedText type="subtitle" style={animatedColor}>
          {title}
        </ThemedText>
        <Animated.View style={[styles.bar, animatedStyle]} />
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <ActionButton />
        <TouchableOpacity onPress={() => onEdit(id)}>
          <ThemedIcon name="pencil" size={16} />
        </TouchableOpacity>
        {isPending ? (
          <ActivityIndicator size="small" color={indicatorColor} />
        ) : (
          <ThemedIcon name="close" size={16} onPress={() => onDelete(id)} />
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  bar: {
    position: 'absolute',
    height: 2,
    width: '0%',
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
