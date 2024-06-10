import { View, Text } from "react-native";
import React from "react";
import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@gluestack-ui/themed";
import { CheckIcon } from "lucide-react";

const CheckboxInput = ({
  value,
  field,
  options = [],
  singleSelect,
  onChangeValue,
}) => {
  return (
    <CheckboxGroup
      value={value}
      onChange={(value) => {
        if (singleSelect) {
          onChangeValue([value[value?.length - 1]]);
        } else {
          onChangeValue(value);
        }
      }}
      flexDirection="row"
      flexWrap="wrap"
      gap={4}
    >
      {options.map((item) => {
        return (
          <Checkbox size="md" value={item.value} key={item.value}>
            <CheckboxIndicator mr="$2">
              <CheckboxIcon as={CheckIcon} aria-label="check-icon" />
            </CheckboxIndicator>
            <CheckboxLabel>{item.label}</CheckboxLabel>
          </Checkbox>
        );
      })}
    </CheckboxGroup>
  );
};

export default CheckboxInput;
