import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { TaskStatus, TodoStatus } from '@/constants/Enums'
import { ThemedText } from '../atoms/ThemedText'
import { ThemedView } from '../atoms/ThemedView'
import { Href, Link } from 'expo-router'
import ThemedIcon from '../atoms/ThemedIcon'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useThemeColor } from '@/hooks/useThemeColor'

export interface ITodoTaskItemProps {
    id: number,
    title: string,
    description: string,
    status: TaskStatus,
    onDelete: (id: number) => void,
    onAction: (action: TaskStatus, id: number) => void,
}

export default function TodoTaskItem({
    id,
    title,
    description,
    status,
    onDelete,
    onAction,
}: ITodoTaskItemProps) {

  const animatedWidth = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedWidth.value}%`,
    };
  });

  const animatedColor = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedWidth.value, [0, 98], [1, 0]),
    };
  });

    useEffect(() => {
        if(status === TodoStatus.COMPLETED) {
            animatedWidth.value = withTiming(98, { duration: 1000 });
        }
        else {
            animatedWidth.value = withTiming(0, { duration: 500 });
        }
    }, [status]);

  const ActionButton = () => {
    switch (status) {
        case TodoStatus.ACTIVE:
            return (
            <ThemedIcon 
                name="square-outline"
                size={16}
                onPress={() => onAction(TodoStatus.TODO, id)}
            />
            )
        case TodoStatus.TODO:
            return (
            <ThemedIcon
                name="play"
                size={16}
                onPress={() => onAction(TodoStatus.COMPLETED, id)}
            />
            )
        case TodoStatus.COMPLETED:
            return (
            <ThemedIcon
                name="checkbox-outline"
                size={16}
                onPress={() => onAction(TodoStatus.ACTIVE, id)}
            />
            )
        default:
            return null
        }
  }

  return (
    <ThemedView
        lightColor='#ddd'
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
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <ThemedText type="subtitle"
                        style={[
                        animatedColor,
                        {
                            paddingRight: 10,  
                        }]}
            >{title}</ThemedText>
            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        height: 2,
                        borderRadius: 5,
                        backgroundColor: '#666',
                    },
                    animatedStyle
                ]}
            />
        </View>
        <View style={
            {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 10
            }
        }>
            <ActionButton />
            <Link href={`/tasks/${id}` as Href<string>}>
                <ThemedIcon 
                    name="pencil"
                    size={16}
                />
            </Link>
            <ThemedIcon 
                name="close"
                size={16}
                onPress={() => onDelete(id)}
            />
        </View>
    </ThemedView>
  )
}