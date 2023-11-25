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
  Stack,
  CardMedia,
  CardActionArea,
  ListItemText,
  Paper,
} from "@mui/material";
import AirportServices from "../services/AirportServices";
import CustomNavbar from "./CustomNavbar";
import dayjs from "dayjs";
import { useAppSelector } from "../redux/hooks";
import { selectLostObjects } from "../redux/slices/LostObjectSlice";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

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
      setErrorMessage(null);
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
        <Typography variant="h4" align="center" gutterBottom>
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
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                label="Buscar por descripción"
                variant="outlined"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={2} sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                endIcon={<SearchIcon />}
                color="primary"
                onClick={handleSearch}
                sx={{ height: "100%" }}
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
                  <Grid item xs={12} md={3} key={index}>
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
                        <CardActionArea>
                          <Paper elevation={3}>
                            <CardMedia
                              component="img"
                              src={lostObject.photo}
                              alt="objeto perdido"
                              hidden
                              sx={{ maxHeight: "600px", padding: "5px" }}
                            />
                          </Paper>
                          <CardContent>
                            <Stack direction="column">
                              <ListItemText
                                primary="Estado"
                                secondary={
                                  <React.Fragment>
                                    <Typography
                                      gutterBottom
                                      sx={{ display: "inline" }}
                                      component="span"
                                      variant="h6"
                                      color="text.primary"
                                    >
                                      {lostObject.status}
                                    </Typography>
                                  </React.Fragment>
                                }
                              />
                              <ListItemText
                                primary="Descripcion"
                                secondary={
                                  <React.Fragment>
                                    <Typography
                                      gutterBottom
                                      sx={{ display: "inline" }}
                                      component="span"
                                      variant="h6"
                                      color="text.primary"
                                    >
                                      {lostObject.description}
                                    </Typography>
                                  </React.Fragment>
                                }
                              />

                              <ListItemText
                                primary="Pais"
                                secondary={
                                  <React.Fragment>
                                    <Typography
                                      gutterBottom
                                      sx={{ display: "inline" }}
                                      component="span"
                                      variant="h6"
                                      color="text.primary"
                                    >
                                      {lostObject.country.name}
                                    </Typography>
                                  </React.Fragment>
                                }
                              />
                            </Stack>
                          </CardContent>
                        </CardActionArea>
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
