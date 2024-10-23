import { View, Text, FlatList, Dimensions } from 'react-native'
import React from 'react'
import { ThemedText } from '../atoms/ThemedText'
import TodoTaskItem from '../molecules/TodoTaskItem'
import { TaskStatus, TodoStatus } from '@/constants/Enums'
import { Task } from '@/constants/Types'

export interface ITodoListProps {
    tasks: Task[]
    onDelete: (id: number) => void
    onAction: (action: TaskStatus, id: number) => void
}

export default function TodoList({
    tasks,
    onDelete,
    onAction,
}: ITodoListProps) {
  const tasksSortedByStatus = tasks.sort((a, b) => {
    if (a.status === TodoStatus.TODO && b.status !== TodoStatus.TODO) {
      return -1
    }
    if (a.status !== TodoStatus.TODO && b.status === TodoStatus.TODO) {
      return 1
    }
    return 0
  })

  return (
    <FlatList
    data={tasksSortedByStatus}
    style={{
        width: '100%',
        maxWidth: Dimensions.get('window').width < 1200 ? Dimensions.get('window').width : 800,
    }}
    renderItem={({ item }) => (
      <TodoTaskItem
        key={item.id}
        id={item.id}
        title={item.title}
        description={item.description}
        status={item.status}
        onDelete={(id) => onDelete(id)}
        onAction={(action, id) => onAction(action, id)}
       />
    )}
  >
  </FlatList>
  )
}