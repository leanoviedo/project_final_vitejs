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
  TextareaAutosize,
  Dialog,
  DialogActions,
  DialogContent,
  FormHelperText,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import AirportServices from "../services/AirportServices";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch } from "../redux/hooks";
import LostObject, { setLostObjectData } from "../redux/slices/lostObjectSlice"
import CustomNavbar from "./CustomNavbar";

interface LostObject {
  country: string;
  city: string;
  airport: string;
  description: string,
  date: Dayjs | null;
  photo?: string;

}

const errorStyles = {
  color: "red",
};

const LandingPage = () => {
  const [lostObject, setLostObject] = useState<LostObject>({
    country: "",
    city: "",
    airport: "",
    description: "",
    date: null,
    photo: "",

  });
  const [airportData, setAirportData] = useState<any[]>([]);
  const [cityData, setCityData] = useState<any[]>([]);
  const [countryData, setCountryData] = useState<any[]>([]);
  const [startDate] = useState(dayjs('2023-01-01'));
  const [endDate] = useState(dayjs());
  const [countryError, setCountryError] = useState("");
  const [cityError, setCityError] = useState("");
  const [airportError, setAirportError] = useState("");
  const [dateError, setDateError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [photoError, setPhotoError] = useState("");

  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countries = await AirportServices.fetchCountries();
        setCountryData(countries);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalMessage("");
  };

  const handleAirportChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;

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
        const airportsByCities = response.data.response;
        setAirportData(airportsByCities);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;

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
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setLostObject((prev) => ({
      ...prev,
      description: newValue,
    }));
  };

  const handleDateChange = (date: Dayjs | null) => {
    setLostObject((prev) => ({
      ...prev,
      date: date,
    }));
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLostObject({ ...lostObject, [event.target.name]: event.target.value });
    console.log(event.target.value)
  };
  const resetFormFields = () => {
    setLostObject({
      country: "",
      city: "",
      airport: "",
      description: "",
      date: null,
      photo: "",
    });
    setCountryError("");
    setCityError("");
    setAirportError("");
    setDateError("");
    setDescriptionError("");
    setPhotoError("");
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

    if (!lostObject.country) {
      setCountryError("Campo obligatorio");
      hasErrors = true;
    }

    if (!lostObject.city) {
      setCityError("Campo obligatorio");
      hasErrors = true;
    }
    if (!lostObject.airport) {
      setAirportError("Campo obligatorio");
      hasErrors = true;
    }
    if (!lostObject.date) {
      setDateError("campo obligatorio")
      hasErrors = true
    }
    if (!lostObject.description) {
      setDescriptionError("Campo obligatorio");
      hasErrors = true;
    } if (!lostObject.photo) {
      setPhotoError("Campo obligatorio");
      hasErrors = true;
    }
    if (hasErrors) {
      return;
    }
    setOpenModal(true);
    setModalMessage(" ¡Gracias por reportar tu objeto perdido...! Tu reporte ha sido enviado con éxito");

    resetFormFields();
    const selectedCountry = countryData.find((country: any) => country.code === lostObject.country);
    const selectedCity = cityData.find((city: any) => city.city_code === lostObject.city);
    const selectedAirport = airportData.find((airport: any) => airport.name === lostObject.airport);

    const selectData = {
      country: selectedCountry,
      city: selectedCity,
      airport: selectedAirport || null,
      photo: lostObject.photo,
      date: lostObject.date ? lostObject.date.format("YYYY-MM-DD") : null,
      description: lostObject.description
    };

    dispatch(setLostObjectData(selectData));
  };

  return (
    <Grid container alignContent="center"
      justifyContent="center"
      alignItems="center"
    >
      <CustomNavbar></CustomNavbar>
      <Grid item mt={5} >
        <Card sx={{ p: 3, boxShadow: 3 }}>
          <Typography variant="h4" align="center" marginBottom={4}>
            ¡Reporta tu objeto perdido!
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ borderColor: 'primary.main' }}>
            <Grid item marginTop={2}>
              <FormControl fullWidth >
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
                <FormHelperText sx={errorStyles}>{countryError}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item marginTop={2}>
              <FormControl fullWidth >
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
                <FormHelperText sx={errorStyles}> {cityError}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item marginTop={2}>
              <FormControl fullWidth >
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
                <FormHelperText sx={errorStyles}>{airportError}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item marginTop={2}>
              <DatePicker
                label="Fecha de la perdida"
                value={lostObject.date}
                onChange={handleDateChange}
                minDate={startDate}
                maxDate={endDate}
                views={['day', 'month', 'year',]}
                format="DD-MM-YYYY"
                sx={{ width: '100%' }}
              />
              <FormHelperText sx={errorStyles}>{dateError}</FormHelperText>
            </Grid>
            <Grid item marginTop={2}>
              <FormControl fullWidth >
                <TextareaAutosize
                  id="description"
                  name="description"
                  value={lostObject.description}
                  onChange={handleDescriptionChange}
                  minRows={3}
                  aria-label="Demo input"
                  placeholder="Escriba la Descripción"

                />
                <FormHelperText sx={errorStyles}>{descriptionError}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item marginTop={2}>
              <FormControl fullWidth>
                <TextField

                  fullWidth
                  id="photo"
                  label="Foto"
                  name="photo"
                  value={lostObject.photo}
                  onChange={handlePhotoChange}

                />
                <FormHelperText sx={errorStyles}>{photoError}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SendIcon />}
                sx={{ mt: 2, ml: 15 }}
              >
                Enviar reporte
              </Button>
            </Grid>
          </Box>
        </Card>
      </Grid>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogContent>
          <Typography variant="h5" align="center" sx={{ marginTop: 5 }}>
            {modalMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Grid >
  );
};

export default LandingPage;
