import { TextField } from "@mui/material";

interface Props {
  name: string;
  label: string;
  errorMessage: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

const Input: React.FC<Props> = ({
  name,
  label,
  errorMessage,
  onInputChange,
  ...rest
}) => {
  return (
    <TextField
      {...rest}
      margin="dense"
      id={name}
      name={name}
      label={label}
      fullWidth
      variant="standard"
      error={errorMessage ? true : false}
      helperText={errorMessage}
      onChange={onInputChange}
    />
  );
};

export default Input;
