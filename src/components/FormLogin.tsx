import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import { Card } from "@mui/material";

const FormLogin = () => {
  return (
    <>
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
            <Box component="form" sx={{ width: 300, m: 2 }}>
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
          <Grid item sx={{ mt: 2 }}>
            <Link to="#" style={{ textDecoration: "none" }}>
              <Typography>¿Has olvidado tu contraseña?</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/FormRegistration" style={{ textDecoration: "none" }}>
              <Typography> ¿No tienes una cuenta? Regístrate</Typography>
            </Link>
          </Grid>
        </Card>
      </Grid>
    </>
  );
};

export default FormLogin;
