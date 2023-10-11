import React, { useRef, useState, useEffect } from "react";
import {
    Typography,
    Avatar,
    Box,
    Grid,
    Paper,
    Divider,

} from "@mui/material";
import { useLocation } from "react-router-dom";
import CustomNavbar from "./CustomNavbar";
import GoogleMapReact from "google-map-react";

const DetailsReports: React.FC = () => {
    const ubicacion = useLocation();
    const { lostObject, newdate } = ubicacion.state.data || {};

    const [airportCoordinate, setAirportCoordinate] = useState<{ lat: number; lng: number }>(
        { lat: 0, lng: 0 }
    );

    const mapRef = useRef<any>(null);
    const markerRef = useRef<any>(null);
    const infoWindowRef = useRef<any>(null);

    const handleAddressDataReceived = () => {
        const lat = lostObject.airport.lat;
        const lng = lostObject.airport.lng;
        console.log("Latitude:", lat);
        console.log("Longitude:", lng);
        setAirportCoordinate({ lat, lng });
    }

    useEffect(() => {
        handleAddressDataReceived();
    }, []);

    const maprender = (map: any, maps: any) => {
        mapRef.current = map;
        markerRef.current = new maps.Marker({
            position: airportCoordinate,
            map,
        });

        infoWindowRef.current = new maps.InfoWindow({
            content: `
            
                    <h3>${lostObject.airport.name}</h3>`,
        });

        markerRef.current.addListener("click", () => {
            infoWindowRef.current.open(map, markerRef.current);
        });

    }

    return (
        <div>
            <CustomNavbar />
            <Typography variant="h5" component="h1" sx={{ textAlign: "center" }}>
                Detalle del reporte
            </Typography>
            {lostObject && (
                <Paper elevation={3} sx={{ padding: 2, marginTop: 2, marginBottom: 2 }}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <Box>
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
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box>
                                <img
                                    src={lostObject.photo}
                                    alt="objeto perdido"
                                    style={{
                                        width: 200, height: 200,
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <Box>
                                <Typography variant="body2">
                                    <strong>Nombre:</strong>{" "}
                                    {lostObject.user?.name.first} {lostObject.user?.name.last}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Email:</strong> {lostObject.user?.email}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Teléfono:</strong> {lostObject.user?.phone}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Dirección de domicilio:</strong>{" "}
                                    {lostObject.user?.location.city} {lostObject.user?.location.country}{" "}
                                    <i>Estado</i> {lostObject.user?.location.state}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Código postal:</strong> {lostObject.user?.location.postcode}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid xs={12} sm={6} md={4}>
                            <Box>
                                <Avatar
                                    src={lostObject.user?.picture.large}
                                    alt="fotografía de la persona del reporte"
                                    sx={{ width: 200, height: 200 }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            )}
            <Grid item xs={12} sm={6} md={4}>
                <div style={{ height: "400px", width: "100%" }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyDMVoFJqQljWVR7J2d4_ElY4oTe2wa5ygQ" }}
                        center={airportCoordinate}
                        defaultZoom={15}
                        yesIWantToUseGoogleMapApiInternals={true}
                        onGoogleApiLoaded={({ map, maps }) => maprender(map, maps)}
                    >

                    </GoogleMapReact>
                </div>
            </Grid>
        </div>
    );
};

export default DetailsReports;
