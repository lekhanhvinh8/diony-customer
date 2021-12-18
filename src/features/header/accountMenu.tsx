import { Logout } from "@mui/icons-material";
import {  Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { SetStateAction } from "react";
import { Link } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { logout } from "../../app/services/authService";

export interface AccountMenuProps {
  anchorEl: null | HTMLElement;
  setAnchorEl: SetStateAction<any>;
}

export default function AccountMenu({
  anchorEl,
  setAnchorEl,
}: AccountMenuProps) {
  const open = Boolean(anchorEl);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={() => setAnchorEl(null)}
      onClick={() => setAnchorEl(null)}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem>
        <ListItemIcon>
          <PersonOutlineIcon />
        </ListItemIcon>
        <Link
          to="/user/account/profile"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          Tài khoản
        </Link>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <ArticleIcon />
        </ListItemIcon>
        <Link
          to="/user/purchase"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          Đơn mua
        </Link>
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          logout();
          window.location.href = "/";
        }}
      >
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Đăng xuất
      </MenuItem>
    </Menu>
  );
}
