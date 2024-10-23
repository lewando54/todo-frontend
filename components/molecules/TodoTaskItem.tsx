import { View, Text } from 'react-native'
import React from 'react'
import { TaskStatus, TodoStatus } from '@/constants/Enums'
import { ThemedText } from '../atoms/ThemedText'
import { ThemedView } from '../atoms/ThemedView'
import { Href, Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import ThemedIcon from '../atoms/ThemedIcon'

export interface ITodoTaskItemProps {
    id: number,
    title: string,
    description: string,
    status: TaskStatus,
}

export default function TodoTaskItem({
    id,
    title,
    description,
    status,
}: ITodoTaskItemProps) {
  return (
    <ThemedView
        lightColor='#f9f9f9'
        darkColor='#333'
        style={{
            padding: 10,
            margin: 5,
            borderRadius: 10,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}
    >
        <ThemedText type="subtitle">{title}</ThemedText>
        <View style={
            {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 10
            }
        }>
            {status === "ACTIVE" && (
                <ThemedText type="link">Mark as done</ThemedText>
            )}
            {status === "TODO" && (
                <ThemedText type="link">Mark as active</ThemedText>
            )}
            {status === "COMPLETED" && (
                <ThemedText type="link">Delete</ThemedText>
            )}
            <Link href={`/tasks/${id}` as Href<string>}>
                <ThemedIcon 
                    name="pencil"
                    size={16}
                />
            </Link>
        </View>
    </ThemedView>
  )
}