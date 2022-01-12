import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../app/hooks";
import { updateUserProfile } from "../../../app/services/userService";
import { useAppDispatch } from "./../../../app/hooks";
import {
  setName,
  setShopName,
  setIsMale,
  reloadProfilePage,
  updateUserAvatar,
  openChangePasswordDialogOpen,
} from "./../../../app/store/ui/userPage";
import ChangePassword from "./changePassword";

export interface ProfileProps {}

export default function Profile(props: ProfileProps) {
  const dispatch = useAppDispatch();
  const profilePage = useAppSelector((state) => state.ui.userPage.profilePage);
  const userId = useAppSelector((state) => state.user.userId);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    const asyncFunc = async () => {
      await dispatch(reloadProfilePage);
    };

    asyncFunc();
  }, [dispatch, userId]);

  const leftColumnFormGrid = 3;
  const rightColumnFormGrid = 9;

  const isSaveButtonDisabled = () => {
    if (!userId || profilePage.name === "" || profilePage.shopName === "")
      return true;

    return false;
  };

  return (
    <Box sx={{ padding: 3 }}>
      <ChangePassword />
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
                  <TextField
                    size="small"
                    fullWidth
                    value={profilePage.name || ""}
                    onChange={(e) => {
                      dispatch(setName(e.currentTarget.value));
                    }}
                  />
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
                    value={profilePage.shopName || ""}
                    onChange={(e) => {
                      dispatch(setShopName(e.currentTarget.value));
                    }}
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
                    value={profilePage.isMale}
                    name="radio-buttons-group"
                    onChange={(e) => {
                      dispatch(setIsMale(e.target.value === "true"));
                    }}
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
                  {/* <Button
                    variant="outlined"
                    size="small"
                    sx={{ marginLeft: 2 }}
                  >
                    Cập nhật
                  </Button> */}
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
                  {/* <Button
                    variant="outlined"
                    size="small"
                    sx={{ marginLeft: 2 }}
                  >
                    Cập nhật
                  </Button> */}
                </Grid>

                <Grid item xs={leftColumnFormGrid} display="flex">
                  <Box sx={{ flexGrow: 1 }}></Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{ height: "100%" }}
                  >
                    Mật khẩu
                  </Box>
                </Grid>
                <Grid item xs={rightColumnFormGrid}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      dispatch(openChangePasswordDialogOpen(true));
                    }}
                  >
                    Đổi mật khẩu
                  </Button>
                </Grid>

                <Grid item xs={leftColumnFormGrid}></Grid>
                <Grid item xs={rightColumnFormGrid}>
                  <LoadingButton
                    variant="contained"
                    size="large"
                    color="error"
                    disabled={isSaveButtonDisabled()}
                    loading={saveLoading}
                    onClick={async () => {
                      try {
                        const { name, shopName, isMale, phoneNumber } =
                          profilePage;
                        if (userId) {
                          setSaveLoading(true);
                          await updateUserProfile(
                            name,
                            shopName,
                            isMale,
                            phoneNumber
                          );
                          setSaveLoading(false);

                          toast.success("Lưu thành công");
                        }
                      } catch (ex) {
                        setSaveLoading(false);
                        toast.error("Lưu thất bại");
                      }
                    }}
                  >
                    Lưu
                  </LoadingButton>
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
                  src={
                    profilePage.avatarUrl && !profilePage.avatarUploading
                      ? profilePage.avatarUrl
                      : ""
                  }
                  sx={{ width: 107, height: 107 }}
                >
                  {profilePage.avatarUploading && <CircularProgress />}
                </Avatar>
              </Box>
              <Box sx={{ marginTop: 1 }} display="flex" justifyContent="center">
                <label htmlFor="contained-button-file">
                  <input
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    style={{ display: "none" }}
                    onChange={async (e) => {
                      const files = e.target.files;

                      if (files && files.length > 0) {
                        const file = files[0];

                        if (userId) {
                          await dispatch(updateUserAvatar(userId, file));
                        }
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
