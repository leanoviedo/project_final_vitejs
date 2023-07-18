import React, { useState } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  Card,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { selectRegistrationData } from "../redux/slices/RegistrationSlices";

const FormLogin = () => {
  const registrationData = useAppSelector(selectRegistrationData);
  console.log(selectRegistrationData);
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalMessage("");
  };
  console.log("estoy aqui");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
    console.log([e.target.name], e.target.value);
  };
  console.log("estoy aqui");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("enviado");
    const existingLogin = registrationData.find(
      (registration) =>
        registration.email === userLogin.email &&
        registration.password === userLogin.password
    );
    if (existingLogin) {
      navigate("/loading-page");
    } else {
      setModalMessage("Credenciales inválidas");
      setOpenModal(true);
    }
    console.log(existingLogin, "enviado");
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ minHeight: "100vh" }}
    >
      <Card sx={{ p: 5, boxShadow: 3 }}>
        <Grid item>
          <Typography component="h1" variant="h5" align="center">
            Iniciar sesión
          </Typography>
        </Grid>

        <Grid item>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: 300,
              m: 2,
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
          </Box>
        </Grid>
        <Grid item>
          <Button type="submit" fullWidth variant="contained">
            Iniciar sesión
          </Button>
        </Grid>
        <Grid item sx={{ mt: 2 }}>
          <Link to="/FormRegistration" style={{ textDecoration: "none" }}>
            <Typography>¿No tienes una cuenta? Regístrate</Typography>
          </Link>
        </Grid>
      </Card>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogContent>
          <Typography>{modalMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default FormLogin;
