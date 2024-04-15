import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  Card,
  Box,
  AppBar,
  Toolbar,
  Snackbar,
  Alert,
  Dialog,
  List,
  Divider,
  Paper,
  CardContent,
  ListItem,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectRegistrationData } from "../redux/slices/RegistrationSlices";
import AirplanemodeActiveOutlinedIcon from "@mui/icons-material/AirplanemodeActiveOutlined";
import { useFormik } from "formik";
import * as yup from "yup";
import { UserData } from "../model/interface";
import CloseIcon from "@mui/icons-material/Close";

const FormLogin = () => {
  const registrationData = useAppSelector(selectRegistrationData);
  const navigate = useNavigate();
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState("");
  const [isRegisteredUsersDialogOpen, setRegisteredUsersDialogOpen] =
    useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
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
  const toggleRegisteredUsersDialog = () => {
    setRegisteredUsersDialogOpen(!isRegisteredUsersDialogOpen);
  };
  const handleUserSelection = (user: UserData) => {
    setSelectedUser(user);
    formik.setValues(
      {
        email: user.email,
        password: user.login.password,
      },
      false
    );
    setRegisteredUsersDialogOpen(false);
  };

  useEffect(() => {
    if (selectedUser) {
      formik.setValues({
        email: selectedUser.email,
        password: selectedUser.login.password,
      });
    }
  }, [selectedUser]);

  const listRegisteredUsers = (
    <Card>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 360,
          margin: "auto",
          padding: "auto",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Usuarios registrados
        </Typography>
        <List sx={{ width: "100%" }}>
          {registrationData.map((user, index) => (
            <React.Fragment key={index}>
              <ListItem
                onClick={() => handleUserSelection(user)}
                style={{
                  cursor: "pointer",
                  transition: "background-color 0.5s",
                  backgroundColor:
                    selectedUser === user ? "rgb(25,118,210)" : "transparent",
                  padding: 8,
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <Typography>{`Email: ${user.email}`}</Typography>
                  <Typography>{`Contraseña: ${user.login.password}`}</Typography>
                </div>
              </ListItem>
              <Divider variant="fullWidth" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Card>
  );

  return (
    <Grid container justifyContent="center" alignItems="center">
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" sx={{ mr: 2 }} component={Link} to="/">
            <AirplanemodeActiveOutlinedIcon sx={{ fontSize: 40 }} />
          </Button>
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
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
              width: 300,
              mt: 2,
            }}
          >
            <TextField
              fullWidth
              id="email"
              label="Correo Electrónico"
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              autoComplete="email"
              sx={{
                mb: 1,
              }}
            />
            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              {...formik.getFieldProps("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              autoComplete="current-password"
              sx={{
                mb: 1,
              }}
            />
            <Button fullWidth variant="contained" type="submit">
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
            <Button
              onClick={toggleRegisteredUsersDialog}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Usuarios Registrados
            </Button>
            <Dialog
              open={isRegisteredUsersDialogOpen}
              onClose={toggleRegisteredUsersDialog}
            >
              <IconButton
                sx={{ position: "absolute", top: 5, right: 5, color: "red" }}
                onClick={toggleRegisteredUsersDialog}
              >
                <CloseIcon />
              </IconButton>
              {listRegisteredUsers}
            </Dialog>
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
