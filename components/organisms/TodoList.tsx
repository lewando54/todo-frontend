import { Dimensions } from 'react-native'
import React from 'react'
import TodoTaskItem from '../molecules/TodoTaskItem'
import { TodoStatus } from '@/constants/Enums'
import { Task, TaskStatus } from '@/constants/Types'
import Animated, { LinearTransition } from 'react-native-reanimated'

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
    <Animated.FlatList
    data={tasksSortedByStatus}
    style={{
        width: '100%',
        maxWidth: Dimensions.get('window').width < 800 ? Dimensions.get('window').width : 800,
    }}
    itemLayoutAnimation={LinearTransition}
    renderItem={({ item }) => (
      <TodoTaskItem
        key={item.id}
        id={item.id}
        title={item.title}
        status={item.status}
        onDelete={(id) => onDelete(id)}
        onAction={(action, id) => onAction(action, id)}
       />
    )}
  />
  )
}