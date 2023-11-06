import React, { useState } from "react";
import {
  Typography,
  ListItem,
  ListItemText,
  ListItemIcon,
  CardMedia,
  Grid,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import { useAppSelector } from "../redux/hooks";
import { selectLostObjects } from "../redux/slices/lostObjectSlice";
import CustomNavbar from "./CustomNavbar";
import { Link } from "react-router-dom";
import { selectUserLogin } from "../redux/slices/UserLogin";

const LostAndFoundList = () => {
  const lostObjects = useAppSelector(selectLostObjects);
  const loggedInUser = useAppSelector(selectUserLogin);

  const userReports = lostObjects.filter(
    (item) => item.userReport?.email === loggedInUser?.email
  );

  const userClaims = lostObjects.filter(
    (item) => item.userReclamed?.email === loggedInUser?.email
  );

  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Grid container spacing={3}>
        <CustomNavbar />
        <Grid item xs={12}>
          <Typography variant="h5" component="h1" gutterBottom align="center">
            Lista de reportes
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={2}>
            <Tabs
              value={tabValue}
              onChange={handleChangeTab}
              centered
              TabIndicatorProps={{
                style: { background: tabValue === 0 ? "green" : "red" },
              }}
            >
              <Tab
                label="Objetos Reportados"
                style={{ color: tabValue === 0 ? "green" : "black" }}
              />
              <Tab
                label="Objetos Reclamados"
                style={{ color: tabValue === 1 ? "red" : "black" }}
              />
            </Tabs>
            {tabValue === 0 ? (
              <Grid container spacing={2}>
                {userReports.map((item, index) => (
                  <Grid item xs={6} key={index}>
                    <Link
                      to={`/FoundObjects/${item.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <ListItem alignItems="flex-start">
                        <ListItemIcon>
                          <CardMedia
                            component="img"
                            alt="Objeto perdido"
                            height="100"
                            image={item.photo}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            item.status === "encontrado"
                              ? "Encontrado"
                              : "Perdido"
                          }
                          secondary={
                            <>
                              <Typography variant="body2" color="textPrimary">
                                <strong>Descripción:</strong> {item.description}
                              </Typography>
                              <Typography variant="body2" color="textPrimary">
                                <strong>Aeropuerto:</strong> {item.airport.name}
                              </Typography>
                              <Typography variant="body2" color="textPrimary">
                                <strong>Lugar:</strong> {item.city.name}{" "}
                                {item.country.name}
                              </Typography>
                              <Typography variant="body2" color="textPrimary">
                                <strong>Nombre:</strong>{" "}
                                {item.userReport?.name.first},{" "}
                                {item.userReport?.name.last}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Grid container spacing={2}>
                {userClaims.map((item, index) => (
                  <Grid item xs={6} key={index}>
                    <Link
                      to={`/FoundObjects/${item.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <ListItem alignItems="flex-start">
                        <ListItemIcon>
                          <CardMedia
                            component="img"
                            alt="Objeto perdido"
                            height="100"
                            image={item.photo}
                            sx={{ padding: 2 }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            item.status === "encontrado"
                              ? "Encontrado"
                              : "Perdido"
                          }
                          secondary={
                            <>
                              <Typography variant="body2" color="textPrimary">
                                <strong>Descripción:</strong> {item.description}
                              </Typography>
                              <Typography variant="body2" color="textPrimary">
                                <strong>Aeropuerto:</strong> {item.airport.name}
                              </Typography>
                              <Typography variant="body2" color="textPrimary">
                                <strong>Lugar:</strong> {item.city.name}{" "}
                                {item.country.name}
                              </Typography>
                              <Typography variant="body2" color="textPrimary">
                                <strong>Nombre:</strong>{" "}
                                {item.userReport?.name.first},{" "}
                                {item.userReport?.name.last}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default LostAndFoundList;
