import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addUser } from "../redux/slices/RegistrationSlices";
import UserServices from "../services/UserServices";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import {
  ArrowCircleRight as ArrowCircleRightIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";

const FormRegistration = () => {
  const { usersAvailable } = useAppSelector((state) => state.usersList);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [userData, setUserData] = useState({
    email: "",
    first: "",
    last: "",
    phone: "",
    password: "",
  });

  const [avatarSrc, setAvatarSrc] = useState("");
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  useEffect(() => {
    dispatch(UserServices());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setUserData((prevUserData) => ({
      ...prevUserData,
      email: value,
      first: "",
      last: "",
      phone: "",
      password: "",
    }));

    setAvatarSrc("");

    if (value) {
      const existingUser = usersAvailable.find(
        (user: { email: string }) => user.email === value
      );

      if (existingUser) {
        setUserData((prevUserData) => ({
          ...prevUserData,
          first: existingUser.name.first,
          last: existingUser.name.last,
          phone: existingUser.phone,
        }));

        if (existingUser.picture) {
          setAvatarSrc(existingUser.picture.large);
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const existingUser = usersAvailable.find(
      (user: { email: string }) => user.email === userData.email
    );

    if (existingUser) {
      const updatedUser = {
        ...existingUser,
        login: {
          ...existingUser.login,
          password: userData.password,
        },
      };

      dispatch(addUser(updatedUser));

      setTimeout(function () {
        navigate("/FormLogin");
      }, 1000);
      setSuccessSnackbarOpen(true);
    } else {
      setErrorSnackbarOpen(true);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      spacing={2}
      style={{ minHeight: "100%" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card sx={{ p: 3, mt: 2, boxShadow: 3 }}>
          <Typography variant="h5" align="center" mb={3}>
            Regístrate
          </Typography>
          <Avatar
            alt=""
            src={avatarSrc}
            sx={{ width: 100, height: 100, ml: "auto", mr: "auto", mb: 2 }}
          />
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: 300,
              m: "auto",
            }}
          >
            <TextField
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoFocus
              value={userData.email}
              onChange={handleEmailChange}
              helperText="Ingrese un correo electrónico válido"
              error={false}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              fullWidth
              id="first"
              label="Nombre"
              value={userData.first}
              name="first"
              onChange={handleChange}
              helperText="Ingrese su nombre"
              error={false}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              name="last"
              label="Apellido"
              id="last"
              value={userData.last}
              onChange={handleChange}
              helperText="Ingrese su apellido"
              error={false}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              id="phone"
              label="Número de Contacto"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              helperText="Ingrese un número de teléfono válido"
              error={false}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              value={userData.password}
              onChange={handleChange}
              helperText="Ingrese una contraseña"
              error={false}
              sx={{ mb: 2 }}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<ArrowCircleRightIcon />}
              sx={{ mt: 2 }}
            >
              Regístrate
            </Button>
          </Box>
          <Snackbar
            open={successSnackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSuccessSnackbarOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={() => setSuccessSnackbarOpen(false)}
              severity="success"
              sx={{ width: "100%" }}
            >
              ¡Usuario registrado con éxito!
            </Alert>
          </Snackbar>
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
              Error: Sus datos no figuran en ningún Aeropuerto.
            </Alert>
          </Snackbar>
        </Card>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sm={4}
        style={{ position: "absolute", bottom: "5px", left: "16px" }}
      >
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon fontSize="large" />}
        >
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Atrás
          </Link>
        </Button>
      </Grid>
    </Grid>
  );
};

export default FormRegistration;
