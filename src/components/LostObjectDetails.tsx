import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { AppBar, Box, Grid } from "@mui/material";
import CustomNavbar from "./CustomNavbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

import { useAppSelector } from "../redux/hooks";
import dayjs from "dayjs";
import { selectLostObjects } from "../redux/slices/lostObjectSlice";
import { selectRegistrationData } from "../redux/slices/RegistrationSlices";
import AirportServices from "../services/AirportServices";

interface Location {
    name: string;
    code: string;
}

interface LostObject {
    country: Location;
    city: Location;
    airport: Location;
    date: string | null;
    description: string;
    photo?: string;
}

const LostObjectDetails: React.FC = () => {
    const lostObjects = useAppSelector(selectLostObjects);
    const registeredUsers = useAppSelector(selectRegistrationData);
    const userContactInfo = registeredUsers.map(({ email, phone }) => ({
        email,
        phone,
    }));

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<LostObject[]>([]);
    const [showAllData, setShowAllData] = useState(true);

    const [countries, setCountries] = useState<Location[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<Location | null>(null);
    const [loadingCountries, setLoadingCountries] = useState(false);

    useEffect(() => {
        const fetchCountries = async () => {
            setLoadingCountries(true);
            try {
                const countriesData = await AirportServices.fetchCountries();
                setCountries(countriesData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingCountries(false);
            }
        };

        fetchCountries();
    }, []);

    const handleSearch = () => {
        const filteredObjects = lostObjects.filter((object) => {
            const matchesDescription = object.description
                .trim()
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

            const matchesCountry = !selectedCountry || object.country.code === selectedCountry.code;
            return matchesDescription && matchesCountry;
        });

        setSearchResults(filteredObjects);
        setShowAllData(false);
    };

    const autocompleteOptions = countries;

    const displayData = showAllData ? lostObjects : searchResults;


    const handleCountryChange = (_event: any, newValue: Location | null) => {
        setSelectedCountry(newValue);
        const filteredObjects = lostObjects.filter((object) => {
            const matchesDescription = object.description
                .trim()
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

            const matchesCountry = !newValue || object.country.code === newValue.code;
            return matchesDescription && matchesCountry;
        });

        setSearchResults(filteredObjects);
        setShowAllData(false);
    };

    return (
        <div>
            <CustomNavbar />
            <AppBar position="static">
                <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
                    Objetos Perdidos
                </Typography>
            </AppBar>

            <Box mt={1}>
                <Autocomplete
                    id="country-search"
                    options={autocompleteOptions}
                    getOptionLabel={(option) => option.name}
                    value={selectedCountry}
                    onInputChange={(_event, newInputValue) => {
                        if (newInputValue.length >= 3) {
                            setCountries([]);
                            setSearchTerm(newInputValue);
                        }
                    }}
                    onChange={handleCountryChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Buscar por descripción o país"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    )}
                />
                {loadingCountries && (
                    <CircularProgress color="primary" sx={{ marginLeft: 2 }} />
                )}
            </Box>
            <Box mt={2} display="flex" justifyContent="center">
                <Button variant="contained" color="primary" onClick={handleSearch}>
                    Buscar
                </Button>
            </Box>

            <Grid container justifyContent="center" spacing={2} mt={1}>
                {displayData.length === 0 ? (
                    <Typography variant="h6" color="text.primary" sx={{ mt: 4 }}>
                        {showAllData
                            ? "No hay datos disponibles."
                            : "No se encontraron resultados."}
                    </Typography>
                ) : (
                    displayData.map((lostObject, index) => {
                        const contactInfo = userContactInfo[index];
                        return (
                            <Grid key={index} item xs={12} md={6}>
                                <Card style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        style={{ height: "200px" }}
                                    >
                                        <img
                                            src={lostObject.photo}
                                            alt="objeto perdido"
                                            style={{ width: "200px", borderRadius: "4px" }}
                                        />
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
                                            {lostObject.date
                                                ? dayjs(lostObject.date).format("DD-MM-YYYY")
                                                : "N/A"}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Información de Contacto:</strong>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Nombre:</strong>{" "}
                                            {registeredUsers[index]?.name.first}{" "}
                                            {registeredUsers[index]?.name.last}{" "}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Email:</strong> {contactInfo.email}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Teléfono:</strong> {contactInfo.phone}
                                        </Typography>
                                    </Box>
                                </Card>
                            </Grid>
                        );
                    })
                )}
            </Grid>
        </div>
    );
};

export default LostObjectDetails;
