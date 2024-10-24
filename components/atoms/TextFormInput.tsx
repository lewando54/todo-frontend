import React from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { ThemedText } from './ThemedText';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

export interface TextFormInputProps {
  name: string;
  title?: string;
  placeholder?: string;
  required?: boolean;
}

export default function TextFormInput({
  name,
  title,
  placeholder,
  required,
}: TextFormInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const textColor = useThemeColor({}, 'text');
  const textInputBg = useThemeColor({}, 'background');
  const dangerColor = useThemeColor({}, 'dangerBg');

  const [hasFocus, setHasFocus] = React.useState(false);

  const onFocus = () => {
    setHasFocus(true);
  };

  const handleOnBlur = () => {
    setHasFocus(false);
  };

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
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.textInput,
              {
                borderColor: Colors.misc.gray,
                color: textColor,
                backgroundColor: textInputBg,
              },
              hasFocus && { borderColor: Colors.dark.tint },
            ]}
            placeholderTextColor={Colors.misc.gray}
            onChangeText={onChange}
            onBlur={() => {
              handleOnBlur();
              onBlur();
            }}
            onFocus={onFocus}
            value={value}
            placeholder={placeholder}
          />
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
