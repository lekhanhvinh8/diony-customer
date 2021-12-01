import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../../app/hooks";

export interface ProfileProps {}

export default function Profile(props: ProfileProps) {
  const profilePage = useAppSelector((state) => state.ui.userPage.profilePage);

  const leftColumnFormGrid = 3;
  const rightColumnFormGrid = 9;
  return (
    <Box sx={{ padding: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h6">Quản lý hồ sơ</Typography>
        <Divider />

        <Grid container>
          <Grid item xs={7}>
            <Box sx={{ padding: 2 }}>
              <Grid container spacing={2} rowSpacing={4}>
                <Grid item xs={leftColumnFormGrid} display="flex">
                  <Box sx={{ flexGrow: 1 }}></Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{ height: "100%" }}
                  >
                    Tên
                  </Box>
                </Grid>
                <Grid item xs={rightColumnFormGrid}>
                  <TextField size="small" fullWidth value={profilePage.name} />
                </Grid>

                <Grid item xs={leftColumnFormGrid} display="flex">
                  <Box sx={{ flexGrow: 1 }}></Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{ height: "100%" }}
                  >
                    Tên Shop
                  </Box>
                </Grid>
                <Grid item xs={rightColumnFormGrid}>
                  <TextField
                    size="small"
                    fullWidth
                    value={profilePage.shopName}
                  />
                </Grid>

                <Grid item xs={leftColumnFormGrid} display="flex">
                  <Box sx={{ flexGrow: 1 }}></Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{ height: "100%" }}
                  >
                    Giới Tính
                  </Box>
                </Grid>
                <Grid item xs={rightColumnFormGrid}>
                  <RadioGroup
                    row
                    defaultValue={profilePage.isMale}
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="Nữ"
                    />
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Nam"
                    />
                  </RadioGroup>
                </Grid>

                <Grid item xs={leftColumnFormGrid} display="flex">
                  <Box sx={{ flexGrow: 1 }}></Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{ height: "100%" }}
                  >
                    Email
                  </Box>
                </Grid>
                <Grid item xs={rightColumnFormGrid}>
                  {profilePage.email ? profilePage.email : "Chưa có email"}
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ marginLeft: 2 }}
                  >
                    Cập nhật
                  </Button>
                </Grid>

                <Grid item xs={leftColumnFormGrid} display="flex">
                  <Box sx={{ flexGrow: 1 }}></Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{ height: "100%" }}
                  >
                    Số điện thoại
                  </Box>
                </Grid>
                <Grid item xs={rightColumnFormGrid}>
                  {profilePage.phoneNumber
                    ? profilePage.phoneNumber
                    : "Chưa có số điện thoại"}
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ marginLeft: 2 }}
                  >
                    Cập nhật
                  </Button>
                </Grid>

                <Grid item xs={leftColumnFormGrid}></Grid>
                <Grid item xs={rightColumnFormGrid}>
                  <Button variant="contained" size="large" color="error">
                    Lưu
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Divider orientation="vertical" />
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ marginTop: 2 }}>
              <Box display="flex" justifyContent="center">
                <Avatar
                  src="https://www.facebook.com/photo/?fbid=1522184281343741&set=a.1522184298010406"
                  sx={{ width: 107, height: 107 }}
                />
              </Box>
              <Box sx={{ marginTop: 1 }} display="flex" justifyContent="center">
                <label htmlFor="contained-button-file">
                  <input
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const files = e.target.files;

                      if (files && files.length > 0) {
                        const file = files[0];

                        //upload avatar
                        //change url in store
                      }
                    }}
                  />
                  <Button variant="contained" component="span">
                    Upload
                  </Button>
                </label>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
