import { Divider, IconButton, Stack, Typography, Avatar } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { reloadProfilePage } from "../../app/store/ui/userPage";
import AccountMenu from "./accountMenu";

const queryString = require("query-string");

export interface AccountAreaProps {}

export default function AccountArea(props: AccountAreaProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.decodeUser);
  const userId = useAppSelector((state) => state.user.userId);
  const profilePage = useAppSelector((state) => state.ui.userPage.profilePage);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await dispatch(reloadProfilePage);
    };

    asyncFunc();
  }, [dispatch, userId]);

  return (
    <Fragment>
      {user ? (
        <Fragment>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
          >
            <Avatar
              src={
                profilePage.avatarUrl && !profilePage.avatarUploading
                  ? profilePage.avatarUrl
                  : ""
              }
            ></Avatar>
          </IconButton>

          <Link
            to={"/user"}
            style={{
              textDecoration: "none",
              color: "inherit",
              marginLeft: 5,
            }}
            onClick={handleClick}
          >
            <Typography color="inherit">{user.email}</Typography>
          </Link>
          <AccountMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </Fragment>
      ) : (
        <Stack
          direction="row"
          spacing={1}
          divider={
            <Divider
              orientation="vertical"
              flexItem
              variant="fullWidth"
              color="inherit"
            />
          }
          sx={{
            marginLeft: 1,
          }}
        >
          <Link
            to={
              "/signup?" +
              queryString.stringify({
                next: "http://localhost:3000/login",
              })
            }
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Typography color="inherit">Đăng ký</Typography>
          </Link>

          <Link
            to={"/login"}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Typography color="inherit">Đăng nhập</Typography>
          </Link>
        </Stack>
      )}
    </Fragment>
  );
}
