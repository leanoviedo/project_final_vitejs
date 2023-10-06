import { Grid, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CustomNavbar from './CustomNavbar';

function DetailsReports() {
    const ubicacion = useLocation();
    const { LostObjectData } = ubicacion.state || {};
    console.log(LostObjectData)

    return (
        <div>
            <CustomNavbar></CustomNavbar>
            <Typography variant="h2">Detalles del Objeto Perdido</Typography>
            <Typography variant="h6"><strong>fotografia  Objeto Perdido</strong></Typography>
            {LostObjectData && (
                <Grid>
                    <img
                        src={LostObjectData.photo}
                        alt="objeto perdido"
                        style={{
                            width: "200px",
                            borderRadius: "4px",
                        }}
                    />
                    <Typography variant="body2"><strong>Descripción:</strong> {LostObjectData.description}</Typography>
                    <Typography variant="body2"><strong>Aeropuerto:</strong> {LostObjectData.airport.name}</Typography>
                    <Typography variant="body2"><strong>País:</strong> {LostObjectData.country.name}</Typography>
                    <Typography variant="body2"><strong>Ciudad:</strong> {LostObjectData.city.name}</Typography>
                    <Typography variant="body2"><strong>Fecha:</strong> {LostObjectData.date}</Typography>
                    <Typography variant="body2"><strong>Información de Contacto:</strong></Typography>
                    <img
                        src={LostObjectData.user.picture.large}
                        alt="fotografia de la persona del reporte "
                        style={{
                            width: "200px",
                            borderRadius: "4px",
                        }}
                    />
                    <Typography variant="body2"><strong>Nombre:</strong> {LostObjectData.user.name.first} {LostObjectData.user.name.last}</Typography>
                    <Typography variant="body2"><strong>Email:</strong> {LostObjectData.user.email}</Typography>
                    <Typography variant="body2"><strong>Teléfono:</strong> {LostObjectData.user.phone}</Typography>
                    <Typography variant="body2"><strong>direcciion de domicilio  :</strong>{LostObjectData.user.location.city}  {LostObjectData.user.location.country} <i> Estado </i> {LostObjectData.user.location.state}</Typography>
                    <Typography variant='body2'><strong>codigo postal:</strong> {LostObjectData.user.location.postcode}</Typography>


                </Grid>
            )}
        </div>
    );
}
export default DetailsReports;
