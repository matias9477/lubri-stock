"use client";

import * as React from "react";
import { Autocomplete, Chip, TextField, Box } from "@mui/material";

type Option = {
  label: string;
  value: string;
};

interface MultiSelectComboboxProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export const MultiSelectCombobox = ({
  options,
  value,
  onChange,
  placeholder = "Seleccionar opciones...",
}: MultiSelectComboboxProps) => {
  const selectedOptions = options.filter((option) =>
    value.includes(option.value)
  );

  const handleChange = (_event: React.SyntheticEvent, newValue: Option[]) => {
    onChange(newValue.map((option) => option.value));
  };

  return (
    <Autocomplete
      multiple
      options={options}
      value={selectedOptions}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField {...params} placeholder={placeholder} variant="outlined" />
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            key={option.value}
            label={option.label}
            variant="outlined"
          />
        ))
      }
      renderOption={(props, option) => {
        const { key, ...otherProps } = props;
        return (
          <Box component="li" key={key} {...otherProps}>
            {option.label}
          </Box>
        );
      }}
    />
  );
};
