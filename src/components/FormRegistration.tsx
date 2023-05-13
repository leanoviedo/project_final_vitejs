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
    <>
      <Container>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "100 vh" }}
        >
          <Grid item>
            <Typography component="h1" variant="h5">
              Registrate
            </Typography>
            <Box component="form">
              <TextField
                margin="normal"
                required
                fullWidth
                id="Nombre2"
                label="Nombre"
                name="Nombre"
                autoComplete="Nombre"
                helperText="ingrese su nombre "
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Apellido"
                label="Apellido"
                id="Apellido"
                autoComplete="Apellido"
                helperText="ingrese su Apellido "
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email1"
                label="correo electronico"
                name="correo electronico"
                autoComplete="email"
                autoFocus
                helperText="ingrese su correo   "
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email2"
                label="repetir correo electronico"
                name="repetir correo electronico"
                autoComplete="email"
                autoFocus
                helperText="repetita su correo  "
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="contraseña"
                label="contraseña"
                type="password"
                id="contraseña"
                autoComplete="current-password"
                helperText="ingrese su contraseña "
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="repetir contraseña"
                label="repetir contraseña"
                type="password"
                id="password2"
                autoComplete="current-password"
                helperText="repita su contraseña "
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Acuerdo de privacidad "
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
              <Link to="/FormLogin">registrate</Link>
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default FormRegistration;
