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
    syncWithNames: Array<string>,
    allData: FormState["data"],
    errors: FormState["errors"],
    setData: SetStateAction<any>,
    setErrors: SetStateAction<any>,
    schemaMap: FormState["schemaMap"]
  ) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateErrors = { ...errors };
    const { currentTarget } = e;

    const errorMessage = validateProp(
      syncWithNames,
      allData,
      currentTarget,
      schemaMap
    );

    if (errorMessage) updateErrors[currentTarget.name] = errorMessage;
    else delete updateErrors[currentTarget.name];

    const updatedData = currentTarget.value;
    setData(updatedData);
    setErrors(updateErrors);
  };

const validateProp = (
  syncWithNames: Array<string>,
  allData: FormState["data"],
  input: HTMLInputElement,
  schemaMap: FormState["schemaMap"]
) => {
  const datas = { [input.name]: input.value };
  const propSchemaMap = { [input.name]: schemaMap[input.name] };

  for (const name of syncWithNames) {
    datas[name] = allData[name];
    propSchemaMap[name] = schemaMap[name];
  }

  const propSchema = Joi.object().keys(propSchemaMap);

  const result = propSchema.validate(datas);

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
  allData: FormState["errors"],
  errors: FormState["errors"],
  setData: SetStateAction<any>,
  setErrors: SetStateAction<any>,
  schemaMap: FormState["schemaMap"],
  { ...props } = {},
  syncWithNames: Array<string> = [],
  type = "text"
) => {
  return (
    <Input
      name={name}
      label={label}
      value={data}
      type={type}
      errorMessage={errors[name]}
      onInputChange={(e) => {
        handleInputChange(
          syncWithNames,
          allData,
          errors,
          setData,
          setErrors,
          schemaMap
        )(e);
      }}
      {...props}
    />
  );
};
