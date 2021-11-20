import {
  Avatar,
  Box,
  Button,
  Checkbox,
  createTheme,
  CssBaseline,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
  Link,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Joi from "joi";
import { renderInput, validate } from "../../app/layouts/common/formUtil";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { register, UserRegister } from "../../app/services/authService";

const queryString = require("query-string");

const theme = createTheme();

const emailAddressField = "email";
const passwordField = "password";
const confirmPasswordField = "confirmPassword";
const phoneNumberField = "phoneNumberField";
const nameField = "nameField";

const schemaMap = {
  [emailAddressField]: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  [passwordField]: Joi.string().required().min(6),
  [confirmPasswordField]: Joi.any()
    .equal(Joi.ref(passwordField))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
  [phoneNumberField]: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  [nameField]: Joi.string().required(),
};

const schema = Joi.object().keys(schemaMap);

export interface SignUpProps {}
export interface SignUpSearch {
  next?: string;
}

export default function SignUp(props: SignUpProps) {
  const [emailAddress, setEmailAdress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});

  const [backdropOpen, setBackdropOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validate(getAllData(), schema);
    setErrors(errors || {});

    if (errors) return;

    //comunicating with server
    try {
      setBackdropOpen(true);
      const userForm = getAllData();
      const user: UserRegister = {
        email: userForm[emailAddressField],
        password: userForm[passwordField],
        name: userForm.nameField,
        phoneNumber: userForm[phoneNumberField],
      };
      await register(user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }

    // const parsed: SignUpSearch = queryString.parse(location.search);
    // if (parsed.next) {
    //   if (parsed.next.includes("http://")) {
    //     window.location.href = parsed.next;
    //   }

    //   navigate(parsed.next);
    // }

    // navigate("/");
  };

  const getAllData = () => {
    return {
      [emailAddressField]: emailAddress,
      [passwordField]: password,
      [confirmPasswordField]: confirmPassword,
      [phoneNumberField]: phoneNumber,
      [nameField]: name,
    };
  };

  return (
    <ThemeProvider theme={theme}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        {loading ? (
          <CircularProgress color="inherit" />
        ) : (
          <Typography>
            Vui lòng xác nhận đường link trong email của bạn để đăng ký thành
            công
          </Typography>
        )}
      </Backdrop>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
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
              my: 3,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {renderInput(
                emailAddressField,
                "Email *",
                emailAddress,
                getAllData(),
                errors,
                setEmailAdress,
                setErrors,
                schemaMap
              )}
              {renderInput(
                passwordField,
                "Password *",
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
              {renderInput(
                confirmPasswordField,
                "Confirm Password *",
                confirmPassword,
                getAllData(),
                errors,
                setConfirmPassword,
                setErrors,
                schemaMap,
                {
                  type: "password",
                },
                [passwordField]
              )}
              {renderInput(
                phoneNumberField,
                "Phone Number *",
                phoneNumber,
                getAllData(),
                errors,
                setPhoneNumber,
                setErrors,
                schemaMap
              )}
              {renderInput(
                nameField,
                "Full Name *",
                name,
                getAllData(),
                errors,
                setName,
                setErrors,
                schemaMap
              )}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/login" variant="body2">
                    Have an account ? Login
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Forgot password"}
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