import React from 'react';

import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';

import IconButton from '../atoms/IconButton';
import SelectFormInput from '../atoms/SelectFormInput';
import TextFormInput from '../atoms/TextFormInput';
import { ThemedText } from '../atoms/ThemedText';
import { ThemedView } from '../atoms/ThemedView';
import { Option } from '@/constants/Types';
import { useThemeColor } from '@/hooks/useThemeColor';

export interface ITaskEditPageTemplateProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  taskStatusOptions: Option[];
  isLoading: boolean;
}

export default function TaskEditPageTemplate({
  onSubmit,
  taskStatusOptions,
  isLoading,
}: ITaskEditPageTemplateProps) {
  const boxBg = useThemeColor({}, 'boxBg');
  const activityColor = useThemeColor({}, 'text');

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedView lightColor={boxBg} darkColor={boxBg} style={styles.box}>
          <ActivityIndicator size="large" color={activityColor} />
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView lightColor={boxBg} darkColor={boxBg} style={styles.box}>
        <TextFormInput
          name="title"
          title="Title"
          placeholder="Title"
          required
        />
        <TextFormInput
          name="description"
          title="Description"
          placeholder="Description"
          required
        />
        <SelectFormInput
          name="status"
          title="Status"
          options={taskStatusOptions}
          required
        />
        <IconButton
          icon="pencil"
          size={16}
          onPress={() => onSubmit()}
          variant="success"
          style={styles.submitButton}
        >
          <ThemedText>Edit</ThemedText>
        </IconButton>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 10,
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    padding: 20,
    gap: 15,
    borderRadius: 10,
    width: Dimensions.get('window').width < 800 ? '100%' : '50%',
  },
  submitButton: {
    alignSelf: 'flex-end',
  },
});
