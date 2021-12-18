import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { Fragment, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  districtSelected,
  loadOnlyDistricts,
  loadOnlyProvinces,
  loadOnlyWards,
  provinceSelected,
  setAddressDialogOpen,
  setOpenFormForUpdate,
  setUpdateAddress,
  wardSelected,
} from "../../../app/store/ui/userPage";
import AddressDialog from "./addressDialog";
import {
  loadAddresses,
  removeAddress,
  setDefaultAddress,
} from "../../../app/store/entities/address";

const firstColumnGridWidth = 2;
const secondColumnGridWidth = 10;

export interface AddressProps {}

export default function Address(props: AddressProps) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.userId);
  const addresses = useAppSelector((state) => state.entities.address.addresses);
  const [addressIdToOpenDeleteAlert, setAddressIdToOpenDeleteAlert] =
    useState<number>(0);
  const [deleteLoadding, setDeleteLoadding] = useState<boolean>(false);

  useEffect(() => {
    dispatch(loadAddresses());
  }, [dispatch, userId]);

  return (
    <Box sx={{ padding: 3 }}>
      <AddressDialog />
      <Stack spacing={2}>
        <Box display="flex">
          <Typography variant="h6">Địa chỉ của tôi</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="contained"
            color="error"
            startIcon={<AddIcon />}
            onClick={async () => {
              await dispatch(setOpenFormForUpdate(false));
              await dispatch(setUpdateAddress(null));

              await dispatch(setAddressDialogOpen(true));
            }}
          >
            Thêm địa chỉ
          </Button>
        </Box>

        {addresses.map((address, index) => (
          <Fragment key={index}>
            <Divider />

            <Box sx={{ padding: 2 }}>
              <Box display="flex">
                <Grid container spacing={2} sx={{ flexGrow: 1 }} rowSpacing={1}>
                  <Grid item xs={firstColumnGridWidth} display="flex">
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Typography>Tên</Typography>
                  </Grid>
                  <Grid item xs={secondColumnGridWidth}>
                    <Box display="flex">
                      <Typography style={{ fontWeight: "bold" }}>
                        {address.customerName}
                      </Typography>
                      {address.isDefault && (
                        <Chip
                          sx={{ marginLeft: 2 }}
                          label="Mặc định"
                          variant="outlined"
                          color="success"
                          size="small"
                        />
                      )}
                    </Box>
                  </Grid>

                  <Grid item xs={firstColumnGridWidth} display="flex">
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Typography>Số điện thoại</Typography>
                  </Grid>
                  <Grid item xs={secondColumnGridWidth}>
                    <Typography style={{ fontWeight: "bold" }}>
                      {address.phoneNumber}
                    </Typography>
                  </Grid>

                  <Grid item xs={firstColumnGridWidth} display="flex">
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Typography>Địa chỉ</Typography>
                  </Grid>
                  <Grid item xs={secondColumnGridWidth}>
                    <Box display="flex">
                      <Typography style={{ fontWeight: "bold" }}>
                        {address.detail}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography style={{ fontWeight: "bold" }}>
                        {address.wardName}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography style={{ fontWeight: "bold" }}>
                        {address.districtName}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography style={{ fontWeight: "bold" }}>
                        {address.provinceName}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Box>
                  <Box display="flex">
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={async () => {
                        await dispatch(setOpenFormForUpdate(true));
                        await dispatch(setUpdateAddress(address));

                        await dispatch(loadOnlyProvinces);
                        await dispatch(loadOnlyDistricts(address.provinceId));
                        await dispatch(loadOnlyWards(address.districtId));

                        await dispatch(provinceSelected(address.provinceId));
                        await dispatch(districtSelected(address.districtId));
                        await dispatch(wardSelected(address.wardCode));

                        await dispatch(setAddressDialogOpen(true));
                      }}
                    >
                      Sửa
                    </Button>
                    <Button
                      sx={{ marginLeft: 1 }}
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => setAddressIdToOpenDeleteAlert(address.id)}
                    >
                      Xóa
                    </Button>
                  </Box>
                  <Box>
                    <Collapse in={address.id === addressIdToOpenDeleteAlert}>
                      <Alert
                        sx={{ mt: 2 }}
                        severity="warning"
                        action={
                          <Box>
                            <IconButton
                              color="warning"
                              size="small"
                              onClick={() => {
                                try {
                                  setDeleteLoadding(true);
                                  dispatch(removeAddress(address.id));
                                  setDeleteLoadding(false);
                                } catch (ex) {
                                  setDeleteLoadding(false);
                                }
                              }}
                            >
                              {deleteLoadding ? (
                                <CircularProgress />
                              ) : (
                                <DeleteIcon fontSize="inherit" />
                              )}
                            </IconButton>

                            <IconButton
                              color="info"
                              size="small"
                              onClick={() => {
                                setAddressIdToOpenDeleteAlert(0);
                              }}
                            >
                              <CloseIcon />
                            </IconButton>
                          </Box>
                        }
                      >
                        Bạn muốn xóa
                      </Alert>
                    </Collapse>
                  </Box>
                  <Button
                    sx={{ marginTop: 2, width: 230 }}
                    variant="contained"
                    color="success"
                    onClick={async () => {
                      await dispatch(setDefaultAddress(address.id));
                    }}
                  >
                    Đặt làm mặc định
                  </Button>
                </Box>
              </Box>
            </Box>
          </Fragment>
        ))}
      </Stack>
    </Box>
  );
}
