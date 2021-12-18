import AccountCircle from "@mui/icons-material/AccountCircle";
import { Divider, IconButton, Stack, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import AccountMenu from "./accountMenu";

const queryString = require("query-string");

export interface AccountAreaProps {}

export default function AccountArea(props: AccountAreaProps) {
  const user = useAppSelector((state) => state.user.decodeUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

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
            <AccountCircle />
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
