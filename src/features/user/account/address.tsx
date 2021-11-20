import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Fragment, useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { loadProvinces } from "../../../app/store/entities/address";
import { setAddressDialogOpen } from "../../../app/store/ui/userPage";
import AddressDialog from "./addressDialog";

const firstColumnGridWidth = 2;
const secondColumnGridWidth = 10;

export interface AddressProps {}

export default function Address(props: AddressProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadProvinces);
  }, [dispatch]);

  const array = [...Array(4)];

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
            onClick={() => {
              dispatch(setAddressDialogOpen(true));
            }}
          >
            Thêm địa chỉ
          </Button>
        </Box>

        {array.map((e) => (
          <Fragment>
            <Divider />

            <Box sx={{ padding: 2 }}>
              <Box display="flex">
                <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                  <Grid item xs={firstColumnGridWidth} display="flex">
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Typography>Địa chỉ</Typography>
                  </Grid>
                  <Grid item xs={secondColumnGridWidth}>
                    <Box display="flex">
                      <Typography variant="button">
                        Ab Bank, Dân Chủ, Phường Bình Thọ
                      </Typography>
                      <Chip
                        sx={{ marginLeft: 2 }}
                        label="Mặc định"
                        variant="outlined"
                        color="success"
                        size="small"
                      />
                    </Box>
                    <Box>
                      <Typography variant="button">Phường Bình Thọ</Typography>
                    </Box>
                    <Box>
                      <Typography variant="button">
                        Thành Phố Thủ Đức
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="button">TP. Hồ Chí Minh</Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Box>
                  <Button variant="outlined" color="primary" size="small">
                    Sửa
                  </Button>
                  <Button
                    sx={{ marginLeft: 1 }}
                    variant="outlined"
                    color="error"
                    size="small"
                  >
                    Xóa
                  </Button>
                  <Button
                    sx={{ marginTop: 2 }}
                    variant="contained"
                    color="success"
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
