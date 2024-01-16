import React, { useState } from "react";
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
  CardContent,
  ListItem,
  List,
  Divider,
  ListItemText,
  Paper,
  Dialog,
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
  const [state, setState] = useState({ bottom: false });

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

  const toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };

  const list = (_anchor: string) => (
    <Card>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 360,
          margin: "auto",
          padding: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Usuarios registrados
        </Typography>
        <List sx={{ width: "100%" }}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="jose.ruiz@example.com"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Contraseña:
                  </Typography>
                  {" asdasd"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="fullWidth" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText
              primary=" willie.fleming@example.com"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Contraseña:
                  </Typography>
                  {" asdasd"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="fullWidth" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText
              primary="aishwarya.sullad@example.com"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Contraseña:
                  </Typography>
                  {" asdasd"}
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </Paper>
    </Card>
  );

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
            <Button onClick={formik.submitForm} fullWidth variant="contained">
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
        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {(["bottom"] as const).map((anchor) => (
              <React.Fragment key={anchor}>
                <Button
                  onClick={toggleDrawer(anchor, true)}
                  variant="contained"
                  sx={{ textAlign: "center" }}
                >
                  Usuarios Registrados
                </Button>
                <Dialog
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  {list(anchor)}
                </Dialog>
              </React.Fragment>
            ))}
          </div>
        </CardContent>
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
