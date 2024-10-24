import React from 'react';

import { FormProvider } from 'react-hook-form';

import { useTaskAddPage } from './hooks/ui/useTaskAddPage';
import TaskAddPageTemplate from '@/components/templates/TaskAddPageTemplate';

export default function TaskAddPage() {
  const { methods, onSubmit } = useTaskAddPage();

  return (
    <FormProvider {...methods}>
      <TaskAddPageTemplate onSubmit={onSubmit} />
    </FormProvider>
  );
}
