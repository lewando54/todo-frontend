import React from 'react';

import { useTodoPage } from './hooks/ui/useTodoPage';
import TodoPageTemplate from '@/components/templates/TodoPageTemplate';

export default function TodoPage() {
  const {
    tasks,
    isLoading,
    onAdd,
    onDetails,
    onEdit,
    onDelete,
    onAction,
    onRefresh,
  } = useTodoPage();
  return (
    <TodoPageTemplate
      tasks={tasks}
      isLoading={isLoading}
      onAdd={onAdd}
      onDetails={onDetails}
      onEdit={onEdit}
      onDelete={onDelete}
      onAction={onAction}
      onRefresh={onRefresh}
      isRefreshing={isLoading}
    />
  );
}
