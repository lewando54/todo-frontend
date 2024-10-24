import React from 'react';

import { useTaskDetailsPage } from './hooks/ui/useTaskDetailsPage';
import TaskDetailsPageTemplate from '@/components/templates/TaskDetailsPageTemplate';

export default function TaskDetailsPage() {
  const { taskDetails, isLoading, onDelete, onEdit, isDeletePending } =
    useTaskDetailsPage();

  return (
    <TaskDetailsPageTemplate
      taskDetails={taskDetails}
      isLoading={isLoading}
      onDelete={onDelete}
      onEdit={onEdit}
      isDeletePending={isDeletePending}
    />
  );
}
