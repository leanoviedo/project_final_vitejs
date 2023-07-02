import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import UsersService from "../services/UserServices";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { Link } from "react-router-dom";
import { addRegistrationData } from "../redux/slices/RegistrationSlices";

const FormRegistration = () => {
  const { users } = useAppSelector((state) => state.user);
  const Navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    first: "",
    last: "",
    phone: "",
    password: "",
  });
  const [avatarSrc, setAvatarSrc] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(UsersService());
  }, [dispatch]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userData.email || !userData.password) {
      setModalMessage("Por favor, complete todos los campos");
      setOpenModal(true);
      return;
    }

    const existingStore = users.find((user) => user.email === userData.email);

 

    if (existingStore) {

      setUserData((prevUserData) => ({
        ...prevUserData,
        first: existingStore.name.first,
        last: existingStore.name.last,
        phone: existingStore.phone,
      }));
      if (existingStore.picture) {
        setAvatarSrc(existingStore.picture.large);
      
   
      } else {
        const updatedpassword = {
          ...existingStore,
          password: userData.password,
        };
        dispatch(addRegistrationData(updatedpassword));
        setModalMessage("Registro exitoso");
        setOpenModal(true);
      }
      setTimeout(function () {
        Navigate("/FormLogin");
      }, 2000);
    } else {
      setModalMessage(
        "No se encontró un usuario registrado con ese correo electrónico"
      );
      setOpenModal(true);
    }
  };

  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ minHeight: "100vh" }}
      >
        <Card sx={{ p: 3, boxShadow: 3 }}>
          <Grid item>
            <Typography variant="h5" align="center" sx={{ mb: 3 }}>
              Regístrate
            </Typography>
          </Grid>
          <Avatar
            alt=""
            src={avatarSrc}
            sx={{ width: "100px", height: "100px", ml: 16 }}
          />
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
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoFocus
                value={userData.email}
                onChange={handleChange}
                helperText="Ingrese un correo electrónico válido"
                error={!userData.email}
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
              <Button type="submit" fullWidth variant="contained">
                Regístrate
              </Button>
              <Link
                to="/FormLogin"
                style={{ color: "white", textDecoration: "none" }}
              >
                Iniciar sesión
              </Link>
            </Box>
            <Dialog open={openModal} onClose={handleCloseModal}>
              <DialogContent>
                <Typography>{modalMessage}</Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal}>Cerrar</Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Card>
      </Grid>
    </Container>
  );
};

export default FormRegistration;
