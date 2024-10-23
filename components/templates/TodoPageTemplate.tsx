import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ThemedText } from '../atoms/ThemedText'
import { ThemedView } from '../atoms/ThemedView'
import TodoList from '../organisms/TodoList'
import { TodoStatus } from '@/constants/Enums'

const tasks = [
    {
        id: 1,
        creationDate: new Date('2021-01-01'),
        title: 'Task 1',
        description: 'Description 1',
        status: TodoStatus.ACTIVE
    },
    {
        id: 2,
        creationDate: new Date('2021-01-02'),
        title: 'Task 2',
        description: 'Description 2',
        status: TodoStatus.TODO
    },
    {
        id: 3,
        creationDate: new Date('2021-01-03'),
        title: 'Task 3',
        description: 'Description 3',
        status: TodoStatus.COMPLETED
    },
]

export default function TodoPageTemplate() {
  return (
    <ThemedView style={styles.container}>
        <ThemedText type="title" style={{
            marginBottom: 20,
        }}>Todo list</ThemedText>
        <TodoList tasks={tasks}/>
    </ThemedView>
  )
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
});