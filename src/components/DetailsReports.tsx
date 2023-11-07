import { useRef, useState, useEffect } from "react";
import {
  Typography,
  Avatar,
  Box,
  Grid,
  Paper,
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CustomNavbar from "./CustomNavbar";
import GoogleMapReact from "google-map-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectUserLogin } from "../redux/slices/UserLogin";
import { markLostObjectAsClaimed } from "../redux/slices/lostObjectSlice";
import { DataToReclaim } from "../model/interface";
const DetailsReports = () => {
  const ubicacion = useLocation();
  const { lostObject, newdate } = ubicacion.state.data || {};
  const userLogin = useAppSelector(selectUserLogin);
  const dispatch = useAppDispatch();
  const isCurrentUserOwner =
    userLogin && userLogin.email === lostObject.userReport.email;

  const [airportCoordinate, setAirportCoordinate] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });

  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const infoWindowRef = useRef<any>(null);

  const handleAddressDataReceived = () => {
    const lat = lostObject.airport.lat;
    const lng = lostObject.airport.lng;
    setAirportCoordinate({ lat, lng });
  };
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    handleAddressDataReceived();
  }, []);

  const maprender = (map: any, maps: any) => {
    mapRef.current = map;
    markerRef.current = new maps.Marker({
      position: airportCoordinate,
      map,
    });

    infoWindowRef.current = new maps.InfoWindow({
      content: `<h3>${lostObject.airport.name}</h3>`,
    });

    markerRef.current.addListener("click", () => {
      infoWindowRef.current.open(map, markerRef.current);
    });
  };

  const navigate = useNavigate();
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmReclamar = () => {
    const dataReclamed = {
      userRelamed: userLogin,
    };

    if (!isCurrentUserOwner) {
      if (lostObject.status === "reclamado") {
        console.log("Ya reclamaste este objeto.");
      } else {
        const dataToReclaim: DataToReclaim = {
          userReclamed: dataReclamed.userRelamed!,
          idLostObject: lostObject.id,
        };
        dispatch(markLostObjectAsClaimed(dataToReclaim));
        navigate(`/FoundObjects/${lostObject.id}`, { state: lostObject.id });

        handleCloseDialog();
      }
    }
  };
  return (
    <>
      <CustomNavbar />
      <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>
        Detalle del reporte
      </Typography>
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      {lostObject && (
        <Paper elevation={1} sx={{ padding: 2 }}>
          <Grid style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              color="success"
              variant="contained"
              disabled={
                isCurrentUserOwner === true || lostObject.status === "reclamado"
              }
              style={{ marginLeft: "auto" }}
              onClick={handleOpenDialog}
            >
              Reclamar
            </Button>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4} p={2}>
              <Box>
                <Typography variant="body2">
                  <strong>objeto:</strong> {lostObject.status}
                </Typography>
                <Typography variant="body2">
                  <strong>Descripción:</strong> {lostObject.description}
                </Typography>
                <Typography variant="body2">
                  <strong>Aeropuerto:</strong> {lostObject.airport.name}
                </Typography>
                <Typography variant="body2">
                  <strong>País:</strong> {lostObject.country.name}
                </Typography>
                <Typography variant="body2">
                  <strong>Ciudad:</strong> {lostObject.city.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Fecha:</strong> {newdate}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box>
                <img
                  src={lostObject.photo}
                  alt="objeto perdido"
                  style={{
                    width: "100%",
                    maxWidth: "200px",
                    height: "auto",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Box>
                <Typography variant="body2">
                  <strong>Nombre:</strong> {lostObject.userReport?.name.first}{" "}
                  {lostObject.userReport?.name.last}
                </Typography>
                <Typography variant="body2">
                  <strong>Email:</strong> {lostObject.userReport?.email}
                </Typography>
                <Typography variant="body2">
                  <strong>Teléfono:</strong> {lostObject.userReport?.phone}
                </Typography>
                <Typography variant="body2">
                  <strong>Dirección de domicilio:</strong>{" "}
                  {lostObject.userReport?.location.city}{" "}
                  {lostObject.userReport?.location.country} <i>Estado</i>{" "}
                  {lostObject.userReport?.location.state}
                </Typography>
                <Typography variant="body2">
                  <strong>Código postal:</strong>{" "}
                  {lostObject.userReport?.location.postcode}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box>
                <Avatar
                  src={lostObject.userReport?.picture.large}
                  alt="fotografía de la persona del reporte"
                  sx={{ width: "100%", maxWidth: "200px", height: "auto" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirmar reclamo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que quieres reclamar este objeto?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="outlined" color="error">
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmReclamar}
            variant="outlined"
            color="success"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h6" component="h2" sx={{ textAlign: "center" }}>
            ubicacion del Aeropuerto
          </Typography>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <div style={{ height: "60vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyDMVoFJqQljWVR7J2d4_ElY4oTe2wa5ygQ",
              }}
              center={airportCoordinate}
              defaultZoom={15}
              yesIWantToUseGoogleMapApiInternals={true}
              onGoogleApiLoaded={({ map, maps }) => maprender(map, maps)}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default DetailsReports;
