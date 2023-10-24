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
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectRegistrationData } from "../redux/slices/RegistrationSlices";
import { setUserLogin } from "../redux/slices/UserLogin";
import AirplanemodeActiveOutlinedIcon from "@mui/icons-material/AirplanemodeActiveOutlined";

const FormLogin = () => {
  const registrationData = useAppSelector(selectRegistrationData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [userLogin, setUsersLogin] = useState({
    email: "",
    password: "",
  });

  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsersLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const existingLogin = registrationData.find(
      (registration) =>
        registration.email === userLogin.email &&
        registration.login.password === userLogin.password
    );
    if (existingLogin) {
      dispatch(setUserLogin(existingLogin));
      navigate("/LandingPage");
    } else {
      if (
        !registrationData.some(
          (registration) => registration.email === userLogin.email
        )
      ) {
        setErrorSnackbarMessage(
          "Email incorrecto. Por favor, verifica tu email."
        );
      }
      if (
        !registrationData.some(
          (registration) => registration.login.password === userLogin.password
        )
      ) {
        setErrorSnackbarMessage("El correo electrónico es incorrecto.");
      }
      setErrorSnackbarOpen(true);
    }
  };

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
            onSubmit={handleSubmit}
            sx={{
              width: 300,
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              value={userLogin.email}
              onChange={handleInputChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={userLogin.password}
              label="Contraseña"
              type="password"
              id="password"
              onChange={handleInputChange}
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