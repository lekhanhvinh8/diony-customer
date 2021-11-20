import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface SidebarProps {}

export default function Sidebar(props: SidebarProps) {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const listItems = [
    {
      label: "Hồ sơ",
      icon: <StarBorder />,
      linkTo: "/user/account/profile",
    },
    {
      label: "Địa chỉ",
      icon: <StarBorder />,
      linkTo: "/user/account/address",
    },
    {
      label: "Đơn mua",
      icon: <StarBorder />,
      linkTo: "/user/purchase",
    },
  ];

  return (
    <Box sx={{ marginTop: 2, height: "100%" }}>
      <List
        sx={{ width: "100%", maxWidth: 360 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {listItems.map((item, index) => (
          <ListItemButton
            key={index}
            selected={selectedIndex === index}
            onClick={() => {
              setSelectedIndex(index);
              navigate(item.linkTo);
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
