import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import { Box, Container } from "@mui/material";
import { Link } from "react-router-dom";

const FormRegistration = () => {
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
        <Grid item>
          <Typography variant="h5" align="center">
            Regístrate
          </Typography>
        </Grid>
        <Grid item>
          <Box
            component="form"
            sx={{
              width: 300,
              "& .MuiTextField-root": { marginBottom: "16px" },
            }}
          >
            <TextField
              fullWidth
              id="nombre"
              label="Nombre"
              name="nombre"
              autoComplete="nombre"
              autoFocus
            />
            <TextField
              fullWidth
              name="apellido"
              label="Apellido"
              id="apellido"
              autoComplete="apellido"
            />
            <TextField
              fullWidth
              id="email1"
              label="Correo electrónico"
              name="correo electronico"
              autoComplete="email"
            />
            <TextField
              fullWidth
              id="email2"
              label="Repetir correo electrónico"
              name="repetir correo electronico"
              autoComplete="email"
            />
            <TextField
              fullWidth
              name="contraseña"
              label="Contraseña"
              type="password"
              id="contraseña"
              autoComplete="current-password"
            />
            <TextField
              fullWidth
              name="repetir contraseña"
              label="Repetir contraseña"
              type="password"
              id="password2"
              autoComplete="current-password"
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Acuerdo de privacidad"
            />
          </Box>
        </Grid>
        <Grid item>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            <Link
              to="/FormLogin"
              style={{ color: "white", textDecoration: "none" }}
            >
              Regístrate
            </Link>
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FormRegistration;
