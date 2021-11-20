import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setAddressDialogOpen } from "../../../app/store/ui/userPage";
import AddressForm from "./addressForm";

export interface AddressDialogProps {}

export default function AddressDialog(props: AddressDialogProps) {
  const dispatch = useAppDispatch();
  const dialogOpen = useAppSelector(
    (state) => state.ui.userPage.address.dialogOpen
  );
  const updatedAddressId = useAppSelector(
    (state) => state.ui.userPage.address.updatedAddressId
  );

  return (
    <Dialog
      open={dialogOpen}
      onClose={() => dispatch(setAddressDialogOpen(false))}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle>
        {updatedAddressId ? "Chỉnh sửa địa chỉ" : "Địa chỉ mới"}
      </DialogTitle>
      <DialogContent>
        <AddressForm />
      </DialogContent>
    </Dialog>
  );
}
