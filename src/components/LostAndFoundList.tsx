import React, { useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
  CardHeader,
  styled,
} from "@mui/material";
import { useAppSelector } from "../redux/hooks";
import { selectLostObjects } from "../redux/slices/LostObjectSlice";
import CustomNavbar from "./CustomNavbar";
import { Link } from "react-router-dom";
import { selectUserLogin } from "../redux/slices/UserLogin";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,
}));

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

  const renderLostObject = (item: any) => (
    <Grid item xs={12} sm={6} md={4} key={item.id}>
      <StyledLink to={`/FoundObjects/${item.id}`}>
        <Card>
          <CardHeader title={item.description} />
          <CardContent sx={{ display: "flex", flexDirection: "row" }}>
            <div>
              <Typography variant="h5" color="textPrimary">
                Estado: {item.status}
              </Typography>
              <Typography variant="h5" color="textPrimary">
                Aeropuerto: {item.airport.name}
              </Typography>
              <Typography variant="h5" color="textPrimary">
                Dirección: {item.city.name} {item.country.name}
              </Typography>
              <Typography variant="h5" color="textPrimary">
                Nombre: {item.userReport.name.first} {item.userReport.name.last}
              </Typography>
              <Typography variant="h5" color="textPrimary">
                Email: {item.userReport.email}
              </Typography>
            </div>
            {item.photo && (
              <img
                src={item.photo}
                alt="Objeto perdido"
                style={{
                  marginLeft: "auto",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            )}
          </CardContent>
        </Card>
      </StyledLink>
    </Grid>
  );

  return (
    <Grid container>
      <CustomNavbar />
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Lista de reportes
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={2}>
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
          >
            <Tab label="Objetos Reportados" />
            <Tab label="Objetos Reclamados" />
          </Tabs>
          <Box role="tabpanel" hidden={tabValue !== 0}>
            <Grid container spacing={2} sx={{ flexWrap: "wrap" }}>
              {userReports.map(renderLostObject)}
            </Grid>
          </Box>
          <Box role="tabpanel" hidden={tabValue !== 1}>
            <Grid container spacing={2} sx={{ flexWrap: "wrap" }}>
              {userClaims.map(renderLostObject)}
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LostAndFoundList;
