import React from 'react';

import { Picker } from '@react-native-picker/picker';
import { Controller, useFormContext } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';
import { Option } from '@/constants/Types';
import { useThemeColor } from '@/hooks/useThemeColor';

export interface SelectFormInputProps {
  options: Option[];
  name: string;
  title?: string;
  placeholder?: string;
  required?: boolean;
}

export default function SelectFormInput({
  options,
  name,
  title,
  placeholder,
  required,
}: SelectFormInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const textColor = useThemeColor({}, 'text');
  const textInputBg = useThemeColor({}, 'background');
  const dangerColor = useThemeColor({}, 'dangerBg');

  return (
    <View style={styles.container}>
      {title && (
        <ThemedText>
          {title}
          {required && <Text style={{ color: dangerColor }}> *</Text>}
        </ThemedText>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Picker
            style={[
              styles.textInput,
              {
                borderColor: Colors.misc.gray,
                color: textColor,
                backgroundColor: textInputBg,
              },
            ]}
            onValueChange={onChange}
            selectedValue={value}
          >
            {options.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        )}
      />
      {errors[name] && (
        <ThemedText style={[styles.errorText, { color: dangerColor }]}>
          {errors[name]?.message?.toString()}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  textInput: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  errorText: {
    fontSize: 14,
    marginTop: -5,
  },
});
