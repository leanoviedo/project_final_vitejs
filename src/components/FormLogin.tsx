import { useState } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  Card,
  Box,
  AppBar,
  IconButton,
  Toolbar,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectRegistrationData } from "../redux/slices/RegistrationSlices";
import AirplanemodeActiveOutlinedIcon from "@mui/icons-material/AirplanemodeActiveOutlined";
import { useFormik } from "formik";
import * as yup from "yup";

const FormLogin = () => {
  const registrationData = useAppSelector(selectRegistrationData);
  const navigate = useNavigate();
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState("");

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Ingresa un correo electrónico válido")
      .required("Correo electrónico es obligatorio"),
    password: yup.string().required("Contraseña es obligatoria"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const existingLogin = registrationData.find(
        (registration) =>
          registration.email === values.email &&
          registration.login.password === values.password
      );
      if (existingLogin) {
        localStorage.setItem("userData", JSON.stringify(existingLogin));
        navigate("/LandingPage");
      } else {
        if (
          !registrationData.some(
            (registration) => registration.email === values.email
          )
        ) {
          setErrorSnackbarMessage(
            "Email incorrecto. Por favor, verifica tu email."
          );
        }
        if (
          !registrationData.some(
            (registration) => registration.login.password === values.password
          )
        ) {
          setErrorSnackbarMessage(
            "Contraseña incorrecta. Por favor, verifica tu contraseña"
          );
        }
        setErrorSnackbarOpen(true);
      }
    },
  });

  return (
    <Grid container justifyContent="center" alignItems="center">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            href="/"
          >
            <AirplanemodeActiveOutlinedIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Airport Missing Things (MYT)
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid item marginTop={5}>
        <Card sx={{ p: 5, boxShadow: 3 }}>
          <Typography component="h1" variant="h5" align="center">
            Iniciar sesión
          </Typography>
          <Grid />
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
              width: 300,
            }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Correo Electrónico"
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              label="Contraseña"
              type="password"
              {...formik.getFieldProps("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              autoComplete="current-password"
            />
            <Button type="submit" fullWidth variant="contained">
              Iniciar sesión
            </Button>
            <Link
              to="/FormRegistration"
              style={{ textDecoration: "none", color: "blue" }}
            >
              <Typography mt={2} ml={5}>
                ¿No tienes una cuenta? Regístrate
              </Typography>
            </Link>
          </Box>
        </Card>
        <Snackbar
          open={errorSnackbarOpen}
          autoHideDuration={6000}
          onClose={() => setErrorSnackbarOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => setErrorSnackbarOpen(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorSnackbarMessage}
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
};

export default FormLogin;
