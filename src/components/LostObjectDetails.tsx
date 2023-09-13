import React, { useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
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
    const userContactInfo = registeredUsers.map((user) => ({
        email: user.email,
        phone: user.phone,
    }));
    const [searchText, setSearchText] = useState<string>("");
    const [filteredObjects, setFilteredObjects] = useState(lostObjects);

    const handleSearch = () => {
        const filtered = lostObjects.filter((lostObject) => {
            const descriptionMatch = lostObject.description.toLowerCase().includes(searchText.toLowerCase());
            const countryMatch = lostObject.country.name.toLowerCase().includes(searchText.toLowerCase());
            return descriptionMatch || countryMatch;
        });
        setFilteredObjects(filtered);
    };

    return (
        <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <CustomNavbar />
            <AppBar position="static">
                <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
                    Objetos Perdidos
                </Typography>
            </AppBar>
            <Grid container justifyContent="center" spacing={2} mt={1}>
                <TextField
                    label="Buscar por descripción o país"
                    variant="outlined"
                    fullWidth
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <Grid justifyContent={"center"}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                        sx={{ marginBottom: 2 }}
                    >
                        Buscar
                    </Button>
                </Grid>
                {filteredObjects.length === 0 ? (

                    <Typography variant="h6" color="text.primary" sx={{ mt: 4 }}>
                        Elemento no encontrado.
                    </Typography>

                ) : (
                    filteredObjects.map((filteredLostObject, index) => {
                        const contactInfo = userContactInfo[index];
                        return (
                            <Grid key={index} item xs={12} md={6}>
                                <Card style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                    <Box display="flex" justifyContent="center" alignItems="center" style={{ height: "200px" }}>
                                        <img src={filteredLostObject.photo} alt="objeto perdido" style={{ width: "200px", borderRadius: "4px" }} />
                                    </Box>
                                    <Box m={1} p={1}>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Descripción:</strong> {filteredLostObject.description}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Aeropuerto:</strong> {filteredLostObject.airport.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>País:</strong> {filteredLostObject.country.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Ciudad:</strong> {filteredLostObject.city.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Fecha:</strong>{" "}
                                            {filteredLostObject.date ? dayjs(filteredLostObject.date).format("DD-MM-YYYY") : "N/A"}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Información de Contacto:</strong>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary"><strong>nombre:</strong> {registeredUsers[index].name.first} {registeredUsers[index].name.last} </Typography>
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
