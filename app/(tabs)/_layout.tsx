import { Stack } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="task/[id]/index"
        options={{
          title: 'Task',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="task/create"
        options={{
          title: 'Add task',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="task/[id]/edit"
        options={{
          title: 'Edit task',
          headerShown: true,
        }}
      />
    </Stack>
  );
}
