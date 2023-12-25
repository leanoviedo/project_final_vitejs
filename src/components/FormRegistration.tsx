import { useState, useEffect } from "react";
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
import { ArrowCircleRight as ArrowCircleRightIcon } from "@mui/icons-material";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("ingresa un email valido")
    .required("Email es requerido"),
  first: yup.string().required("Campo requerido"),
  last: yup.string().required("Campo requerido"),
  phone: yup.string().required("Campo requerido"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener una cantidad minima de 6 caracteres.")
    .max(12, "La contraseña debe tener una cantidad máxima de 12 caracteres.")
    .required("contraseña requerida"),
});
const FormRegistration = () => {
  const { usersAvailable } = useAppSelector((state) => state.usersList);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [avatarSrc, setAvatarSrc] = useState("");
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  useEffect(() => {
    dispatch(UserServices());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      email: "",
      first: "",
      last: "",
      phone: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const existingUser = usersAvailable.find(
        (user) => user.email === values.email
      );

      if (existingUser) {
        const updatedUser = {
          ...existingUser,
          login: {
            ...existingUser.login,
            password: values.password,
          },
        };

        if (existingUser.picture) {
          setAvatarSrc(existingUser.picture.large);
        }

        dispatch(addUser(updatedUser));
        setTimeout(function () {
          navigate("/FormLogin");
        }, 1000);
        setSuccessSnackbarOpen(true);
      } else {
        setErrorSnackbarOpen(true);
      }
    },
  });

  const { values, errors, touched, handleChange, handleBlur } = formik;

  const handleEmailChange = (e: { target: { value: any } }) => {
    const { value } = e.target;
    const existingUser = usersAvailable.find((user) => user.email === value);

    if (existingUser) {
      formik.setValues({
        ...formik.values,
        email: value,
        first: existingUser.name.first || "",
        last: existingUser.name.last || "",
        phone: existingUser.phone || "",
      });

      if (existingUser.picture) {
        setAvatarSrc(existingUser.picture.large);
      }
    } else {
      setErrorSnackbarOpen(true);
      formik.setValues({
        ...formik.values,
        email: value,
        first: "",
        last: "",
        phone: "",
      });
      setAvatarSrc(""); // Reset the avatar if no user is found
    }

    formik.validateForm();
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
            onSubmit={formik.handleSubmit}
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
              value={values.email}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ mb: 2 }}
              required
              onChange={handleEmailChange}
            />
            <TextField
              fullWidth
              id="first"
              label="Nombre"
              name="first"
              value={values.first}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.first && Boolean(errors.first)}
              helperText={touched.first && errors.first}
              required
              sx={{ mb: 2 }}
              autoComplete="on"
            />
            <TextField
              fullWidth
              id="last"
              label="Apellido"
              name="last"
              value={values.last}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.last && Boolean(errors.last)}
              helperText={touched.last && errors.last}
              required
              sx={{ mb: 2 }}
              autoComplete="on"
            />
            <TextField
              fullWidth
              id="phone"
              label="Número de Contacto"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phone && Boolean(errors.phone)}
              helperText={touched.phone && errors.phone}
              required
              sx={{ mb: 2 }}
              autoComplete="on"
            />
            <TextField
              fullWidth
              id="password"
              label="Contraseña"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              required
              sx={{ mb: 2 }}
              autoComplete="on"
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
            <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
              <Typography mt={2} ml={10}>
                Ir a inicio de Sesión
              </Typography>
            </Link>
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
    </Grid>
  );
};

export default FormRegistration;
