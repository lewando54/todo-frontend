import React, { useMemo } from 'react';

import { Dimensions, StyleSheet } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import TodoTaskItem from '../molecules/TodoTaskItem';
import { TodoStatus } from '@/constants/Enums';
import { TaskStatus, TaskWithPending } from '@/constants/Types';

export interface ITodoListProps {
  tasks: TaskWithPending[];
  onDetails: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onAction: (id: number, action: TaskStatus) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export default function TodoList({
  tasks,
  onDetails,
  onEdit,
  onDelete,
  onAction,
  onRefresh,
  isRefreshing,
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
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TodoTaskItem
          key={item.id}
          id={item.id}
          title={item.title}
          status={item.status}
          onDetails={onDetails}
          onEdit={onEdit}
          onDelete={onDelete}
          onAction={onAction}
          isPending={item.isPending}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
    flex: 1,
    maxWidth:
      Dimensions.get('window').width < 800
        ? Dimensions.get('window').width
        : 800,
  },
});
