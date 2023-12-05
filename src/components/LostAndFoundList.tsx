import React, { useEffect, useState } from "react";
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
import { UserData } from "../model/interface";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,
}));

const LostAndFoundList = () => {
  const lostObjects = useAppSelector(selectLostObjects);
  const [storedUser, setStoredUser] = useState<UserData | null>(null);
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

  const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const renderLostObject = (item: any) => (
    <Grid item xs={12} sm={6} md={4} key={item.id}>
      <StyledLink
        to={`/FoundObjects/${item.id}`}
        style={{ textDecoration: "none" }}
      >
        <Card sx={{ height: "100%" }}>
          <CardHeader title={item.description} />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: { xs: "column-reverse", sm: "row" },
              alignItems: "center",
            }}
          >
            {item.photo && (
              <img
                src={item.photo}
                alt="Objeto perdido"
                style={{
                  width: "100%",
                  height: "auto",
                  marginBottom: 2,
                  padding:10,
                  margin:10,
                }}
              />
            )}
            <div>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                Estado: {item.status}
              </Typography>
              <Typography variant="body1" color="textPrimary" gutterBottom>
                Aeropuerto: {item.airport.name}
              </Typography>
              <Typography variant="body1" color="textPrimary" gutterBottom>
                Dirección: {item.city.name} {item.country.name}
              </Typography>
              <Typography variant="body1" color="textPrimary" gutterBottom>
                Nombre: {item.userReport.name.first} {item.userReport.name.last}
              </Typography>
              <Typography variant="body1" color="textPrimary" gutterBottom>
                Email: {item.userReport.email}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </StyledLink>
    </Grid>
  );

  return (
    <Grid container spacing={2}>
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
