import { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Card,
  Typography,
  TextField,
  Stack,
  CardMedia,
  CardActionArea,
  ListItemText,
  Paper,
  CardContent,
} from "@mui/material";
import AirportServices from "../services/AirportServices";
import CustomNavbar from "./CustomNavbar";
import dayjs from "dayjs";
import { useAppSelector } from "../redux/hooks";
import { selectLostObjects } from "../redux/slices/LostObjectSlice";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  selectedCountry: yup.string().nullable().required("Campo obligatorio"),
  searchText: yup.string().required("Campo obligatorio"),
});

const LostObjectDetails = () => {
  const formik = useFormik({
    initialValues: {
      selectedCountry: null,
      searchText: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {},
  });

  const lostObjects = useAppSelector(selectLostObjects);
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
    const { selectedCountry, searchText } = formik.values;

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
      formik.setFieldValue("selectedCountry", null);
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
                value={formik.values.selectedCountry}
                onChange={(_, newValue) =>
                  formik.setFieldValue("selectedCountry", newValue)
                }
                onInputChange={handleCountryInputChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Buscar por país"
                    fullWidth
                    variant="outlined"
                    error={
                      formik.touched.selectedCountry &&
                      Boolean(formik.errors.selectedCountry)
                    }
                    helperText={
                      formik.touched.selectedCountry &&
                      formik.errors.selectedCountry
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                label="Buscar por descripción"
                variant="outlined"
                value={formik.values.searchText}
                onChange={(e) =>
                  formik.setFieldValue("searchText", e.target.value)
                }
                fullWidth
                error={
                  formik.touched.searchText && Boolean(formik.errors.searchText)
                }
                helperText={
                  formik.touched.searchText && formik.errors.searchText
                }
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
            )}
          </Grid>

          <Box mt={4}>
            <Grid container spacing={2} justifyContent="center">
              {filteredObjects.length === 0 && resultsFound ? (
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
                filteredObjects.map((lostObject, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Card
                      elevation={3}
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
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
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          flex: 1,
                        }}
                      >
                        <CardActionArea style={{ flex: 1 }}>
                          <Paper
                            elevation={3}
                            sx={{ flex: 1, display: "flex" }}
                          >
                            <CardMedia
                              hidden
                              sx={{
                                objectFit: "contain",
                                objectPosition: "center",
                                flex: 1,
                                width: "100%",
                                height: "300px",
                              }}
                            >
                              <img
                                src={lostObject.photo}
                                alt="Objeto perdido"
                                style={{
                                  width: "100%",
                                  height: "300px",
                                }}
                              />
                            </CardMedia>
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
                                      {lostObject.type}
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
