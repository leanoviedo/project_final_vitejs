import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  Snackbar,
  Alert,
  Badge,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectLostObjects } from "../redux/slices/LostObjectSlice";
import CustomNavbar from "./CustomNavbar";
import { useNavigate } from "react-router-dom";
import { UserData, LostObjectData } from "../model/interface";
import { markMessageAsRead, selectMenssage } from "../redux/slices/ChatSlices";
import MailIcon from "@mui/icons-material/Mail";

const LostAndFoundList = () => {
  const lostObjects = useAppSelector(selectLostObjects);
  const [storedUser, setStoredUser] = useState<UserData | null>(null);
  const navigate = useNavigate();
  const messageData = useAppSelector(selectMenssage);
  const dispatch = useAppDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [messageNotice, setmessageNotice] = useState("");
  const [newMessagesObjects, setNewMessagesObjects] = useState<string[]>([]);
  const [hasNewMessages, setHasNewMessages] = useState(false); // Variable para controlar si hay nuevos mensajes

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setStoredUser(parsedUserData);
    }
  }, []);

  useEffect(() => {
    const newMessages = messageData.filter(
      (message) =>
        message.messageRead === false &&
        message.user.email !== storedUser?.email
    );

    const newMessagesIds = newMessages.map((message) => message.lostObjectId);
    setNewMessagesObjects(newMessagesIds.filter((id): id is string => !!id));
    const hasNewMessagesForAnyObject = newMessagesIds.length > 0;
    setHasNewMessages(hasNewMessagesForAnyObject); 
    if (hasNewMessagesForAnyObject && !snackbarOpen) {
      console.log("Abriendo Snackbar...");
      setmessageNotice("¡Tienes un nuevo mensaje!");
      setSnackbarOpen(true);
      handleCloseSnackbar();
    } else if (!hasNewMessagesForAnyObject && snackbarOpen) {
      console.log("Cerrando Snackbar...");
    }
  }, [messageData, storedUser, snackbarOpen]);

  const handleLinkClick = (item: LostObjectData) => {
    console.log("Se hizo clic en un objeto:", item);
    if (item.status !== "reclamado") {
      console.log("Reporte No Reclamado:", item);
      setSnackbarMessage("Reporte No Reclamado...!!!");
      setSnackbarOpen(true);
      dispatch(markMessageAsRead(item.id));
    } else {
      setNewMessagesObjects(
        newMessagesObjects.filter((objectId) => objectId !== item.id)
      );
      navigate(`/FoundObjects/${item.id}`);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    dispatch(markMessageAsRead);
  };

  const renderLostObject = (item: LostObjectData) => {
    const hasUnreadMessages = messageData.some(
      (message) =>
        message.lostObjectId === item.id &&
        message.messageRead === false &&
        message.user.email !== storedUser?.email
    );
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardActionArea
            onClick={() => handleLinkClick(item)}
            disabled={
              newMessagesObjects.includes(item.id) !== hasUnreadMessages
            }
          >
            <Box mt={1}>
              {newMessagesObjects.includes(item.id) && (
                <Badge
                  badgeContent="Nuevo"
                  color="secondary"
                  sx={{ position: "absolute", top: 20, right: 20 }}
                  component="span"
                >
                  <MailIcon color="info" />
                </Badge>
              )}
            </Box>
            <CardHeader title={item.description} />
            <CardContent
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
              }}
            >
              {item.photo && (
                <img
                  src={item.photo}
                  alt="Objeto perdido"
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    marginBottom: "10px",
                    objectFit: "contain",
                  }}
                />
              )}
              <div>
                <Typography variant="body1" color="textPrimary" gutterBottom>
                  <strong>Estado:</strong> {item.status}
                </Typography>
                <Typography variant="body1" color="textPrimary" gutterBottom>
                  <strong>Aeropuerto:</strong> {item.airport.name}
                </Typography>
                <Typography variant="body1" color="textPrimary" gutterBottom>
                  <strong>Dirección:</strong> {item.city.name},{" "}
                  {item.country.name}
                </Typography>
                <Typography variant="body1" color="textPrimary" gutterBottom>
                  <strong>Nombre:</strong> {item.userReport?.name.first}{" "}
                  {item.userReport?.name.last}
                </Typography>
                <Typography variant="body1" color="textPrimary" gutterBottom>
                  <strong>Email:</strong> {item.userReport?.email}
                </Typography>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  };

  const userReports = lostObjects.filter(
    (item) => item.userReport?.email === storedUser?.email
  );
  const userClaims = lostObjects.filter(
    (item) => item.userReclamed?.email === storedUser?.email
  );

  const [tabValue, setTabValue] = useState(0);
  return (
    <Grid container spacing={2}>
      <CustomNavbar />
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Lista de reportes
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Tabs
          selectionFollowsFocus
          value={tabValue}
          onChange={(_event, newValue) => setTabValue(newValue)}
          variant="fullWidth"
          aria-label="basic tabs example"
        >
          <Tab label="Objetos Reportados" />
          <Tab label="Objetos Reclamados" />
        </Tabs>
        <Box hidden={tabValue !== 0}>
          <Grid container spacing={2} sx={{ flexWrap: "wrap" }}>
            {userReports.map(renderLostObject)}
          </Grid>
        </Box>
        <Box hidden={tabValue !== 1}>
          <Grid container spacing={2}>
            {userClaims.map(renderLostObject)}
          </Grid>
        </Box>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} sx={{ width: "100%" }}>
          {snackbarMessage}
          {hasNewMessages && messageNotice} {/* Utiliza hasNewMessages aquí */}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default LostAndFoundList;
