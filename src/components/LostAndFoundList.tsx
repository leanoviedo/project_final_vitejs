import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { useAppSelector } from "../redux/hooks";
import { selectLostObjects } from "../redux/slices/LostObjectSlice";
import CustomNavbar from "./CustomNavbar";
import { useNavigate } from "react-router-dom";
import { UserData } from "../model/interface";

const LostAndFoundList = () => {
  const lostObjects = useAppSelector(selectLostObjects);
  const [storedUser, setStoredUser] = useState<UserData | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setStoredUser(parsedUserData);
    }
  }, []);

  const userReports = lostObjects.filter(
    (item) => item.userReport?.email === storedUser?.email
  );

  const userClaims = lostObjects.filter(
    (item) => item.userReclamed?.email === storedUser?.email
  );

  const [tabValue, setTabValue] = useState(0);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLinkClick = (item: any) => {
    if (item.status !== "reclamado") {
      setSnackbarMessage("Reporte No Reclamado...!!!");
      setSnackbarOpen(true);
    } else {
      setTimeout(function () {
        navigate(`/FoundObjects/${item.id}`);
      }, 1000);
      setSnackbarMessage(" Reporte Reclamado...!!!");
      setSnackbarOpen(true);
    }
  };

  const renderLostObject = (item: any) => {
    const isClaimed = item.status === "reclamado";

    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardActionArea onClick={() => handleLinkClick(item)}>
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
                  <strong>Nombre:</strong> {item.userReport.name.first}{" "}
                  {item.userReport.name.last}
                </Typography>
                <Typography variant="body1" color="textPrimary" gutterBottom>
                  <strong>Email:</strong> {item.userReport.email}
                </Typography>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={isClaimed ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Grid>
    );
  };

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
          onChange={handleChangeTab}
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
    </Grid>
  );
};

export default LostAndFoundList;
