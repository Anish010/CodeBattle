import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Input = ({
  label,
  type,
  style,
  inputLabelProps,
  error,
  required,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      label={label}
      type={showPassword ? "text" : type}
      fullWidth
      variant="outlined"
      style={style}
      InputLabelProps={{ ...inputLabelProps, required: required }}
      error={Boolean(error)}
      helperText={
        error ||
        (required && (
          <span >This field is required.</span>
        ))
      }
      required={required}
      {...rest}
      InputProps={{
        //'endAdornment' property specifies content to be added at the end of the input field.
        endAdornment: type === "password" && (
          //'InputAdornment' component from the Material-UI library represents an adornment element to be placed inside or at the end of the input.
          <InputAdornment position="end">
            <IconButton
              onClick={togglePasswordVisibility}
              onMouseDown={(e) => e.preventDefault()}
              edge="end">
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Input;
