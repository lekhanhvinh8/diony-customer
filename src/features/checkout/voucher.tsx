import { Box, Button, Chip, Typography } from "@mui/material";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import VoucherDialog from "./voucherDialog";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setVoucherDialog } from "../../app/store/ui/checkout";

export interface IVoucherProps {}

export default function Voucher(props: IVoucherProps) {
  const dispatch = useAppDispatch();
  const vouchers = useAppSelector((state) => state.ui.checkoutPage.vouchers);
  const selectedVoucherId = useAppSelector(
    (state) => state.ui.checkoutPage.selectedVoucher
  );

  const voucher = vouchers.find((v) => v.id === selectedVoucherId);

  return (
    <Box>
      <VoucherDialog />
      <Box sx={{ mt: 2, padding: 4, bgcolor: "#ffffff" }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <LocalActivityOutlinedIcon color="error" />
            <Typography sx={{ ml: 1 }}>Dionys Voucher</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {voucher && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography>Đã chọn: Giảm </Typography>
                <Chip
                  sx={{ ml: 1 }}
                  label={voucher.discountRate.toString() + "%"}
                  color="success"
                />
              </Box>
            )}
            <Button
              style={{ textTransform: "none", marginLeft: 10 }}
              onClick={(e) => {
                dispatch(setVoucherDialog(true));
              }}
            >
              Chọn Voucher
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
