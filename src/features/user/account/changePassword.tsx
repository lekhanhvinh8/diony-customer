import Joi from "joi";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  DialogActions,
  Button,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { renderInput, validate } from "../../../app/layouts/common/formUtil";
import { toast } from "react-toastify";
import { openChangePasswordDialogOpen } from "../../../app/store/ui/userPage";
import { changePassword } from "../../../app/services/userService";

const oldPasswordField = "oldPassword";
const passwordField = "password";
const confirmPasswordField = "confirmPassword";

const schemaMap = {
  [oldPasswordField]: Joi.string().empty().min(6).messages({
    "string.min": "Mật khẩu cần có ít nhất 6 ký tự",
    "string.empty": "Không được bỏ trống",
  }),

  [passwordField]: Joi.string().empty().min(6).messages({
    "string.min": "Mật khẩu cần có ít nhất 6 ký tự",
    "string.empty": "Không được bỏ trống",
  }),

  [confirmPasswordField]: Joi.any()
    .equal(Joi.ref(passwordField))
    .label("Confirm password")
    .messages({
      "any.only": "Mật khẩu xác nhận không trùng khớp",
    }),
};

const schema = Joi.object().keys(schemaMap);

export interface ChangePasswordProps {}

export default function ChangePassword(props: ChangePasswordProps) {
  const dispatch = useAppDispatch();
  const dialogOpen = useAppSelector(
    (state) => state.ui.userPage.profilePage.changePasswordDialogOpen
  );
  const [data, setData] = useState<{ [key: string]: any }>({
    [oldPasswordField]: "",
    [passwordField]: "",
    [confirmPasswordField]: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: any }>({});

  const getPieceData = (field: string) => {
    return data[field];
  };
  const getSetPieceData = (field: string) => {
    return (pieceData: any) => setData({ ...data, [field]: pieceData });
  };

  const renderFormInput = (
    field: string,
    label: string,
    options?: any,
    synsWithNames: Array<string> = []
  ) => {
    return renderInput(
      field,
      label,
      getPieceData(field),
      data,
      errors,
      getSetPieceData(field),
      setErrors,
      schemaMap,
      options,
      synsWithNames
    );
  };

  const handleSubmit = async () => {
    const errors = validate(data, schema);
    setErrors(errors || {});

    if (errors) return;

    //comunicating with server
    try {
      await changePassword(data[oldPasswordField], data[passwordField]);
      dispatch(openChangePasswordDialogOpen(false));
      toast.success("Cập nhật mật khẩu thành công");
    } catch (ex: any) {
      if (ex.response && ex.response.status === 400) {
        const newErrors: { [key: string]: any } = {
          [oldPasswordField]: ex.response.data,
        };

        setErrors(newErrors);
      }
    }
  };

  return (
    <Dialog
      open={dialogOpen}
      onClose={() => dispatch(openChangePasswordDialogOpen(false))}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle>{"Cập nhật mật khẩu"}</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          {renderFormInput(oldPasswordField, "Old Password *", {
            type: "password",
          })}
          {renderFormInput(passwordField, "Password *", {
            type: "password",
          })}
          {renderFormInput(
            confirmPasswordField,
            "Confirm Password *",
            {
              type: "password",
            },
            [passwordField]
          )}

          <DialogActions>
            <Button
              onClick={() => dispatch(openChangePasswordDialogOpen(false))}
            >
              Cancel
            </Button>
            <Button
              disabled={validate(data, schema) ? true : false}
              onClick={async () => {
                await handleSubmit();
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
