import React from "react";
import {
  Typography,
  ListItem,
  ListItemText,
  ListItemIcon,
  CardMedia,
  Grid,
  Paper,
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
    (report) => report.userReport?.email === loggedInUser?.email
  );
  return (
    <Grid container spacing={3}>
      <CustomNavbar></CustomNavbar>
      <Grid item xs={12}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Lista de reportes
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {userReports.length === 0 ? (
          <Grid container alignItems="center" justifyContent="center">
            <Typography variant="h6">No hay datos disponibles.</Typography>
          </Grid>
        ) : (
          <Paper elevation={2}>
            <Grid container spacing={2}>
              {userReports.map((item, index) => (
                <Grid item xs={6} key={index}>
                  <Link
                    to={`/FoundObjects/`}
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
                          <React.Fragment>
                            <Typography variant="body2" color="textPrimary">
                              <strong>Descripción:</strong> {item.description}
                            </Typography>
                            <Typography variant="body2" color="textPrimary">
                              <strong>Aeropuerto:</strong> {item.airport?.name}
                            </Typography>
                            <Typography variant="body2" color="textPrimary">
                              <strong>Lugar:</strong> {item.city?.name}{" "}
                              {item.country?.name}
                            </Typography>
                            <Typography variant="body2" color="textPrimary">
                              <strong>Nombre: </strong>{" "}
                              {item.userReport?.name.first},{" "}
                              {item.userReport?.name.last}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};

export default LostAndFoundList;