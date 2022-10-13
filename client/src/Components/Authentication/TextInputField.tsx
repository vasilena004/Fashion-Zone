import React from "react";
import { TextField } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface InputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues, any>;
  label: string;
  error?: string | undefined;
  size?: string;
  type?: string;
  multiline?: boolean;
  disabled?:boolean
}

function TextInputField<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  size,
  type = "text",
  multiline = false,
  error = undefined,
  disabled=false
}: InputProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          label={label}
          defaultValue=""
          size="small"
          disabled={disabled}
          type={type}
          style = {{color:"rgb(79, 55, 83)",width:(size)?size:"300px"}}
          multiline={multiline}
          margin="dense"
          error={!!error}
          helperText={error || ""}
          {...field}
        />
      )}
    />
  );
}
export default TextInputField;
