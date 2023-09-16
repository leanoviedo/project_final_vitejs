import React, { useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { AppBar, Autocomplete, Box, Button, Grid } from "@mui/material";
import AirportServices from "../services/AirportServices";
import CustomNavbar from "./CustomNavbar";
import dayjs from "dayjs";
import { useAppSelector } from "../redux/hooks";
import { selectLostObjects } from "../redux/slices/lostObjectSlice";
import { selectRegistrationData } from "../redux/slices/RegistrationSlices";

const LostObjectDetails: React.FC = () => {
    const lostObjects = useAppSelector(selectLostObjects);
    // const registeredUsers = useAppSelector(selectRegistrationData);
    const registeredUsers = useAppSelector(selectRegistrationData) || [];
    const userContactInfo = registeredUsers.map((user) => ({
        email: user.email,
        phone: user.phone,
    }));

    const [searchText, setSearchText] = useState<string>("");
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [countries, setCountries] = useState<string[]>([]);
    const [filteredObjects, setFilteredObjects] = useState(lostObjects);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const validationMessages = {
        noCountryMatch: "No se encontraron resultados para el país o descripción seleccionado.",
    };

    const handleSearch = () => {
        const filtered = lostObjects.filter((lostObject) => {
            const descriptionMatch = searchText ? lostObject.description.toLowerCase().includes(searchText.toLowerCase()) : true;
            const countryMatch = selectedCountry ? lostObject.country.name === selectedCountry : true;
            return descriptionMatch && countryMatch;
        });

        setFilteredObjects(filtered);
        setSearchText("");
        setSelectedCountry(null);

        if (filtered.length === 0) {
            if (searchText && !selectedCountry) {
                setErrorMessage(validationMessages.noCountryMatch);
            } else if (!selectedCountry) {
                setErrorMessage(validationMessages.noCountryMatch);
            } else {
                setErrorMessage("No se encontraron resultados.");
            }
        } else {
            setErrorMessage(null);
        }
    };

    const handleCountryInputChange = async (_event: any, newInputValue: string) => {
        if (newInputValue.length >= 3) {
            try {
                const countriesData = await AirportServices.fetchCountries();
                setCountries(countriesData.map((country: any) => country.name));
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <CustomNavbar />
            <AppBar position="static">
                <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
                    Objetos Perdidos
                </Typography>
            </AppBar>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={6}>
                    <Box mt={3}>
                        <Autocomplete
                            options={countries}
                            value={selectedCountry}
                            onChange={(_, newValue) => setSelectedCountry(newValue)}
                            onInputChange={handleCountryInputChange}
                            renderInput={(params) => (
                                <TextField
                                    label="Buscar por país"
                                    {...params}
                                    variant="outlined"
                                    style={{ width: 600 }}
                                />
                            )}
                        />
                        <TextField
                            label="Buscar por descripción"
                            variant="outlined"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            style={{ width: 600, marginTop: 10 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSearch}
                            sx={{
                                marginBottom: 2,
                                marginTop: 1,
                                marginLeft: 30,
                            }}
                        >
                            Buscar
                        </Button>
                        {errorMessage && (
                            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                {errorMessage}
                            </Typography>
                        )}
                    </Box>
                    {filteredObjects.length === 0 && !errorMessage ? (
                        <Typography variant="h6" color="text.primary" sx={{ mt: 4 }}>
                            No se encontraron reportes
                        </Typography>
                    ) : (
                        filteredObjects.map((filteredLostObject, index) => {
                            const contactInfo = userContactInfo[index];
                            return (
                                <Box key={index} mt={2}>
                                    <Card
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            width: "100%",
                                        }}
                                    >
                                        <Box
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            style={{ height: "200px" }}
                                        >
                                            <img
                                                src={filteredLostObject.photo}
                                                alt="objeto perdido"
                                                style={{
                                                    width: "200px",
                                                    borderRadius: "4px",
                                                }}
                                            />
                                        </Box>
                                        <Box m={1} p={1}>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Descripción:</strong>{" "}
                                                {filteredLostObject.description}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Aeropuerto:</strong>{" "}
                                                {filteredLostObject.airport.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>País:</strong>{" "}
                                                {filteredLostObject.country.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Ciudad:</strong>{" "}
                                                {filteredLostObject.city.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Fecha:</strong>{" "}
                                                {filteredLostObject.date
                                                    ? dayjs(filteredLostObject.date).format("DD-MM-YYYY")
                                                    : "N/A"}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Información de Contacto:</strong>
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Nombre:</strong>{" "}
                                                {registeredUsers[index].name.first}{" "}
                                                {registeredUsers[index].name.last}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Email:</strong> {contactInfo.email}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Teléfono:</strong> {contactInfo.phone}
                                            </Typography>
                                        </Box>
                                    </Card>
                                </Box>
                            );
                        })
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default LostObjectDetails;
