import {
  Autocomplete,
  Box,
  Button,
  DialogActions,
  Stack,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import Joi from "joi";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  handleInputChangeFormik,
  validate,
} from "../../../app/layouts/common/formUtil";
import { AddressRequestData } from "../../../app/services/userService";
import { addAddress, updateAddress } from "../../../app/store/entities/address";
import { loadProvinces } from "../../../app/store/ui/userPage";
import {
  selectDistrict,
  selectProvince,
  selectWard,
  setAddressDialogOpen,
} from "../../../app/store/ui/userPage";
const phoneNumberField = "phoneNumber";
const nameField = "name";
const addressDetailField = "addressDetail";

interface FormValues {
  [nameField]: string;
  [phoneNumberField]: string;
  [addressDetailField]: string;
}

const schemaMap = {
  [phoneNumberField]: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.pattern.base": "Số điện thoại không hợp lệ",
      "string.length": "Số điện thoại phải có độ dài bằng 10",
      "string.empty": "Không được bỏ trống",
    }),
  [nameField]: Joi.string().messages({
    "string.empty": "Không được bỏ trống",
  }),
  [addressDetailField]: Joi.string().messages({
    "string.empty": "Không được bỏ trống",
  }),
};

const schema = Joi.object().keys(schemaMap);

export interface AddressFormProps {}

export default function AddressForm(props: AddressFormProps) {
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<{ [key: string]: any }>({});
  const address = useAppSelector((state) => state.entities.address);
  const addressPage = useAppSelector((state) => state.ui.userPage.addressPage);
  const userId = useAppSelector((state) => state.user.userId);
  const openFormForUpdate = useAppSelector(
    (state) => state.ui.userPage.addressPage.openFormForUpdate
  );
  const updatedAddress = useAppSelector(
    (state) => state.ui.userPage.addressPage.updatedAddress
  );

  const provinceOptions = addressPage.provinces.map((province) => ({
    id: province.id,
    label: province.name,
  }));

  const selectedProvince = provinceOptions.find(
    (o) => o.id === addressPage.selectedProvinceId
  );

  const districtOptions = addressPage.districts.map((district) => ({
    id: district.id,
    label: district.name,
  }));
  const selectedDistrict = districtOptions.find(
    (o) => o.id === addressPage.selectedDistrictId
  );

  const wardOptions = addressPage.wards.map((ward) => ({
    id: ward.code,
    label: ward.name,
  }));
  const selectedWard = wardOptions.find(
    (o) => o.id === addressPage.selectedWardCode
  );

  useEffect(() => {
    const asyncFunc = async () => {
      if (openFormForUpdate && updatedAddress) {
      } else {
        await dispatch(loadProvinces);
      }
    };

    asyncFunc();
  }, [dispatch]);

  const initialValues: FormValues =
    openFormForUpdate && updatedAddress
      ? {
          [nameField]: updatedAddress.customerName,
          [phoneNumberField]: updatedAddress.phoneNumber,
          [addressDetailField]: updatedAddress.detail,
        }
      : {
          [nameField]: "",
          [phoneNumberField]: "",
          [addressDetailField]: "",
        };

  const isValidToSubmit = (
    values: FormValues,
    schema: Joi.ObjectSchema<any>
  ) => {
    if (validate(values, schema)) return false;
    if (
      !addressPage.selectedProvinceId ||
      !addressPage.selectedDistrictId ||
      !addressPage.selectedWardCode
    ) {
      return false;
    }

    if (!userId) return false;

    return true;
  };

  return (
    <Box sx={{ marginTop: 1 }}>
      <Formik
        initialValues={initialValues}
        validate={(values) => {}}
        onSubmit={(values, { setSubmitting }) => {}}
      >
        {({ values, handleChange }) => (
          <form>
            <TextField
              name={nameField}
              value={values[nameField]}
              label="Tên"
              margin="dense"
              error={errors[nameField] ? true : false}
              helperText={errors[nameField]}
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleInputChangeFormik(
                  [],
                  values,
                  handleChange,
                  errors,
                  setErrors,
                  schemaMap
                )(e);
              }}
            />
            <TextField
              name={phoneNumberField}
              value={values[phoneNumberField]}
              label="Số điện thoại"
              margin="dense"
              error={errors[phoneNumberField] ? true : false}
              helperText={errors[phoneNumberField]}
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleInputChangeFormik(
                  [],
                  values,
                  handleChange,
                  errors,
                  setErrors,
                  schemaMap
                )(e);
              }}
            />

            <Autocomplete
              sx={{ marginTop: 2 }}
              options={provinceOptions}
              value={selectedProvince ? selectedProvince : null}
              onChange={async (event, newValue) => {
                dispatch(selectProvince(newValue ? newValue.id : null));
              }}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="Tỉnh/Thành phố" />
              )}
            />

            <Autocomplete
              sx={{ marginTop: 2 }}
              options={districtOptions}
              value={selectedDistrict ? selectedDistrict : null}
              onChange={async (e, newValue) => {
                dispatch(selectDistrict(newValue ? newValue.id : null));
              }}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="Quận/Huyện" />
              )}
            />
            <Autocomplete
              sx={{ marginTop: 2 }}
              options={wardOptions}
              value={selectedWard ? selectedWard : null}
              onChange={async (e, newValue) => {
                dispatch(selectWard(newValue ? newValue.id : null));
              }}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="Phường/Xã" />
              )}
            />

            <TextField
              name={addressDetailField}
              value={values[addressDetailField]}
              label="Địa chỉ chi tiết"
              margin="dense"
              error={errors[addressDetailField] ? true : false}
              helperText={errors[addressDetailField]}
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleInputChangeFormik(
                  [],
                  values,
                  handleChange,
                  errors,
                  setErrors,
                  schemaMap
                )(e);
              }}
            />
            <DialogActions>
              <Button onClick={() => dispatch(setAddressDialogOpen(false))}>
                Cancel
              </Button>
              <Button
                disabled={!isValidToSubmit(values, schema)}
                onClick={async () => {
                  const errors = validate(values, schema);
                  setErrors(errors || {});

                  if (errors) return;
                  if (!selectedProvince || !selectedDistrict || !selectedWard)
                    return;

                  if (!userId) return;

                  const newAddress: AddressRequestData = {
                    id: updatedAddress ? updatedAddress.id : 0,
                    provinceId: selectedProvince.id,
                    districtId: selectedDistrict.id,
                    wardCode: Number(selectedWard.id),
                    provinceName: selectedProvince.label,
                    districtName: selectedDistrict.label,
                    wardName: selectedWard.label,
                    detail: values[addressDetailField],
                    isDefault: updatedAddress
                      ? updatedAddress.isDefault
                      : false,
                    isPickup: false,
                    isReturn: false,
                    customerName: values[nameField],
                    phoneNumber: values[phoneNumberField],
                  };

                  if (!openFormForUpdate)
                    await dispatch(addAddress(newAddress, userId));
                  else await dispatch(updateAddress(newAddress));

                  dispatch(setAddressDialogOpen(false));
                }}
              >
                Save
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Box>
  );
}
