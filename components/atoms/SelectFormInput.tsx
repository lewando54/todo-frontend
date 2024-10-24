import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { Controller, useFormContext } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Colors } from '@/constants/Colors';
import { Option } from '@/constants/Types';
import { useThemeColor } from '@/hooks/useThemeColor';
import { capitalize } from '@/utils/utils';

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
  const selectedColor = useThemeColor({}, 'tint');

  const dropdownStyles = {
    borderColor: Colors.misc.gray,
    backgroundColor: textInputBg,
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
        render={({ field: { onChange, value } }) => (
          <SelectDropdown
            data={options}
            dropdownStyle={dropdownStyles}
            onSelect={(selectedItem) => {
              onChange(selectedItem.value);
            }}
            renderItem={(item) => (
              <ThemedView
                style={[
                  styles.dropdownItem,
                  {
                    backgroundColor:
                      value === item?.value ? selectedColor : textInputBg,
                  },
                ]}
              >
                <ThemedText>{item?.label}</ThemedText>
              </ThemedView>
            )}
            renderButton={(selectedItem, isOpened) => (
              <ThemedView
                style={[
                  styles.dropdownButton,
                  {
                    backgroundColor: textInputBg,
                    borderColor: Colors.misc.gray,
                  },
                ]}
              >
                <ThemedText>{capitalize(value) || placeholder}</ThemedText>
                <Ionicons
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color={textColor}
                />
              </ThemedView>
            )}
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
  errorText: {
    fontSize: 14,
    marginTop: -5,
  },
  dropdownButton: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    fontSize: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownItem: {
    padding: 10,
  },
});
