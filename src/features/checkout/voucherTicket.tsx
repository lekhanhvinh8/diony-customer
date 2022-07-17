import { Chip, Radio, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Discount } from "../../app/models/discount";
import { getTotalCost } from "../../app/store/entities/cart";
import { selectVoucher } from "../../app/store/ui/checkout";

export interface IVoucherTicketProps {
  voucher: Discount;
}

export default function VoucherTicket({ voucher }: IVoucherTicketProps) {
  const dispatch = useAppDispatch();
  const selectedVoucherId = useAppSelector(
    (state) => state.ui.checkoutPage.selectedVoucher
  );

  const totalOrderCost = useAppSelector(getTotalCost);
  console.log(totalOrderCost);

  let maxReduction = "";
  if (voucher.maxDiscount > 1000) {
    maxReduction = Math.round(voucher.maxDiscount / 1000).toString() + "k";
  }

  let minOrderValue = "";
  if (voucher.minOrderCost > 1000) {
    minOrderValue = Math.round(voucher.minOrderCost / 1000).toString() + "k";
  }

  let expiredDate = new Date(voucher.toDate);
  let expiredDateStr =
    expiredDate.getDate().toString() +
    "/" +
    expiredDate.getMonth().toString() +
    "/" +
    expiredDate.getFullYear();

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", height: "10vw" }}>
        <div
          style={{
            width: "10vw",
            backgroundColor:
              voucher.minOrderCost <= totalOrderCost ? "#2ab7ca" : "#cccccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: 10,
          }}
        >
          <Typography
            textAlign={"center"}
            color="whitesmoke"
            fontWeight={"bold"}
            fontSize={20}
          >
            Miễn phí giao hàng
          </Typography>
          <div>
            <Typography fontSize={40} fontWeight="bold" color={"whitesmoke"}>
              {voucher.discountRate.toString() + "%"}
            </Typography>
          </div>
        </div>
        <div
          style={{
            flexGrow: 1,
            backgroundColor: "#F5F5F5",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ padding: "15px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Chip label={"Tối đa " + maxReduction} color="success" />
              <Typography sx={{ ml: 1 }}>Mã miễn phí vận chuyển</Typography>
            </div>
            <div style={{ marginTop: 7 }}>
              <Chip
                label={"Đơn tối thiểu " + minOrderValue}
                color="error"
                variant="outlined"
              />
            </div>
            <div style={{ marginTop: 5 }}>
              <Typography>
                {"Hạn sử dụng đến " + expiredDateStr + "."}
              </Typography>
            </div>
          </div>
          <div style={{ padding: "10px" }}>
            <Radio
              checked={voucher.id === selectedVoucherId}
              disabled={voucher.minOrderCost > totalOrderCost}
              onChange={(e) => {
                dispatch(selectVoucher(voucher.id));
              }}
              value="a"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
