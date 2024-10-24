import React from 'react';

import { useTodoPage } from './hooks/ui/useTodoPage';
import TodoPageTemplate from '@/components/templates/TodoPageTemplate';

export default function TodoPage() {
  const { tasks, isLoading, isPending, onDelete, onAction } = useTodoPage();

  return (
    <TodoPageTemplate
      tasks={tasks}
      isLoading={isLoading}
      isPending={isPending}
      onDelete={onDelete}
      onAction={onAction}
    />
  );
}
