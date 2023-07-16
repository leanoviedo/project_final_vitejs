import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addUser } from "../redux/slices/RegistrationSlices";
import UserServices from "../services/UserServices";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const FormRegistration = () => {
  const { users } = useAppSelector((state) => state.user);
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
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    dispatch(UserServices());
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

    const existingUser = users.find((user) => user.email === value);

    if (existingUser) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        first: existingUser.name.first,
        last: existingUser.name.last,
        phone: existingUser.phone,
        password: prevUserData.password,
      }));

      if (existingUser.picture) {
        setAvatarSrc(existingUser.picture.large);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const existingUser = users.find((user) => user.email === userData.email);

    if (existingUser) {
      const updatedPassword = {
        ...existingUser,
        password: userData.password,
      };

      dispatch(addUser(updatedPassword));

      setModalMessage("Registro exitoso");
      setTimeout(function () {
        navigate("/FormLogin");
      }, 4000);
    } else {
      setModalMessage("No es un cliente previo");
    }

    setOpenModal(true);
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
                onChange={handleEmailChange}
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
                onChange={handleEmailChange}
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
                onChange={handleEmailChange}
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
