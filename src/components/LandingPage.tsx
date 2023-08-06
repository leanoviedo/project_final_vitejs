import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Box,
  Select,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";

import AirportServices from "../services/AirportServices";

interface LostObject {
  object: string;
  country: string;
  city: string;
  airport: string;
  date: string;
  photo?: string;
}

const LandingPage = () => {
  const [lostObject, setLostObject] = useState<LostObject>({
    object: "",
    country: "",
    city: "",
    airport: "",
    date: "",
    photo: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [airportData, setAirportData] = useState<any[]>([]);
  const [cityData, setCityData] = useState<any[]>([]);
  const [countryData, setCountryData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const countries = await AirportServices.fetchCountries();
        console.log("Fetched countries:", countries);
        setCountryData(countries);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleAirportChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    console.log("Airport selected:", value);

    setLostObject((prev) => ({
      ...prev,
      airport: value,
    }));
  };

  const handleCityChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    console.log("City selected:", value);

    setLostObject((prev) => ({
      ...prev,
      city: value,
    }));

    AirportServices.fetchAirportsByCities(value)
      .then((response) => {
        console.log(response.data.response);
        const airportsByCities = response.data.response;
        setAirportData(airportsByCities);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    console.log("Country selected:", value);

    setLostObject((prev) => ({
      ...prev,
      country: value,
    }));

    AirportServices.fetchCitiesByCountry(value)
      .then((response) => {
        console.log(response.data.response);
        const citiesByCountry = response.data.response;
        setCityData(citiesByCountry);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLostObject({ ...lostObject, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitting form with data:", lostObject);
    setSubmitted(true);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h2" align="center" marginBottom={3}>
        Airport Missing Things (MYT)
      </Typography>

      <Typography variant="h4" align="center" marginBottom={4}>
        ¡Reporta tu objeto perdido!
      </Typography>

      {!submitted ? (
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} marginTop={2}>
              <FormControl fullWidth required>
                <InputLabel id="country-label">Pais</InputLabel>
                <Select
                  labelId="country-select-label"
                  id="country-simple-select"
                  value={lostObject.country}
                  label="country"
                  onChange={handleCountryChange}
                  input={<OutlinedInput label="Pain" />}
                >
                  {countryData.map((country: any, index: number) => (
                    <MenuItem key={index} value={country.code}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} marginTop={2}>
              <FormControl fullWidth required>
                <InputLabel id="city-label">Ciudad</InputLabel>
                <Select
                  labelId="city-select-label"
                  id="city-simple-select"
                  value={lostObject.city}
                  label="city"
                  onChange={handleCityChange}
                  input={<OutlinedInput label="Ciudad" />}
                >
                  {cityData.map((city: any, index: number) => (
                    <MenuItem key={index} value={city.city_code}>
                      {city.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} marginTop={2}>
              <FormControl fullWidth required>
                <InputLabel id="demo-multiple-name-label">
                  Aeropuerto
                </InputLabel>
                <Select
                  labelId="airport-select-label"
                  id="airport-simple-select"
                  value={lostObject.airport}
                  onChange={handleAirportChange}
                  input={<OutlinedInput label="Aeropuerto" />}
                >
                  {airportData.map((airport: any, index: number) => (
                    <MenuItem key={index} value={airport.name}>
                      {airport.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="photo"
                  label="photo"
                  name="photo"
                  value={lostObject.photo}
                  onChange={handlePhotoChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} justifyContent={"center"} display={"flex"}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SendIcon />}
                sx={{ mt: 2 }}
              >
                Enviar reporte
              </Button>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Typography variant="h5" align="center">
          ¡Gracias por reportar tu objeto perdido! Tu reporte ha sido enviado
          con éxito.
        </Typography>
      )}
    </Container>
  );
};

export default LandingPage;
