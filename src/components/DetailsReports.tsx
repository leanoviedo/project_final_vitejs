import { Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import CustomNavbar from "./CustomNavbar";

const DetailsReports = () => {
  const ubicacion = useLocation();
  const { lostObject, newdate } = ubicacion.state.data || {};

  return (
    <div>
      <CustomNavbar></CustomNavbar>
      <Typography variant="h2">Detalles del Objeto Perdido</Typography>
      <Typography variant="h6">
        <strong>fotografia Objeto Perdido</strong>
      </Typography>
      {lostObject && (
        <Grid>
          <img
            src={lostObject.photo}
            alt="objeto perdido"
            style={{
              width: "200px",
              borderRadius: "4px",
            }}
          />
          <Typography variant="body2">
            <strong>Descripción:</strong> {lostObject.description}
          </Typography>
          <Typography variant="body2">
            <strong>Aeropuerto:</strong> {lostObject.airport.name}
          </Typography>
          <Typography variant="body2">
            <strong>País:</strong> {lostObject.country.name}
          </Typography>
          <Typography variant="body2">
            <strong>Ciudad:</strong> {lostObject.city.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Fecha:</strong> {newdate}
          </Typography>
          <Typography variant="body2">
            <strong>Información de Contacto:</strong>
          </Typography>
          <img
            src={lostObject.user?.picture.large}
            alt="fotografia de la persona del reporte "
            style={{
              width: "200px",
              borderRadius: "4px",
            }}
          />
          <Typography variant="body2">
            <strong>Nombre:</strong> {lostObject.user?.name.first}{" "}
            {lostObject.user?.name.last}
          </Typography>
          <Typography variant="body2">
            <strong>Email:</strong> {lostObject.user?.email}
          </Typography>
          <Typography variant="body2">
            <strong>Teléfono:</strong> {lostObject.user?.phone}
          </Typography>
          <Typography variant="body2">
            <strong>direcciion de domicilio :</strong>
            {lostObject.user?.location.city} {lostObject.user?.location.country}{" "}
            <i> Estado </i> {lostObject.user?.location.state}
          </Typography>
          <Typography variant="body2">
            <strong>codigo postal:</strong> {lostObject.user?.location.postcode}
          </Typography>
        </Grid>
      )}
    </div>
  );
};
export default DetailsReports;
