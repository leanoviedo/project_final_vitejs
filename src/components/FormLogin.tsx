import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";

const FormLogin = () => {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Typography component="h1" variant="h5" align="center">
            Iniciar sesión
          </Typography>
        </Grid>
        <Grid item>
          <Box component="form" sx={{ width: 300 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Box>
        </Grid>
        <Grid item>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Iniciar sesión
          </Button>
        </Grid>
        <Grid item>
          <Link to="#">¿Has olvidado tu contraseña?</Link>
        </Grid>
        <Grid item>
          <Link to="/FormRegistration">¿No tienes una cuenta? Regístrate</Link>
        </Grid>
      </Grid>
    </>
  );
};

export default FormLogin;
