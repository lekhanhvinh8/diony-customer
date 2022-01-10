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
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { cancelOrder } from "../../app/services/orderService";
import { setCancelledDialogOpen } from "../../app/store/ui/orderDetailPage";
import { reloadOrders } from "../../app/store/ui/purchasePage";
import { cancelledReasons } from "../../config.json";
import { useNavigate } from "react-router-dom";

export interface CancelledDialogProps {}

export default function CancelledDialog(props: CancelledDialogProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dialogOpen = useAppSelector(
    (state) => state.ui.orderDetailPage.cancelledDialogOpen
  );
  const order = useAppSelector((state) => state.ui.orderDetailPage.orderDetail);

  const [selectedReasonIndex, selectReasonIndex] = useState("0");

  return (
    <Box>
      <Dialog
        open={dialogOpen}
        onClose={() => dispatch(setCancelledDialogOpen(false))}
      >
        <DialogTitle>Bạn muốn hủy đơn hàng ?</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Vui lòng chọn lý do hủy</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="controlled-radio-buttons-group"
              value={selectedReasonIndex}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                selectReasonIndex((event.target as HTMLInputElement).value);
              }}
            >
              {cancelledReasons.map((element, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    value={index}
                    label={element.reason}
                    control={<Radio />}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(setCancelledDialogOpen(false))}>
            Trở về
          </Button>
          <Button
            onClick={async () => {
              if (order) {
                try {
                  await cancelOrder(
                    order.id,
                    cancelledReasons[Number.parseInt(selectedReasonIndex)]
                      .reason
                  );

                  dispatch(setCancelledDialogOpen(false));
                  navigate("/user/purchase");
                  toast.success("Hủy đơn hàng thành công");
                } catch (ex) {
                  dispatch(setCancelledDialogOpen(false));
                  toast.error("Hủy đơn hàng thất bại");
                }
              }
            }}
            autoFocus
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
