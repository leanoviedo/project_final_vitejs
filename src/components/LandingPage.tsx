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
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import AirportServices from "../services/AirportServices";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from "dayjs";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { selectUserLogin } from "../redux/slices/UserLogin";
import { setlostObject } from "../redux/slices/lostObjectSlice";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "./CustomNavbar";
interface LostObject {
  country: string;
  city: string;
  airport: string;
  date: Dayjs | null;
  photo?: string;

}
const LandingPage = () => {
  const [lostObject, setLostObject] = useState<LostObject>({
    country: "",
    city: "",
    airport: "",
    date: null,
    photo: "",

  });


  const [submitted, setSubmitted] = useState(false);
  const [airportData, setAirportData] = useState<any[]>([]);
  const [cityData, setCityData] = useState<any[]>([]);
  const [countryData, setCountryData] = useState<any[]>([]);
  const userLogin = useAppSelector(selectUserLogin);
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("Fetching data...");
        const countries = await AirportServices.fetchCountries();
        // console.log("Fetched countries:", countries);
        setCountryData(countries);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setLostObject((prev) => ({
      ...prev, '${userInfo}': userLogin
    }));
  }, []);


  const handleAirportChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    // console.log("Airport selected:", value);

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
        // console.log(response.data.response);
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
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitting form with data:", lostObject);
    setSubmitted(true);
    dispatch(setlostObject(lostObject));
    setTimeout(function () {
      navigate("/FormLogin");
    }, 5000);
  };


  return (
    <Grid container alignContent="center"
      justifyContent="center"
      alignItems="center"
    >
      <CustomNavbar></CustomNavbar>
      {!submitted ? (
        <Grid item mt={5} >
          <Card sx={{ p: 3, boxShadow: 3 }}>
            <Typography variant="h4" align="center" marginBottom={4}>
              ¡Reporta tu objeto perdido!
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ borderColor: 'primary.main' }}>
              <Grid item marginTop={2}>
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

              <Grid item marginTop={2}>
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

              <Grid item marginTop={2}>
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
              <Grid item marginTop={2}>
                <DatePicker label="fecha de la perdida " value={lostObject.date} onChange={handleDateChange}
                  sx={{ width: '100%' }} />
              </Grid>
              <Grid item marginTop={2}>
                <FormControl fullWidth>
                  <TextField
                    required
                    fullWidth
                    id="photo"
                    label="foto"
                    name="photo"
                    value={lostObject.photo}
                    onChange={handlePhotoChange}
                  />
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
      ) : (
        <Typography variant="h5" align="center">
          ¡Gracias por reportar tu objeto perdido! Tu reporte ha sido enviado
          con éxito.
        </Typography>

      )}
    </Grid>
  );
};

export default LandingPage;
