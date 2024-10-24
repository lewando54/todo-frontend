import React from 'react';

import { FormProvider } from 'react-hook-form';

import { useTaskEditPage } from './hooks/ui/useTaskEditPage';
import TaskEditPageTemplate from '@/components/templates/TaskEditPageTemplate';

export default function TaskEditPage() {
  const { methods, taskStatusOptions, onSubmit, isLoading } = useTaskEditPage();

  return (
    <FormProvider {...methods}>
      <TaskEditPageTemplate
        onSubmit={onSubmit}
        taskStatusOptions={taskStatusOptions}
        isLoading={isLoading}
      />
    </FormProvider>
  );
}
