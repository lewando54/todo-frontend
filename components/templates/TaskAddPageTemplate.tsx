import React from 'react';

import { Dimensions, StyleSheet } from 'react-native';

import IconButton from '../atoms/IconButton';
import TextFormInput from '../atoms/TextFormInput';
import { ThemedText } from '../atoms/ThemedText';
import { ThemedView } from '../atoms/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export interface ITaskAddPageTemplateProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export default function TaskAddPageTemplate({
  onSubmit,
}: ITaskAddPageTemplateProps) {
  const boxBg = useThemeColor({}, 'boxBg');

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
        <IconButton
          icon="add"
          size={16}
          onPress={() => onSubmit()}
          variant="success"
          style={styles.submitButton}
        >
          <ThemedText>Add</ThemedText>
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
