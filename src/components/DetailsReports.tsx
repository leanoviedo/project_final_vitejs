import React, { useRef, useState, useEffect } from "react";
import {
  Typography,
  Box,
  Card,
  Collapse,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  styled,
  ListItemText,
  Drawer,
  Divider,
  Avatar,
  ListItem,
  ListItemAvatar,
  Grid,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CustomNavbar from "./CustomNavbar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectUserLogin } from "../redux/slices/UserLogin";
import { markLostObjectAsClaimed } from "../redux/slices/LostObjectSlice";
import { DataToReclaim, ExpandMoreProps, Anchor } from "../model/interface";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GoogleMapReact from "google-map-react";
import CloseIcon from "@mui/icons-material/Close";

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginBottom: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

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

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [state, setState] = useState({
    left: false,
    right: false,
    top: false,
    bottom: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography variant="h6" component="h2" sx={{ textAlign: "center" }}>
        Ubicacion del Aeropuerto
      </Typography>
      <Button
        onClick={toggleDrawer(anchor, false)}
        color="warning"
        style={{ marginLeft: "auto" }}
      >
        <CloseIcon />
      </Button>
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
    </Box>
  );

  return (
    <>
      <CustomNavbar />
      <Typography variant="h4" align="center" gutterBottom>
        Detalle del reporte
      </Typography>
      {lostObject && (
        <>
          <CardMedia
            component="img"
            height="400"
            sx={{
              objectFit: "contain",
            }}
            image={lostObject.photo}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card elevation={3} sx={{ height: "100%" }}>
                <CardContent>
                  <Typography gutterBottom variant="h4">
                    Informacion del reporte
                  </Typography>
                  <Stack direction="column" spacing={1}>
                    <ListItemText
                      primary="Estado:"
                      secondary={
                        <React.Fragment>
                          <Typography
                            gutterBottom
                            sx={{ display: "inline" }}
                            component="span"
                            variant="h5"
                            color="text.primary"
                          >
                            {lostObject.status}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    <ListItemText
                      primary="Descripcion:"
                      secondary={
                        <React.Fragment>
                          <Typography
                            gutterBottom
                            sx={{ display: "inline" }}
                            component="span"
                            variant="h5"
                            color="text.primary"
                          >
                            {lostObject.description}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    <ListItemText
                      primary="Fecha de la Perdida:"
                      secondary={
                        <React.Fragment>
                          <Typography
                            gutterBottom
                            sx={{ display: "inline" }}
                            component="span"
                            variant="h5"
                            color="text.primary"
                          >
                            {newdate}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    <ListItemText
                      primary="Nombre del Aeropuerto:"
                      secondary={
                        <React.Fragment>
                          <Typography
                            gutterBottom
                            sx={{ display: "inline" }}
                            component="span"
                            variant="h5"
                            color="text.primary"
                          >
                            {lostObject.airport.name}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    <ListItemText
                      primary="ciudad:"
                      secondary={
                        <React.Fragment>
                          <Typography
                            gutterBottom
                            sx={{ display: "inline" }}
                            component="span"
                            variant="h5"
                            color="text.primary"
                          >
                            {lostObject.city.name}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    <ListItemText
                      primary="Pais:"
                      secondary={
                        <React.Fragment>
                          <Typography
                            gutterBottom
                            sx={{ display: "inline" }}
                            component="span"
                            variant="h5"
                            color="text.primary"
                          >
                            {lostObject.country.name}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card elevation={3} sx={{ height: "100%" }}>
                <CardContent>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        src={lostObject.userReport?.picture.large}
                        alt="fotografía de la persona del reporte"
                        sx={{ width: 150, height: 150 }}
                      />
                    </ListItemAvatar>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        padding: 1,
                        display: "inline",
                      }}
                    >
                      {`${lostObject.userReport?.name.first} ${lostObject.userReport?.name.last}`}

                      <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </Typography>
                  </ListItem>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <ListItemText
                        primary="Email"
                        secondary={
                          <React.Fragment>
                            <Typography
                              gutterBottom
                              sx={{ display: "inline" }}
                              component="span"
                              variant="h6"
                              color="text.primary"
                            >
                              {lostObject.userReport?.email}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                      <ListItemText
                        primary="numero de contacto"
                        secondary={
                          <React.Fragment>
                            <Typography
                              gutterBottom
                              sx={{ display: "inline" }}
                              component="span"
                              variant="h5"
                              color="text.primary"
                            >
                              {lostObject.userReport?.phone}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                      <ListItemText
                        primary="Direccion de domicilio "
                        secondary={
                          <React.Fragment>
                            <Typography
                              gutterBottom
                              sx={{ display: "inline" }}
                              component="span"
                              variant="h6"
                              color="text.primary"
                            >
                              {`${lostObject.userReport?.location.city}, ${lostObject.userReport?.location.country} ${lostObject.userReport?.location.state}`}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                      <ListItemText
                        primary="Codigo postal"
                        secondary={
                          <React.Fragment>
                            <Typography
                              gutterBottom
                              sx={{ display: "inline" }}
                              component="span"
                              variant="h6"
                              color="text.primary"
                            >
                              {lostObject.userReport?.location.postcode}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </CardContent>
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {(["bottom"] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                  <Button
                    onClick={toggleDrawer(anchor, true)}
                    variant="contained"
                    sx={{ textAlign: "center" }}
                  >
                    Ver ubicación del Aeropuerto
                  </Button>

                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </React.Fragment>
              ))}
            </div>
          </CardContent>
          <CardActions disableSpacing>
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
          </CardActions>

          <Box
            component="img"
            sx={{
              height: "70%",
              width: "30vh",
              display: "block",
              margin: "auto",
              objectFit: "cover",
            }}
          />

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
