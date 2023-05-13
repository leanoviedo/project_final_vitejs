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
      >
        <Grid>
          <Typography component="h1" variant="h5">
            iniciar sesión
          </Typography>
          <Box component="form">
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="correo electronico"
              name="correo electronico"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="contraseña"
              label="contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Box>
        </Grid>
        <Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            iniciar sesión
          </Button>
        </Grid>
        <Grid>
          <Link to="#">has ovidado tu contraseña?</Link>
          <Grid>
            <Link to="/FormRegistration">
              {"No tienes una cuenta? registrate "}
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default FormLogin;
