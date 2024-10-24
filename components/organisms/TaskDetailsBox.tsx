import React from 'react';

import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';

import IconButton from '../atoms/IconButton';
import Pill from '../atoms/Pill';
import { ThemedText } from '../atoms/ThemedText';
import { ThemedView } from '../atoms/ThemedView';
import DataWithHeader from '../molecules/DataWithHeader';
import { Task } from '@/constants/Types';
import { useThemeColor } from '@/hooks/useThemeColor';
import { getDateTime } from '@/utils/utils';

export interface ITaskDetailsBoxProps {
  taskDetails: Task;
  isLoading: boolean;
  onDelete: () => void;
  onEdit: () => void;
  isDeletePending: boolean;
}

export default function TaskDetailsBox({
  taskDetails,
  isLoading,
  onDelete,
  onEdit,
  isDeletePending,
}: ITaskDetailsBoxProps) {
  const indicatorColor = useThemeColor({}, 'text');
  const boxBg = useThemeColor({}, 'boxBg');

  return (
    <ThemedView
      style={[styles.container, isLoading && styles.loading]}
      lightColor={boxBg}
      darkColor={boxBg}
    >
      {isLoading ? (
        <ActivityIndicator size="large" color={indicatorColor} />
      ) : (
        <>
          <View style={[styles.titleContainer, styles.sm]}>
            <DataWithHeader title="Title">
              <ThemedText>{taskDetails.title}</ThemedText>
            </DataWithHeader>
            <DataWithHeader title="Created">
              <ThemedText>{getDateTime(taskDetails.createdAt)}</ThemedText>
            </DataWithHeader>
          </View>
          <DataWithHeader title="Description">
            <ThemedText>{taskDetails.description}</ThemedText>
          </DataWithHeader>
          <DataWithHeader title="Status">
            <Pill variant={taskDetails.status} />
          </DataWithHeader>
          <View style={styles.buttonsContainer}>
            <IconButton
              icon="pencil"
              onPress={() => onEdit()}
              size={16}
              variant="primary"
            >
              <ThemedText>Edit</ThemedText>
            </IconButton>
            <IconButton
              icon="close"
              onPress={() => onDelete()}
              size={16}
              variant="danger"
              isLoading={isDeletePending}
            >
              <ThemedText>Delete</ThemedText>
            </IconButton>
          </View>
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    borderRadius: 20,
    gap: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: Dimensions.get('window').width < 800 ? '100%' : '50%',
  },
  titleContainer: {
    flexWrap: 'wrap',
    width: '100%',
    flexDirection: 'row',
    gap: 10,
  },
  sm: {
    flexDirection: Dimensions.get('window').width < 800 ? 'column' : 'row',
    justifyContent: 'space-between',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    gap: 10,
  },
});
