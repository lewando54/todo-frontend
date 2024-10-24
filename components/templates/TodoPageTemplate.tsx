import React from 'react';

import { StyleSheet } from 'react-native';

import { ThemedText } from '../atoms/ThemedText';
import { ThemedView } from '../atoms/ThemedView';
import TodoList from '../organisms/TodoList';
import { Task, TaskStatus } from '@/constants/Types';

export interface ITodoPageTemplateProps {
  tasks: Task[];
  isLoading: boolean;
  isPending: {
    delete: boolean;
    update: boolean;
  };
  onDelete: (id: number) => void;
  onAction: (id: number, action: TaskStatus) => void;
}

export default function TodoPageTemplate({
  tasks,
  isLoading,
  isPending,
  onDelete,
  onAction,
}: ITodoPageTemplateProps) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Todo list
      </ThemedText>
      <TodoList
        tasks={tasks}
        onDelete={(id) => onDelete(id)}
        onAction={(id, action) => onAction(id, action)}
      />
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
});
