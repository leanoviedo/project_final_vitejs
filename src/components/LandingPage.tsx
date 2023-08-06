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
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";


import AirportServices from "../services/AirportServices";

interface LostObject {
  object: string;
  country: string;
  city: string;
  airport: string;
  date: string;
  photo?: File;
  field: any
}

const LandingPage = () => {
  const [lostObject, setLostObject] = useState<LostObject>({
    object: "",
    country: "",
    city: "",
    airport: "",
    date: "",
    photo: undefined,
    field: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [airportData, setAirportData] = useState<any[]>([]);
  const [cityData, setCityData] = useState<any[]>([]);
  const [countryData, setCountryData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const airports = await AirportServices.fetchAirports();
        const cities = await AirportServices.fetchCities();
        const countries = await AirportServices.fetchCountries();

        console.log("Fetched airports:", airports);
        console.log("Fetched cities:", cities);
        console.log("Fetched countries:", countries);

        setAirportData(airports);
        setCityData(cities);
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
      ...prev, city: value,
    }));
  };

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    console.log("Country selected:", value);
    setLostObject((prev) => ({
      ...prev,
      country: value,
    }));
  };
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const photoFile = e.target.files && e.target.files[0];

    setLostObject((prev) => ({
      ...prev,
      photo: photoFile || undefined,
    }));
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitting form with data:", lostObject);
    setSubmitted(true);
  };

  console.log("Rendered component with state:", lostObject);

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
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Aeropuerto</InputLabel>
                <Select
                  name="airport"
                  label="Aeropuerto"
                  value={lostObject.airport}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  onChange={handleAirportChange}
                >
                  {airportData.map((airport: any, index: number) => (
                    <MenuItem key={index} value={airport.code}>
                      {airport.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Seleccione un aeropuerto</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Ciudad</InputLabel>
                <Select
                  name="city"
                  value={lostObject.city}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  onChange={handleCityChange}
                >
                  {cityData.map((city: any, index: number) => (
                    <MenuItem key={index} value={city.code}>
                      {city.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Seleccione una ciudad</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>País</InputLabel>
                <Select
                  name="country"
                  value={lostObject.country}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  onChange={handleCountryChange}
                >
                  {countryData.map((country: any, index: number) => (
                    <MenuItem key={index} value={country.code}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Seleccione un país</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
                <FormHelperText>Seleccione una foto del objeto</FormHelperText>
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
          ¡Gracias por reportar tu objeto perdido! Tu reporte ha sido enviado con éxito.
        </Typography>
      )}
    </Container>
  );
};

export default LandingPage;
