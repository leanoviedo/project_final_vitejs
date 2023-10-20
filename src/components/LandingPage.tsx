import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
  OutlinedInput,
  TextField,
  Card,
  FormHelperText,
  Snackbar,
  Alert,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import AirportServices from "../services/AirportServices";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import CustomNavbar from "./CustomNavbar";
import { LostObjectData, Country, City, Airport } from "../model/interface"
import { setLostObjectData } from "../redux/slices/lostObjectSlice";
import { selectUserLogin } from "../redux/slices/UserLogin";
import { v4 as uuidv4 } from 'uuid';



const errorStyles = {
  color: "red",
};

const LandingPage = () => {
  const [lostObject, setLostObject] = useState<LostObjectData>({
    country: {
      code: "",
      code3: "",
      name: "",
    },
    city: {
      name: "",
      city_code: "",
      lat: 0.0,
      lng: 0.0,
      country_code: "",
      type: "",
    },
    airport: {
      name: "",
      iata_code: "",
      icao_code: "",
      lat: 0.0,
      lng: 0.0,
      country_code: "",
    },
    date: null,
    photo: "",
    description: "",
    type: "",
    status: "creado",
    id: uuidv4(),
  });

  const [airportData, setAirportData] = useState<any[]>([]);
  const [cityData, setCityData] = useState<any[]>([]);
  const [countryData, setCountryData] = useState<any[]>([]);
  const [startDate] = useState(dayjs("2023-01-01"));
  const [endDate] = useState(dayjs());
  const [countryError, setCountryError] = useState("");
  const [cityError, setCityError] = useState("");
  const [airportError, setAirportError] = useState("");
  const [dateError, setDateError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [photoError, setPhotoError] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedAirport, setSelectedCAirport] = useState("");
  const [lostType, setLostType] = useState("");


  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(selectUserLogin);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countries = await AirportServices.fetchCountries();
        console.log(countries);
        setCountryData(countries);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const [openModal, setOpenModal] = useState(false);

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    const conutrynew: Country = JSON.parse(JSON.stringify(value));
    setSelectedCountry(value);

    setLostObject((prev) => ({
      ...prev,
      country: conutrynew,
    }));

    AirportServices.fetchCitiesByCountry(conutrynew.code)
      .then((response) => {
        console.log(response.data.response);
        const citiesByCountry = response.data.response;
        setCityData(citiesByCountry);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCityChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    const citynew: City = JSON.parse(JSON.stringify(value));
    setSelectedCity(value);

    setLostObject((prev) => ({
      ...prev,
      city: citynew,
    }));

    AirportServices.fetchAirportsByCities(citynew.city_code)
      .then((response) => {
        const airportsByCities = response.data.response;
        setAirportData(airportsByCities);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAirportChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    const Airportnew: Airport = JSON.parse(JSON.stringify(value));
    setSelectedCAirport(value);

    setLostObject((prev) => ({
      ...prev,
      airport: Airportnew,
    }));
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    setLostObject((prev) => ({
      ...prev,
      description: newValue,
    }));
  };
  const handleDateChange = (date: Dayjs | null) => {
    setLostObject((prev) => ({
      ...prev,
      date: date || null,
    }));
  };
  const handleLostTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLostType(event.target.value);
  };
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLostObject({ ...lostObject, [event.target.name]: event.target.value });
    console.log(event.target.value);
  };
  const resetFormFields = () => {
    setLostObject({
      country: {
        code: "",
        code3: "",
        name: "",
      },
      city: {
        name: "",
        city_code: "",
        lat: 0.0,
        lng: 0.0,
        country_code: "",
        type: "",
      },
      airport: {
        name: "",
        iata_code: "",
        icao_code: "",
        lat: 0.0,
        lng: 0.0,
        country_code: "",
      },
      description: "",
      date: null,
      photo: "",
      type: "",
      status: "",
      id:"",
    });
    setCountryError("");
    setCityError("");
    setAirportError("");
    setDateError("");
    setDescriptionError("");
    setPhotoError("");
    setLostType("")
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCountryError("");
    setCityError("");
    setAirportError("");
    setDateError("");
    setDescriptionError("");
    setPhotoError("");

    let hasErrors = false;

    if (!lostObject.country || !lostObject.country.name) {
      setCountryError("Campo obligatorio");
      hasErrors = true;
    }

    if (!lostObject.city || !lostObject.city.name) {
      setCityError("Campo obligatorio");
      hasErrors = true;
    }

    if (!lostObject.airport || !lostObject.airport.name) {
      setAirportError("Campo obligatorio");
      hasErrors = true;
    }

    if (!lostObject.date) {
      setDateError("Campo obligatorio");
      hasErrors = true;
    }

    if (!lostObject.description) {
      setDescriptionError("Campo obligatorio");
      hasErrors = true;
    }

    if (!lostObject.photo) {
      setPhotoError("Campo obligatorio");
      hasErrors = true;
    }

    if (!lostType) {
      setLostType("Campo obligatorio");
      hasErrors = true;
    }


    if (hasErrors) {
      return;
    }

    setOpenModal(true);

    resetFormFields();

    const selectData = {
      country: lostObject.country,
      city: lostObject.city,
      airport: lostObject.airport,
      date: lostObject.date ? lostObject.date : null,
      photo: lostObject.photo || "",
      description: lostObject.description,
      type: lostType,
      status: lostObject.status,
      id: uuidv4(),
      user: loggedInUser
        ? {
          name: {
            first: loggedInUser.name.first,
            last: loggedInUser.name.last,
          },
          location: {
            city: loggedInUser.location.city,
            state: loggedInUser.location.state,
            country: loggedInUser.location.country,
            postcode: loggedInUser.location.postcode,
            coordinates: {
              latitude: loggedInUser.location.coordinates.latitude,
              longitude: loggedInUser.location.coordinates.longitude,
            },
          },
          email: loggedInUser.email,
          login: loggedInUser.login,
          phone: loggedInUser.phone,
          cell: loggedInUser.cell,
          picture: loggedInUser.picture,
          password: loggedInUser.login.password,

        }
        : null,

    };
    console.log(selectData);

    dispatch(setLostObjectData(selectData));
  };

  return (
    <Grid
      container
      alignContent="center"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      <CustomNavbar />
      <Grid item mt={5} xs={12} sm={6} md={4} >
        <Card sx={{ p: 3, boxShadow: 3 }}>
          <Typography variant="h4" align="center" marginBottom={4}>
            ¡Reporta tu objeto perdido!
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ borderColor: "primary.main" }}
          >
            <Grid item xs={12}  >
              <FormControl fullWidth>
                <InputLabel id="country-label">Pais</InputLabel>
                <Select
                  labelId="country-select-label"
                  id="country-simple-select"
                  value={selectedCountry}
                  label="country"
                  onChange={handleCountryChange}
                  input={<OutlinedInput label="Pain" />}
                >
                  {countryData.map((country: any, index: number) => (
                    <MenuItem key={index} value={country}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={errorStyles}>{countryError}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item marginTop={2} xs={12}  >
              <FormControl fullWidth>
                <InputLabel id="city-label">Ciudad</InputLabel>
                <Select
                  labelId="city-select-label"
                  id="city-simple-select"
                  value={selectedCity}
                  label="city"
                  onChange={handleCityChange}
                  input={<OutlinedInput label="Ciudad" />}
                >
                  {cityData.map((city: any, index: number) => (
                    <MenuItem key={index} value={city}>
                      {city.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={errorStyles}> {cityError}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item marginTop={2} xs={12}  >
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-name-label">
                  Aeropuerto
                </InputLabel>
                <Select
                  labelId="airport-select-label"
                  id="airport-simple-select"
                  value={selectedAirport}
                  onChange={handleAirportChange}
                  input={<OutlinedInput label="Aeropuerto" />}
                >
                  {airportData.map((airport: any, index: number) => (
                    <MenuItem key={index} value={airport}>
                      {airport.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={errorStyles}>{airportError}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item marginTop={2} xs={12} >
              <DatePicker
                label="Fecha de la perdida"
                value={lostObject.date}
                onChange={handleDateChange}
                minDate={startDate}
                maxDate={endDate}
                views={["year", "month", "day"]}
                sx={{ width: "100%" }}
              />
              <FormHelperText sx={errorStyles}>{dateError}</FormHelperText>
            </Grid>
            <Grid item marginTop={2} xs={12}  >
              <TextField
                fullWidth
                id="photo"
                label="Foto"
                name="photo"
                value={lostObject.photo}
                onChange={handlePhotoChange}
              />
              <FormHelperText sx={errorStyles}>{photoError}</FormHelperText>
            </Grid>
            <Grid item marginTop={2} xs={12} >
              <TextField
                aria-label="minimum height"
                id="description"
                name="description"
                fullWidth
                multiline
                minRows={3}
                variant="outlined"
                value={lostObject.description}
                onChange={handleDescriptionChange}
                placeholder="Escriba la Descripción"
              />
              <FormHelperText sx={errorStyles}>
                {descriptionError}
              </FormHelperText>
            </Grid>
            <Grid>
              <FormControl component="fieldset">
                <FormLabel component="legend">Estado</FormLabel>
                <RadioGroup
                  aria-label="lostStatus"
                  name="lostStatus"
                  value={lostType}
                  onChange={handleLostTypeChange}
                >
                  <FormControlLabel
                    value="encontrado"
                    control={<Radio color="primary" />}
                    label="Encontrado"
                  />
                  <FormControlLabel
                    value="perdido"
                    control={<Radio color="primary" />}
                    label="Perdido"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>


            <Grid item sx={{ textAlign: 'center', mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SendIcon />}
              >
                Enviar reporte
              </Button>
            </Grid>
          </Box>
        </Card>
      </Grid>
      <Snackbar
        open={openModal}
        autoHideDuration={1000}
        onClose={() => setOpenModal(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenModal(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          ¡Gracias por reportar tu objeto perdido...! Tu reporte ha sido enviado
          con éxito
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default LandingPage;