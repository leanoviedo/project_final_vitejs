import { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Card,
  Typography,
  TextField,
  CardContent,
  Divider,
  Stack,
} from "@mui/material";
import AirportServices from "../services/AirportServices";
import CustomNavbar from "./CustomNavbar";
import dayjs from "dayjs";
import { useAppSelector } from "../redux/hooks";
import { selectLostObjects } from "../redux/slices/lostObjectSlice";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const LostObjectDetails = () => {
  const lostObjects = useAppSelector(selectLostObjects);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [countries, setCountries] = useState<string[]>([]);
  const [filteredObjects, setFilteredObjects] = useState(lostObjects);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resultsFound, setResultsFound] = useState(true);
  const validationMessages = {
    noCountryMatch:
      "No se encontraron resultados para el país o descripción seleccionada.",
    inputMinimumLength:
      "Por favor, ingrese al menos 3 caracteres para buscar un país.",
  };

  const handleSearch = () => {
    if (selectedCountry || searchText.length >= 3) {
      const filtered = lostObjects.filter((lostObject) => {
        const descriptionMatch = searchText
          ? lostObject.description
              .toLowerCase()
              .includes(searchText.toLowerCase())
          : true;
        const countryMatch = selectedCountry
          ? lostObject.country.name === selectedCountry
          : true;
        return descriptionMatch && countryMatch;
      });

      if (filtered.length === 0) {
        setFilteredObjects([]);
        setErrorMessage(validationMessages.noCountryMatch);
        setResultsFound(false);
      } else {
        setFilteredObjects(filtered);
        setErrorMessage(null);
        setResultsFound(true);
      }
    } else {
      setFilteredObjects(lostObjects);
      setErrorMessage(validationMessages.inputMinimumLength);
      setResultsFound(true);
    }
  };

  const handleCountryInputChange = async (
    _event: any,
    newInputValue: string
  ) => {
    if (newInputValue.length >= 3) {
      try {
        const countriesData = await AirportServices.fetchCountries();
        const filteredCountries = countriesData
          .map((country: any) => country.name)
          .filter((countryName: string) =>
            countryName.toLowerCase().includes(newInputValue.toLowerCase())
          );
        setCountries(filteredCountries);
      } catch (error) {
        console.error(error);
      }
    } else if (newInputValue.length === 0) {
      setCountries([]);
      setSelectedCountry(null);
    }
  };
  return (
    <Grid container spacing={3} justifyContent="center">
      <CustomNavbar />
      <Grid item xs={12} md={8}>
        <Typography variant="h4" color="darkblue" align="center" gutterBottom>
          Buscar Objetos Perdidos
        </Typography>
        <Box p={3}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} md={5}>
              <Autocomplete
                options={countries}
                value={selectedCountry}
                onChange={(_, newValue) => setSelectedCountry(newValue)}
                onInputChange={handleCountryInputChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Buscar por país"
                    fullWidth
                    variant="standard"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                label="Buscar por descripción"
                variant="standard"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={2} sx={{ textAlign: "center" }}>
              <Button
                variant="outlined"
                endIcon={<SearchIcon />}
                color="primary"
                onClick={handleSearch}
                sx={{ marginTop: 2, height: "100%" }}
              >
                Buscar
              </Button>
            </Grid>
            {errorMessage && (
              <Grid item xs={12}>
                <Typography variant="h5" color="error" sx={{ mt: 2 }}>
                  {errorMessage}
                </Typography>
              </Grid>
            )}{" "}
          </Grid>

          <Box mt={4}>
            <Grid container spacing={2}>
              {filteredObjects.length === 0 && resultsFound === true ? (
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    color="error"
                    textAlign="center"
                    sx={{
                      backgroundColor: "#f8d7da",
                      color: "#721c24",
                      padding: "5px",
                      borderRadius: "5px",
                      margin: "10px 0",
                    }}
                  >
                    Objeto no encontrado
                  </Typography>
                </Grid>
              ) : filteredObjects.length === 0 && resultsFound === true ? (
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    color="error"
                    textAlign="center"
                    sx={{
                      backgroundColor: "#f8d7da",
                      color: "#721c24",
                      padding: "5px",
                      borderRadius: "5px",
                      margin: "10px 0",
                    }}
                  >
                    Objeto no encontrado
                  </Typography>
                </Grid>
              ) : (
                filteredObjects?.map((lostObject, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card elevation={3}>
                      <Link
                        to="/DetailsReports"
                        state={{
                          data: {
                            newdate: dayjs(lostObject.date).format(
                              "DD-MM-YYYY"
                            ),
                            lostObject: lostObject,
                          },
                        }}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Box
                          component="img"
                          src={lostObject.photo}
                          alt="objeto perdido"
                          width={"80%"}
                          justifyContent="center"
                        />
                        <CardContent>
                          <Stack spacing={1}>
                            <Typography variant="h6" color="text.primary">
                              Estado: {lostObject.status}
                            </Typography>
                            <Typography variant="h6" color="text.primary">
                              Descripción: {lostObject.description}
                            </Typography>
                            <Typography variant="h6" color="text.primary">
                              Aeropuerto: {lostObject.airport.name}
                            </Typography>
                            <Typography variant="h6" color="text.primary">
                              País: {lostObject.country.name}
                            </Typography>
                            <Typography variant="h6" color="text.primary">
                              Ciudad: {lostObject.city.name}
                            </Typography>
                            <Typography variant="h6" color="text.primary">
                              Fecha:{" "}
                              {lostObject.date
                                ? dayjs(lostObject.date).format("DD-MM-YYYY")
                                : "N/A"}
                            </Typography>
                            <Divider />
                            <Typography variant="h5" color="InfoText">
                              Información de Contacto:
                            </Typography>
                            <Typography variant="h6" color="text.primary">
                              Nombre: {lostObject.userReport?.name.first}{" "}
                              {lostObject.userReport?.name.last}
                            </Typography>
                            <Typography variant="h6" color="text.primary">
                              Email: {lostObject.userReport?.email}
                            </Typography>
                            <Typography variant="h6" color="text.primary">
                              Teléfono: {lostObject.userReport?.phone}
                            </Typography>
                          </Stack>
                        </CardContent>
                      </Link>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LostObjectDetails;
