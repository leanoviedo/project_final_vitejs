import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { AppBar, Box, Grid } from "@mui/material";
import CustomNavbar from "./CustomNavbar";
import { useAppSelector } from "../redux/hooks";
import dayjs from "dayjs";
import { selectLostObjects } from "../redux/slices/lostObjectSlice";
import { selectRegistrationData } from "../redux/slices/RegistrationSlices";
import { selectUserLogin } from "../redux/slices/UserLogin";

const LostObjectDetails: React.FC = () => {
    const lostObjects = useAppSelector(selectLostObjects);
    const registeredUsers = useAppSelector(selectRegistrationData);
    const userlogin = useAppSelector(selectUserLogin);

    const loggedInUserEmail = userlogin.userLogin?.email;

    return (
        <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <CustomNavbar />
            <AppBar position="static">
                <Typography variant="h6" component="div" sx={{  textAlign:"center" }}>
                    Lista de Objetos Perdidos...!!!
                </Typography>
            </AppBar>
            <Grid container justifyContent="center" spacing={2} mt={1}>
                {lostObjects.map((lostObject, index) => {
                    const reportingUser = registeredUsers.find(user => user.email === loggedInUserEmail);

                    return (
                        <Grid key={index} item xs={12} md={6}>
                            <Card style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                <Box display="flex" justifyContent="center" alignItems="center" style={{ height: "200px", marginBottom: "16px" }}>
                                    <img src={lostObject.photo} alt="Lost Object" style={{ width: "60%", borderRadius: "4px" }} />
                                </Box>
                                <Box m={1}p={1}>
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
                                    {reportingUser && (
                                        <Box mt={2}>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Información de Contacto:</strong>
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Email: {reportingUser.email}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Teléfono: {reportingUser.phone}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};

export default LostObjectDetails;
