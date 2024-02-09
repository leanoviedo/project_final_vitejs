import { useEffect, useState } from "react";
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
  styled,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Send as SendIcon, CloudUpload } from "@mui/icons-material";
import AirportServices from "../services/AirportServices";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch } from "../redux/hooks";
import CustomNavbar from "./CustomNavbar";
import { Country, City, Airport, UserData } from "../model/interface";
import { setLostObjectData } from "../redux/slices/LostObjectSlice";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
import { useFormik } from "formik";
import uploadImageToCloudinary from "../services/uploadImageToCloudinaryServices";

const errorStyles = {
  color: "red",
};
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const validationSchema = yup.object().shape({
  country: yup.object().shape({
    name: yup.string().required("Selecciona Pais obligatorio"),
  }),
  city: yup.object().shape({
    name: yup.string().required("Selecciona Ciudad obligatorio"),
  }),
  airport: yup.object().shape({
    name: yup.string().required("Selecciona Aeropuerto obligatorio"),
  }),
  date: yup.date().required("Establecer Fecha obligatorio"),
  description: yup.string().required("Establece Descripcion obligatorio"),
  photo: yup.string().required("Sube una Foto obligatorio"),
  type: yup.string().required("Selecciona Estado obligatorio"),
});

const LandingPage = () => {
  const [airportData, setAirportData] = useState<any[]>([]);
  const [cityData, setCityData] = useState<any[]>([]);
  const [countryData, setCountryData] = useState<any[]>([]);
  const [maxDate] = useState(dayjs());
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedAirport, setSelectedCAirport] = useState("");
  const [storedUser, setStoredUser] = useState<UserData | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      country: {
        name: "",
        code: "",
        code3: "",
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
      date: null as Dayjs | null,
      photo: "",
      type: "",
      status: "creado",
      id: uuidv4(),
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("onSubmit..");
      setOpenModal(true);
      resetFormFields();

      const selectData = {
        country: values.country,
        city: values.city,
        airport: values.airport,
        date: values.date ? values.date.toISOString() : null,
        photo: values.photo || "",
        description: values.description,
        type: values.type,
        status: values.status,
        id: uuidv4(),
        userReport: storedUser
          ? {
              name: {
                first: storedUser.name.first,
                last: storedUser.name.last,
              },
              location: {
                city: storedUser.location.city,
                state: storedUser.location.state,
                country: storedUser.location.country,
                postcode: storedUser.location.postcode,
                coordinates: {
                  latitude: storedUser.location.coordinates.latitude,
                  longitude: storedUser.location.coordinates.longitude,
                },
              },
              email: storedUser.email,
              login: storedUser.login,
              phone: storedUser.phone,
              cell: storedUser.cell,
              picture: storedUser.picture,
              password: storedUser.login.password,
            }
          : null,
      };
      console.log("Processed form data:", selectData);
      dispatch(setLostObjectData(selectData));
      console.log("guardado");
      setSelectedCountry("");
      setSelectedCity("");
      setSelectedCAirport("");
    },
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setStoredUser(parsedUserData);
    }
  }, []);
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

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    const conutrynew: Country = JSON.parse(JSON.stringify(value));
    setSelectedCountry(value);

    formik.setValues({
      ...formik.values,
      country: conutrynew,
    });

    AirportServices.fetchCitiesByCountry(conutrynew.code)
      .then((response) => {
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

    formik.setValues({
      ...formik.values,
      city: citynew,
    });

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
    const airportNew: Airport = JSON.parse(JSON.stringify(value));
    setSelectedCAirport(value);

    formik.setValues({
      ...formik.values,
      airport: airportNew,
    });
  };
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        const imageURL = await uploadImageToCloudinary(file);
        if (imageURL) {
          setImageUrl(imageURL);
          formik.setFieldValue("photo", imageURL);
        }
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }
  };

  const resetFormFields = () => {
    formik.resetForm();
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
      <Grid item mt={5} xs={12} sm={6} md={4}>
        <Card sx={{ p: 3, boxShadow: 3 }}>
          <Typography variant="h4" align="center" marginBottom={4}>
            ¡Reporta tu objeto perdido!
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ borderColor: "primary.main" }}
          >
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="country-label">País</InputLabel>
                <Select
                  labelId="country-select-label"
                  id="country-simple-select"
                  value={selectedCountry}
                  label="country"
                  onChange={handleCountryChange}
                  input={<OutlinedInput label="País" />}
                >
                  {countryData.map((country: any, index: number) => (
                    <MenuItem key={index} value={country}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={errorStyles}>
                  {formik.touched.country?.name && formik.errors.country?.name}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item marginTop={2} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="city-label">Ciudad</InputLabel>
                <Select
                  labelId="city-select-label"
                  id="city-simple-select"
                  value={selectedCity}
                  label="city"
                  onChange={handleCityChange}
                  input={<OutlinedInput label="Ciudad" />}
                  disabled={!selectedCountry}
                >
                  {cityData.map((city: any, index: number) => (
                    <MenuItem key={index} value={city}>
                      {city.name}
                    </MenuItem>
                  ))}
                </Select>

                <FormHelperText sx={errorStyles}>
                  {formik.touched.city?.name && formik.errors.city?.name}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item marginTop={2} xs={12}>
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
                  disabled={!selectedCity}
                >
                  {airportData.map((airport: any, index: number) => (
                    <MenuItem key={index} value={airport}>
                      {airport.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={errorStyles}>
                  {formik.touched.airport?.name && formik.errors.airport?.name}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item marginTop={2} xs={12}>
              <FormControl fullWidth>
                <DatePicker
                  label="Fecha de objeto encontrado /o pérdido"
                  value={formik.values.date || null}
                  onChange={(date) => formik.setFieldValue("date", date)}
                  maxDate={maxDate}
                  views={["year", "month", "day"]}
                  sx={{ width: "100%" }}
                />
                <FormHelperText sx={errorStyles}>
                  {formik.touched.date && formik.errors.date}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item marginTop={2} xs={12}>
              <FormControl fullWidth>
                <TextField
                  id="description"
                  name="description"
                  multiline
                  minRows={3}
                  variant="outlined"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Escriba la Descripción"
                />
                <FormHelperText sx={errorStyles}>
                  {formik.touched.description && formik.errors.description}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item marginTop={2} xs={12}>
              <FormControl fullWidth>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUpload />}
                >
                  {formik.isSubmitting ? "Cargando..." : "Subir foto"}
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleImageUpload}
                  />
                </Button>
                <Card sx={{ maxWidth: 550, margin: "auto", marginTop: 2 }}>
                  <CardContent>
                    {imageUrl ? (
                      <CardMedia
                        component="img"
                        src={imageUrl}
                        style={{
                          margin: "auto",
                          maxWidth: "100%",
                          height: "auto",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          display: "block",
                          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                        }}
                      />
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        align="center"
                      >
                        No hay foto subida...!!!
                      </Typography>
                    )}
                  </CardContent>
                </Card>

                <FormHelperText sx={errorStyles}>
                  {formik.touched.photo && formik.errors.photo}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid>
              <FormLabel component="legend">Estado</FormLabel>
              <FormControl
                component="fieldset"
                error={Boolean(formik.errors.type)}
              >
                <RadioGroup
                  aria-label="lostStatus"
                  name="type"
                  value={formik.values.type}
                  onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldValue("type", e.target.value);
                  }}
                >
                  <FormControlLabel
                    value="encontrado"
                    control={<Radio color="success" />}
                    label="Encontrado"
                  />
                  <FormControlLabel
                    value="perdido"
                    control={<Radio color="error" />}
                    label="Perdido"
                  />
                </RadioGroup>
                <FormHelperText sx={errorStyles}>
                  {formik.touched.type && formik.errors.type}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item sx={{ textAlign: "center", mt: 2 }}>
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
