import { useRef, useState, useEffect } from "react";
import {
  Typography,
  Avatar,
  Box,
  Grid,
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CustomNavbar from "./CustomNavbar";
import GoogleMapReact from "google-map-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectUserLogin } from "../redux/slices/UserLogin";
import { markLostObjectAsClaimed } from "../redux/slices/LostObjectSlice";
import { DataToReclaim } from "../model/interface";

const DetailsReports = () => {
  const ubicacion = useLocation();
  const { lostObject, newdate } = ubicacion.state.data || {};
  const userLogin = useAppSelector(selectUserLogin);
  const dispatch = useAppDispatch();
  const isCurrentUserOwner =
    lostObject &&
    lostObject.userReport &&
    userLogin &&
    userLogin.email === lostObject.userReport.email;

  const [airportCoordinate, setAirportCoordinate] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });

  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const infoWindowRef = useRef<any>(null);

  const handleAddressDataReceived = () => {
    if (lostObject && lostObject.airport) {
      const lat = lostObject.airport.lat || 0;
      const lng = lostObject.airport.lng || 0;
      setAirportCoordinate({ lat, lng });
    }
  };

  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    handleAddressDataReceived();
  }, [lostObject]);

  const maprender = (map: any, maps: any) => {
    mapRef.current = map;
    if (maps && airportCoordinate) {
      markerRef.current = new maps.Marker({
        position: airportCoordinate,
        map,
      });

      infoWindowRef.current = new maps.InfoWindow({
        content: `<h3>${lostObject?.airport?.name}</h3>`,
      });

      markerRef.current.addListener("click", () => {
        infoWindowRef.current.open(map, markerRef.current);
      });
    }
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
    if (lostObject && !isCurrentUserOwner) {
      if (
        lostObject.status === "reclamado" ||
        lostObject.status === "enviado" ||
        lostObject.status === "finalizado"
      ) {
        console.log(
          "Este objeto ya ha sido reclamado o tiene un estado final."
        );
      } else {
        const dataToReclaim: DataToReclaim = {
          userReclamed: dataReclamed.userRelamed!,
          idLostObject: lostObject.id,
          status: "",
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
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{
          textDecoration: "underline",
          textDecorationStyle: "unset",
          textDecorationColor: "#1976d2",
        }}
      >
        Detalle del reporte
      </Typography>
      {lostObject && (
        <>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="success"
              fullWidth
              disabled={
                isCurrentUserOwner === true ||
                lostObject.status === "finalizado" ||
                lostObject.status === "reclamado" ||
                lostObject.status === "enviado"
              }
              onClick={handleOpenDialog}
            >
              Reclamar
            </Button>
          </Grid>
          <Box
            component="img"
            sx={{
              height: "70%",
              width: "30vh",
              display: "block",
              margin: "auto",
              objectFit: "cover",
            }}
            src={lostObject.photo}
            alt="objeto perdido"
          />
          <Grid container item>
            <Grid item xs={12} sm={6} md={4}>
              <Stack direction="column" spacing={1}>
                <Typography variant="h5">
                  <strong>Estado:</strong> {lostObject.status}
                </Typography>
                <Typography variant="h5">
                  <strong>Descripción:</strong> {lostObject.description}
                </Typography>
                <Typography variant="h5">
                  <strong>Aeropuerto:</strong> {lostObject.airport.name}
                </Typography>
                <Typography variant="h5">
                  <strong>País:</strong> {lostObject.country.name}
                </Typography>
                <Typography variant="h5">
                  <strong>Ciudad:</strong> {lostObject.city.name}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  <strong>Fecha:</strong> {newdate}
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Stack direction="column" spacing={1}>
              <Avatar
                src={lostObject.userReport?.picture.large}
                alt="fotografía de la persona del reporte"
                sx={{
                  width: 150,
                  height: 150,
                  display: "flex",
                  alignSelf: "center",
                }}
              />
              <Typography variant="h5">
                <strong>Nombre:</strong>{" "}
                {`${lostObject.userReport?.name.first} ${lostObject.userReport?.name.last}`}
              </Typography>
              <Typography variant="h5">
                <strong>Email:</strong> {lostObject.userReport?.email}
              </Typography>
              <Typography variant="h5">
                <strong>Teléfono:</strong> {lostObject.userReport?.phone}
              </Typography>
              <Typography variant="h5">
                <strong>Dirección de domicilio:</strong>{" "}
                {`${lostObject.userReport?.location.city}, ${lostObject.userReport?.location.country} ${lostObject.userReport?.location.state}`}
              </Typography>
              <Typography variant="h5">
                <strong>Código postal:</strong>{" "}
                {lostObject.userReport?.location.postcode}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h4"
              component="h1"
              align="center"
              gutterBottom
              sx={{
                textDecoration: "underline",
                textDecorationStyle: "unset",
                textDecorationColor: "#1976d2",
              }}
            >
              Ubicación del Aeropuerto
            </Typography>
            <div style={{ height: "55 vh", width: "100%" }}>
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
          <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>Confirmar reclamo</DialogTitle>
            <DialogContent>
              <DialogContentText>
                ¿Estás seguro de que quieres reclamar este objeto?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} variant="text" color="error">
                Cancelar
              </Button>
              <Button
                onClick={handleConfirmReclamar}
                variant="text"
                color="success"
              >
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
};
export default DetailsReports;
