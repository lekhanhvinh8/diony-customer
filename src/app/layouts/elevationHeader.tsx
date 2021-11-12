import {
  AppBar,
  Badge,
  Box,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  Link,
  Toolbar,
  Typography,
  useScrollTrigger,
  Stack,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link as RouteLink } from "react-router-dom";
import DionysLogo from "./images/DionysLogo10.png";
import SearchBar from "../../features/header/searchBar";
import { cloneElement, Fragment } from "react";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  logo: {
    maxWidth: 77,
    marginRight: "10px",
    marginBottom: "3px",
    color: "red",
  },
});

interface ScrollProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

export interface HeaderProps {}

export interface ElevationHeaderProps {
  disableElevation: boolean;
}

function ElevationScroll(props: ScrollProps) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

function Header(props: HeaderProps) {
  const classes = useStyles();
  const user = null;
  return (
    <Fragment>
      <CssBaseline />
      <ElevationScroll>
        <AppBar position="sticky">
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box sx={{ width: "94%" }}>
              <Toolbar>
                <Link
                  href="#"
                  sx={{ flexGrow: 1 }}
                  color="inherit"
                  underline="none"
                >
                  Kênh Người bán
                </Link>

                <IconButton
                  size="large"
                  aria-label="notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>

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

                    <RouteLink
                      to={"/user"}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        marginLeft: 5,
                      }}
                    >
                      <Typography color="inherit">vinhvinh07</Typography>
                    </RouteLink>
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
                    <RouteLink
                      to={"/register"}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      <Typography color="inherit">Đăng ký</Typography>
                    </RouteLink>

                    <RouteLink
                      to={"/login"}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      <Typography color="inherit">Đăng nhập</Typography>
                    </RouteLink>
                  </Stack>
                )}
              </Toolbar>
              <Toolbar>
                <Grid container sx={{ flexGrow: 1 }}>
                  <Grid item xs={2}>
                    <RouteLink to="/">
                      <img
                        src={DionysLogo}
                        alt="logo"
                        className={classes.logo}
                      />
                    </RouteLink>
                  </Grid>
                  <Grid item xs={10} style={{ marginTop: 20 }}>
                    <SearchBar />
                  </Grid>
                </Grid>
                <IconButton
                  color="inherit"
                  style={{ marginLeft: 40, marginRight: 4 }}
                >
                  <Badge badgeContent={17} color="error">
                    <ShoppingCartIcon fontSize="large" />
                  </Badge>
                </IconButton>
              </Toolbar>
            </Box>
          </Box>
        </AppBar>
      </ElevationScroll>
    </Fragment>
  );
}

export default function ElevationScrollHeader({
  disableElevation,
}: ElevationHeaderProps) {
  if (!disableElevation) return <Header />;

  return (
    <Box>
      <Header />
    </Box>
  );
}
