import React, { useCallback } from 'react';

import { Dimensions, StyleSheet } from 'react-native';
import Animated, { Easing, LinearTransition } from 'react-native-reanimated';

import TodoTaskItem from '../molecules/TodoTaskItem';
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
  return (
    <Animated.FlatList
      data={tasks}
      style={styles.list}
      itemLayoutAnimation={LinearTransition.easing(Easing.linear)}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      keyExtractor={useCallback(
        (item: TaskWithPending) => `task-${item.id}`,
        [],
      )}
      renderItem={({ item }: { item: TaskWithPending }) => (
        <TodoTaskItem
          key={`task-${item.id}`}
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
      removeClippedSubviews={false}
      windowSize={5}
      maxToRenderPerBatch={5}
      initialNumToRender={10}
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
