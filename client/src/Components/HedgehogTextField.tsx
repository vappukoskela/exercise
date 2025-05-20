import { TextField } from "@mui/material";
import React from "react";

interface Props {
  label: string;
  type?: "text" | "number";
  value?: string | number | undefined;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
function HedgehogTextField({ label, type, value, name, onChange }: Props) {
  
    // Allow only positive integers in number field
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      type === "number" &&
      (event.key === "-" ||
        event.key === "+" ||
        event.key === "e" ||
        event.key === "E" ||
        event.key === ".")
    ) {
      event.preventDefault();
    }
  };

  return (
    <TextField
      onKeyDown={handleKeyDown}
      size="small"
      variant="outlined"
      label={label}
      name={name}
      type={type}
      value={value ?? ""}
      onChange={onChange}
    />
  );
}

export default HedgehogTextField;
