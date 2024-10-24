import React from 'react';

import { StyleSheet } from 'react-native';

import { ThemedView } from '../atoms/ThemedView';
import TaskDetailsBox from '../organisms/TaskDetailsBox';
import { Task } from '@/constants/Types';

export interface ITaskDetailsPageTemplateProps {
  taskDetails: Task;
  isLoading: boolean;
  onDelete: () => void;
  onEdit: () => void;
  isDeletePending: boolean;
}

export default function TaskDetailsPageTemplate({
  taskDetails,
  isLoading,
  onDelete,
  onEdit,
  isDeletePending,
}: ITaskDetailsPageTemplateProps) {
  return (
    <ThemedView style={styles.container}>
      <TaskDetailsBox
        taskDetails={taskDetails}
        isLoading={isLoading}
        onDelete={onDelete}
        onEdit={onEdit}
        isDeletePending={isDeletePending}
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
    justifyContent: 'center',
    width: '100%',
  },
});
