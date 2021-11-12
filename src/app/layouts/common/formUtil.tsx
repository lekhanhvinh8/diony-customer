import Input from "./input";
import Joi from "joi";
import { SetStateAction } from "react";

export interface FormState {
  data: {
    [key: string]: any;
  };
  errors: {
    [key: string]: any;
  };
  schemaMap: {
    [key: string]: any;
  };
}

const handleInputChange =
  (
    errors: FormState["errors"],
    setData: SetStateAction<any>,
    setErrors: SetStateAction<any>,
    schemaMap: FormState["schemaMap"]
  ) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateErrors = { ...errors };
    const { currentTarget } = e;

    const errorMessage = validateProp(currentTarget, schemaMap);

    if (errorMessage) updateErrors[currentTarget.name] = errorMessage;
    else delete updateErrors[currentTarget.name];

    const updatedData = currentTarget.value;
    setData(updatedData);
    setErrors(updateErrors);
  };

const validateProp = (
  input: HTMLInputElement,
  schemaMap: FormState["schemaMap"]
) => {
  const obj = { [input.name]: input.value };
  const propSchema = Joi.object().keys({ [input.name]: schemaMap[input.name] });

  const result = propSchema.validate(obj);

  return result.error ? result.error.details[0].message : null;
};

export const validate = (
  allData: FormState["data"],
  schema: Joi.ObjectSchema<any>
) => {
  const options = { abortEarly: false };
  const result = schema.validate(allData, options);

  if (!result.error) return null;

  const errors: FormState["errors"] = {};
  result.error.details.map((error) => {
    errors[error.path[0]] = error.message;
    return null;
  });

  return errors;
};

export const handleSubmit =
  (
    allData: FormState["data"],
    schema: Joi.ObjectSchema<any>,
    setErrors: SetStateAction<any>
  ) =>
  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate(allData, schema);
    setErrors(errors || {});

    if (errors) return;
  };

export const renderInput = (
  name: string,
  label: string,
  data: any,
  errors: FormState["errors"],
  setData: SetStateAction<any>,
  setErrors: SetStateAction<any>,
  schemaMap: FormState["schemaMap"],
  { ...props } = {},
  type = "text"
) => {
  return (
    <Input
      name={name}
      label={label}
      value={data}
      type={type}
      errorMessage={errors[name]}
      onInputChange={handleInputChange(errors, setData, setErrors, schemaMap)}
      {...props}
    />
  );
};
