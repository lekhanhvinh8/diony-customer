import { Box, Checkbox, Grid, Typography } from "@mui/material";
import { Fragment, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { checkAll, isAllChecked, isAllDisabled } from "../../app/store/ui/cart";
import ElevationScrollHeader from "../header/elevationHeader";
import CartGroup from "./cartGroup";
import OrderArea from "./orderArea";
import { darkBackgroundColor } from "../../app/layouts/layoutConfig.json";
import Footer from "../footer/footer";

export interface CartProps {}

export default function Cart(props: CartProps) {
  const dispatch = useAppDispatch();
  const cartGroups = useAppSelector((state) => state.entities.cartGroups);
  const allChecked = useAppSelector(isAllChecked);
  const allDisabled = useAppSelector(isAllDisabled);

  useEffect(() => {
    const asyncFunc = async () => {};

    asyncFunc();
  }, [dispatch]);

  return (
    <Box>
      <ElevationScrollHeader disableElevation />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ bgcolor: darkBackgroundColor }}
      >
        <Box sx={{ width: "90%" }}>
          <Typography variant="h5" sx={{ marginTop: 2, fontWeight: "bold" }}>
            Giỏ hàng
          </Typography>
          <Grid container sx={{ marginTop: 2 }}>
            <Grid
              item
              xs={5}
              sx={{ padding: 1, paddingLeft: 2, bgcolor: "#ffffff" }}
            >
              <Box sx={{ height: "100%" }} display="flex" alignItems="center">
                <Checkbox
                  disabled={allDisabled}
                  checked={allChecked}
                  onChange={(e) => {
                    dispatch(checkAll(e.target.checked));
                  }}
                />
                Tất cả
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{ padding: 1, paddingLeft: 2, bgcolor: "#ffffff" }}
            >
              <Box sx={{ height: "100%" }} display="flex" alignItems="center">
                Phân loại hàng
              </Box>
            </Grid>
            <Grid
              item
              xs={1}
              sx={{ padding: 1, paddingLeft: 2, bgcolor: "#ffffff" }}
            >
              <Box sx={{ height: "100%" }} display="flex" alignItems="center">
                Đơn giá
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{ padding: 1, paddingLeft: 2, bgcolor: "#ffffff" }}
              display="flex"
              justifyContent="center"
            >
              <Box sx={{ height: "100%" }} display="flex" alignItems="center">
                Số lượng
              </Box>
            </Grid>
            <Grid item xs={1} sx={{ bgcolor: "#ffffff" }}>
              <Box sx={{ height: "100%" }} display="flex" alignItems="center">
                Thành tiền
              </Box>
            </Grid>
            <Grid
              item
              xs={1}
              sx={{ padding: 1, paddingLeft: 2, bgcolor: "#ffffff" }}
            >
              <Box sx={{ height: "100%" }} display="flex" alignItems="center">
                Thao tác
              </Box>
            </Grid>

            {cartGroups.map((cartGroup, index) => (
              <Fragment key={index}>
                <CartGroup key={index} cartGroupIndex={index} />

                <Grid
                  item
                  xs={12}
                  height={10}
                  sx={{
                    bgcolor: "#ffffff",
                  }}
                ></Grid>
              </Fragment>
            ))}

            <OrderArea />
          </Grid>
        </Box>
      </Box>

      <Box>
        <Box sx={{ bgcolor: darkBackgroundColor, height: 20 }}></Box>
        <Box sx={{ mt: 1 }}>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}
