import {
  AppBar,
  Badge,
  Box,
  CssBaseline,
  Grid,
  IconButton,
  Link,
  useScrollTrigger,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import DionysLogo from "../../app/layouts/images/DionysLogo10.png";
import SearchBar from "./searchBar";
import { cloneElement, Fragment } from "react";
import { useAppSelector } from "../../app/hooks";
import AccountArea from "./accountArea";
import { getNumberOfCartItems } from "../../app/store/entities/cart";

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
  const navigate = useNavigate();
  const numberOfCartItems = useAppSelector(getNumberOfCartItems);

  return (
    <Fragment>
      <CssBaseline />
      <ElevationScroll>
        <AppBar position="sticky">
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box sx={{ width: "90%" }}>
              <Box display="flex" width="100%" alignItems="center">
                <Link
                  href="#"
                  sx={{ flexGrow: 1 }}
                  color="inherit"
                  underline="none"
                >
                  K??nh Ng?????i b??n
                </Link>

                <IconButton
                  size="large"
                  aria-label="notifications"
                  color="inherit"
                >
                  {/* <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge> */}
                </IconButton>
                <AccountArea />
              </Box>
              <Box display="flex" width="100%" alignItems="center">
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
                  onClick={() => {
                    navigate("/cart");
                  }}
                >
                  <Badge badgeContent={numberOfCartItems} color="error">
                    <ShoppingCartIcon fontSize="large" />
                  </Badge>
                </IconButton>
              </Box>
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
