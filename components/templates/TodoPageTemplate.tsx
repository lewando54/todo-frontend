import React from 'react';

import { ActivityIndicator, StyleSheet } from 'react-native';

import IconButton from '../atoms/IconButton';
import { ThemedText } from '../atoms/ThemedText';
import { ThemedView } from '../atoms/ThemedView';
import TodoList from '../organisms/TodoList';
import { TaskStatus, TaskWithPending } from '@/constants/Types';
import { useThemeColor } from '@/hooks/useThemeColor';

export interface ITodoPageTemplateProps {
  tasks: TaskWithPending[];
  isLoading: boolean;
  onAdd: () => void;
  onDetails: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onAction: (id: number, action: TaskStatus) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export default function TodoPageTemplate({
  tasks,
  isLoading,
  onAdd,
  onDetails,
  onEdit,
  onDelete,
  onAction,
  onRefresh,
  isRefreshing,
}: ITodoPageTemplateProps) {
  const indicatorColor = useThemeColor({}, 'text');

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Todo list
      </ThemedText>
      <IconButton
        icon="add"
        size={16}
        onPress={onAdd}
        variant="success"
        isLoading={false}
        style={styles.addButton}
      >
        <ThemedText>Add</ThemedText>
      </IconButton>
      {isLoading ? (
        <ActivityIndicator size="large" color={indicatorColor} />
      ) : (
        <TodoList
          tasks={tasks}
          onDetails={onDetails}
          onEdit={onEdit}
          onDelete={onDelete}
          onAction={onAction}
          onRefresh={onRefresh}
          isRefreshing={isRefreshing}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  title: {
    marginBottom: 20,
  },
  addButton: {
    marginBottom: 20,
  },
});
