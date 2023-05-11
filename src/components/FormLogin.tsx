import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

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

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Acuerdate de mi "
          />
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
          <Link href="#" variant="body2">
            has ovidado tu contraseña?
          </Link>
          <Grid>
            <Link href="#" variant="body2">
              {"No tienes una cuenta? registrate "}
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default FormLogin;
