import { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Card,
  Typography,
  TextField,
  CardActionArea,
} from "@mui/material";
import AirportServices from "../services/AirportServices";
import CustomNavbar from "./CustomNavbar";
import dayjs from "dayjs";
import { useAppSelector } from "../redux/hooks";
import { selectLostObjects } from "../redux/slices/lostObjectSlice";
import { Link } from "react-router-dom";

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
    } else {
      setCountries([]);
      setSelectedCountry(null);
    }
  };

  return (
    <Grid container justifyContent="center" spacing={3}>
      <CustomNavbar />
      <Grid item justifyContent="center" xs={12} sm={6} md={4}>
        <Typography
          variant="h5"
          component="h1"
          sx={{ textAlign: "center", justifyContent: "center" }}
        >
          buscar Perdidos
        </Typography>
        <Grid item xs={12}>
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
              />
            )}
          />

          <TextField
            label="Buscar por descripción"
            variant="outlined"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{
              marginTop: 1,
              marginLeft: 30,
            }}
          >
            Buscar
          </Button>
        </Grid>
        {errorMessage && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {errorMessage}
          </Typography>
        )}
        <Grid />
        {filteredObjects.length === 0 && resultsFound === true ? (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Objeto no encontrado.
          </Typography>
        ) : (
          <div>
            {filteredObjects?.map((lostObject, index) => (
              <Box key={index} mt={2}>
                <Card
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <CardActionArea>
                    <Link
                      to="/DetailsReports"
                      state={{
                        data: {
                          newdate: dayjs(lostObject.date).format("DD-MM-YYYY"),
                          lostObject: lostObject,
                        },
                      }}
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        style={{ height: "200px" }}
                      >
                        <img
                          src={lostObject.photo}
                          alt="objeto perdido"
                          style={{
                            width: "200px",
                            borderRadius: "4px",
                          }}
                        />
                      </Box>
                      <Box m={1} p={1}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Objeto:</strong> {lostObject.status}
                        </Typography>
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
                          {lostObject.userReport?.name.first}{" "}
                          {lostObject.userReport?.name.last}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Email:</strong> {lostObject.userReport?.email}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Teléfono:</strong>{" "}
                          {lostObject.userReport?.phone}
                        </Typography>
                      </Box>
                    </Link>
                  </CardActionArea>
                </Card>
              </Box>
            ))}
          </div>
        )}
      </Grid>
    </Grid>
  );
};
export default LostObjectDetails;
