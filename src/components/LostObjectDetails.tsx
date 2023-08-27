import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { AppBar, Box, Button, Grid } from "@mui/material";
import CustomNavbar from "./CustomNavbar";
import { useAppSelector } from "../redux/hooks";
import dayjs from "dayjs";
import { selectLostObjects } from "../redux/slices/lostObjectSlice";
import { selectRegistrationData } from "../redux/slices/RegistrationSlices";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";

const LostObjectDetails: React.FC = () => {
    const lostObjects = useAppSelector(selectLostObjects);
    const registeredUsers = useAppSelector(selectRegistrationData);
    const userContactInfo = registeredUsers.map(user => ({ email: user.email, phone: user.phone }));

    return (
        <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <CustomNavbar />
            <AppBar position="static">
                <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
                    Objetos Perdidos
                </Typography>
            </AppBar>
            <Grid container justifyContent="center" spacing={2} mt={1}>
                {lostObjects.length === 0 || null ? (
                    <Typography variant="h6" color="text.primary" sx={{ mt: 4 }}>
                        No hay datos disponibles.
                    </Typography>
                ) : (
                    lostObjects.map((lostObject, index) => {
                        const contactInfo = userContactInfo[index];
                        return (
                            <Grid key={index} item xs={12} md={6}>
                                <Card style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                    <Box display="flex" justifyContent="center" alignItems="center" style={{ height: "200px" }}>
                                        <img src={lostObject.photo} alt="Lost Object" style={{ width: "200px", borderRadius: "4px" }} />
                                    </Box>
                                    <Box m={1} p={1}>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Descripción:</strong> {lostObject.description}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Aeropuerto:</strong> {lostObject.airport.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>País:</strong> {lostObject.country.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Ciudad:</strong> {lostObject.city.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Fecha:</strong>{" "}
                                            {lostObject.date ? dayjs(lostObject.date).format("DD-MM-YYYY") : "N/A"}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Información de Contacto:</strong>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary"><strong>Email:</strong> {contactInfo.email}</Typography>
                                        <Typography variant="body2" color="text.secondary"><strong>Teléfono:</strong> {contactInfo.phone}</Typography>
                                    </Box>
                                </Card>
                            </Grid>
                        );
                    })
                )}
                <Button
                    href="/LandingPage"
                    variant="contained"
                    color="primary"
                    startIcon={<ArrowBackIcon fontSize="large" />}
                    sx={{ position: "absolute", bottom: "16px", left: "16px" }}
                >
                    Atrás
                </Button>
            </Grid>
        </div>
    );
};

export default LostObjectDetails;
