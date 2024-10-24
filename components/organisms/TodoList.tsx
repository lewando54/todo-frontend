import React, { useMemo } from 'react';

import { Dimensions, StyleSheet } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import TodoTaskItem from '../molecules/TodoTaskItem';
import { TodoStatus } from '@/constants/Enums';
import { Task, TaskStatus } from '@/constants/Types';

export interface ITodoListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onAction: (id: number, action: TaskStatus) => void;
}

export default function TodoList({
  tasks,
  onDelete,
  onAction,
}: ITodoListProps) {
  const tasksSortedByStatus = useMemo(
    () =>
      tasks.sort((a, b) => {
        if (
          (a.status === TodoStatus.TODO && b.status === TodoStatus.ACTIVE) ||
          (a.status === TodoStatus.ACTIVE &&
            b.status === TodoStatus.COMPLETED) ||
          (a.status === TodoStatus.TODO && b.status === TodoStatus.COMPLETED)
        ) {
          return -1;
        }
        if (
          (a.status === TodoStatus.ACTIVE && b.status === TodoStatus.TODO) ||
          (a.status === TodoStatus.COMPLETED &&
            b.status === TodoStatus.ACTIVE) ||
          (a.status === TodoStatus.COMPLETED && b.status === TodoStatus.TODO)
        ) {
          return 1;
        }
        return 0;
      }),

    [tasks],
  );

  return (
    <Animated.FlatList
      data={tasksSortedByStatus}
      style={styles.list}
      itemLayoutAnimation={LinearTransition}
      renderItem={({ item }) => (
        <TodoTaskItem
          key={item.id}
          id={item.id}
          title={item.title}
          status={item.status}
          onDelete={(id) => onDelete(id)}
          onAction={(id, action) => onAction(id, action)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
    maxWidth:
      Dimensions.get('window').width < 800
        ? Dimensions.get('window').width
        : 800,
  },
});
