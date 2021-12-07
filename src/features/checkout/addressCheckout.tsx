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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  reloadShippingCostsAndExpectedDeliveryTimes,
  reselectAddress,
  selectAddressIdTemporarilly,
} from "./../../app/store/ui/checkout";

export interface AddressCheckoutProps {}

export default function AddressCheckout(props: AddressCheckoutProps) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.userId);
  const selectedAddressId = useAppSelector(
    (state) => state.ui.checkoutPage.selectedAddressId
  );
  const tempSelectedAddressId = useAppSelector(
    (state) => state.ui.checkoutPage.tempSelectedAddressId
  );

  const userAddresses = useAppSelector(
    (state) => state.entities.address.addresses
  );
  const [addressSelectionCollapse, setAddressSelectionCollapse] =
    useState(false);

  useEffect(() => {
    const asyncFunc = async () => {
      if (userId) dispatch(loadAddresses());
    };
    asyncFunc();
  }, [dispatch, userId]);

  const selectedAddress = userAddresses.find((a) => a.id === selectedAddressId);

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <LocationOnIcon sx={{ color: "red" }} />
        <Typography color="red" sx={{ fontWeight: "bold" }} fontSize={20}>
          Địa Chỉ Nhận Hàng
        </Typography>
      </Stack>
      <Box sx={{ mt: 2 }}>
        {selectedAddress ? (
          <Box>
            <Grid container>
              <Grid item xs={2}>
                <Box>
                  <Typography fontWeight="bold" fontSize={17}>
                    {selectedAddress.customerName}
                  </Typography>
                  <Typography fontWeight="bold" fontSize={17}>
                    {selectedAddress.phoneNumber}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={10}>
                <Box
                  display="flex"
                  justifyContent="right"
                  alignItems="center"
                  sx={{ height: "100%" }}
                >
                  <Typography fontSize={17}>
                    {selectedAddress.detail +
                      ", " +
                      selectedAddress.wardName +
                      ", " +
                      selectedAddress.districtName +
                      ", " +
                      selectedAddress.provinceName}
                  </Typography>

                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{ height: "100%" }}
                  >
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
                </Box>
              </Grid>
            </Grid>

            <Box>
              <Collapse in={addressSelectionCollapse}>
                <Divider sx={{ mt: 3 }} />
                <Box sx={{ mt: 3 }}>
                  <RadioGroup
                    value={tempSelectedAddressId?.toString()}
                    onChange={(e) => {
                      dispatch(
                        selectAddressIdTemporarilly(Number(e.target.value))
                      );
                    }}
                  >
                    {userAddresses.map((address, index) => {
                      return (
                        <FormControlLabel
                          key={index}
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
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      if (selectedAddressId)
                        dispatch(
                          selectAddressIdTemporarilly(selectedAddressId)
                        );
                      setAddressSelectionCollapse(false);
                    }}
                  >
                    Hủy
                  </Button>
                  <Button
                    sx={{ ml: 2 }}
                    variant="outlined"
                    color="success"
                    onClick={async () => {
                      await dispatch(reselectAddress());
                      setAddressSelectionCollapse(false);
                      await dispatch(
                        reloadShippingCostsAndExpectedDeliveryTimes(
                          tempSelectedAddressId
                        )
                      );
                    }}
                  >
                    Xác nhận
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
