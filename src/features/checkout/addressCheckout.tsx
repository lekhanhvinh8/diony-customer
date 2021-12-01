import {
  Box,
  Grid,
  Stack,
  Typography,
  IconButton,
  Collapse,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import address, {
  getDefaultAddress,
  loadAddresses,
} from "../../app/store/entities/address";
import { useEffect, useState } from "react";
import { Address } from "../../app/models/address/address";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { initializeCheckoutPage } from "./../../app/store/ui/checkout";

export interface AddressCheckoutProps {}

export default function AddressCheckout(props: AddressCheckoutProps) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.userId);
  const defaultAddress: Address | null = useAppSelector(getDefaultAddress);
  const userAddresses = useAppSelector(
    (state) => state.entities.address.addresses
  );
  const [addressSelectionCollapse, setAddressSelectionCollapse] =
    useState(false);

  useEffect(() => {
    const asyncFunc = async () => {
      dispatch(loadAddresses(userId));
    };
    asyncFunc();
  }, [dispatch, userId]);

  useEffect(() => {
    const asyncFunc = async () => {
      dispatch(initializeCheckoutPage);
    };

    asyncFunc();
  }, [dispatch, userAddresses]);

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <LocationOnIcon sx={{ color: "red" }} />
        <Typography color="red" sx={{ fontWeight: "bold" }} fontSize={20}>
          Địa Chỉ Nhận Hàng
        </Typography>
      </Stack>
      <Box sx={{ mt: 2 }}>
        {defaultAddress ? (
          <Box>
            <Grid container>
              <Grid item xs={2}>
                <Box>
                  <Typography fontWeight="bold" fontSize={17}>
                    {defaultAddress.customerName}
                  </Typography>
                  <Typography fontWeight="bold" fontSize={17}>
                    {defaultAddress.phoneNumber}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={9}>
                <Box
                  display="flex"
                  justifyContent="right"
                  alignItems="center"
                  sx={{ height: "100%" }}
                >
                  <Typography fontSize={17}>
                    {defaultAddress.detail +
                      ", " +
                      defaultAddress.wardName +
                      ", " +
                      defaultAddress.districtName +
                      ", " +
                      defaultAddress.provinceName}
                  </Typography>
                </Box>
              </Grid>
              <Grid xs={1}>
                <Box display="flex" alignItems="center" sx={{ height: "100%" }}>
                  <IconButton
                    onClick={() => {
                      setAddressSelectionCollapse(!addressSelectionCollapse);
                    }}
                  >
                    {!addressSelectionCollapse ? (
                      <KeyboardArrowDownIcon />
                    ) : (
                      <KeyboardArrowUpIcon />
                    )}
                  </IconButton>
                </Box>
              </Grid>
            </Grid>

            <Box>
              <Collapse in={addressSelectionCollapse}>
                <Divider sx={{ mt: 3 }} />
                <Box sx={{ mt: 3 }}>
                  <RadioGroup
                    value={userAddresses[0].id.toString()}
                    onChange={(e) => {
                      //setPaymentMethod(Number(e.target.value));
                    }}
                  >
                    {userAddresses.map((address) => {
                      return (
                        <FormControlLabel
                          value={address.id.toString()}
                          control={<Radio />}
                          label={
                            <Box display="flex" alignItems="center">
                              <Typography>
                                {address.detail +
                                  ", " +
                                  address.wardName +
                                  ", " +
                                  address.districtName +
                                  ", " +
                                  address.provinceName}
                              </Typography>
                            </Box>
                          }
                        />
                      );
                    })}
                  </RadioGroup>
                </Box>
                <Box sx={{ mt: 3 }} display="flex">
                  <Button variant="outlined" color="error">
                    Huy
                  </Button>
                  <Button sx={{ ml: 2 }} variant="outlined" color="success">
                    Xac Nhan
                  </Button>
                </Box>
              </Collapse>
            </Box>
          </Box>
        ) : (
          <Box>Khong co dia chi mac dinh</Box>
        )}
      </Box>
    </Box>
  );
}
