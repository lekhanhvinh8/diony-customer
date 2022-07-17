import {
  Avatar,
  Box,
  Checkbox,
  createTheme,
  CssBaseline,
  FormControlLabel,
  Grid,
  Paper,
  Typography,
  Link,
} from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import { useLocation, useNavigate } from "react-router-dom";
import Joi from "joi";
import { renderInput, validate } from "../../app/layouts/common/formUtil";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { login } from "../../app/services/authService";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../app/store/user";
import { Link as RouteLink } from "react-router-dom";
import DionysLogo from "../../app/layouts/images/DionysLogo10.png";
import loginBackground from "../../app/layouts/images/login.jpg";

const theme = createTheme();

const emailAddressField = "email";
const passwordField = "password";

const schemaMap = {
  [emailAddressField]: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  [passwordField]: Joi.string().required().min(6),
};

const schema = Joi.object().keys(schemaMap);

interface LoginProps {}

export default function Login(props: LoginProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [submitLoadding, setSubmitLoadding] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const getAllData = () => {
    return {
      [emailAddressField]: emailAddress,
      [passwordField]: password,
    };
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { state } = location;

    const errors = validate(getAllData(), schema);
    setErrors(errors || {});

    if (errors) return;

    try {
      setSubmitLoadding(true);
      await login(emailAddress, password);
      setSubmitLoadding(false);

      dispatch(setUser);
      navigate(state ? state.from.pathname : "/");
    } catch (ex: any) {
      if (ex.response && ex.response.status === 400) {
        const newErrors = { [emailAddressField]: "" };
        newErrors[emailAddressField] = ex.response.data;
        console.log(newErrors);
        setErrors(newErrors);
      }

      setSubmitLoadding(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(" + loginBackground + ")",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <RouteLink to="/">
              <Avatar
                sx={{ m: 1, bgcolor: "primary.main", height: 100, width: 100 }}
                src={DionysLogo}
              ></Avatar>
            </RouteLink>

            <Typography component="h1" variant="h5">
              Đăng nhập
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {renderInput(
                emailAddressField,
                "Email",
                emailAddress,
                getAllData(),
                errors,
                setEmailAddress,
                setErrors,
                schemaMap,
                {
                  autoFocus: true,
                }
              )}
              {renderInput(
                passwordField,
                "Mật khẩu",
                password,
                getAllData(),
                errors,
                setPassword,
                setErrors,
                schemaMap,
                {
                  type: "password",
                }
              )}
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={submitLoadding}
                loadingPosition="end"
              >
                Đăng nhập
              </LoadingButton>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Không có tài khoản ? đăng ký ngay"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
