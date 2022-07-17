import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setVoucherDialog } from "../../app/store/ui/checkout";
import VoucherTicket from "./voucherTicket";

export interface IVoucherDialogProps {}

export default function VoucherDialog(props: IVoucherDialogProps) {
  const dispatch = useAppDispatch();
  const vouchers = useAppSelector((state) => state.ui.checkoutPage.vouchers);
  const voucherDialogOpen = useAppSelector(
    (state) => state.ui.checkoutPage.voucherDialogOpen
  );

  return (
    <Box>
      <Dialog
        open={voucherDialogOpen}
        onClose={() => {
          dispatch(setVoucherDialog(false));
        }}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            minHeight: "20vw",
            maxHeight: "40vw",
          },
        }}
      >
        <DialogTitle>Chọn voucher</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            {vouchers.map((voucher) => (
              <VoucherTicket key={voucher.id} voucher={voucher} />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch(setVoucherDialog(false));
            }}
          >
            Trở về
          </Button>
          <Button onClick={async () => {}} autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
