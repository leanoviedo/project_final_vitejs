import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import { Box, Card, Container } from "@mui/material";
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
        <Card sx={{ p: 5, boxShadow: 3 }}>
          <Grid item>
            <Typography variant="h5" align="center" sx={{ mb: 3 }}>
              Regístrate
            </Typography>
          </Grid>
          <Grid item>
            <Box
              component="form"
              sx={{
                width: 300,
                m: 2,
              }}
            >
              <TextField
                fullWidth
                id="nombre"
                label="Nombre"
                name="nombre"
                autoComplete="nombre"
                autoFocus
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                name="apellido"
                label="Apellido"
                id="apellido"
                autoComplete="apellido"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                id="email1"
                label="Correo electrónico"
                name="correo electronico"
                autoComplete="email"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                id="email2"
                label="Repetir correo electrónico"
                name="repetir correo electronico"
                autoComplete="email"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                name="contraseña"
                label="Contraseña"
                type="password"
                id="contraseña"
                autoComplete="current-password"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                name="repetir contraseña"
                label="Repetir contraseña"
                type="password"
                id="password2"
                autoComplete="current-password"
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Acuerdo de privacidad"
                sx={{ mb: 2 }}
              />
            </Box>
          </Grid>
          <Grid item>
            <Button type="submit" fullWidth variant="contained">
              <Link
                to="/FormLogin"
                style={{ color: "white", textDecoration: "none" }}
              >
                Regístrate
              </Link>
            </Button>
          </Grid>
        </Card>
      </Grid>
    </Container>
  );
};

export default FormRegistration;
