import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import CustomNavbar from "./CustomNavbar";
import { useAppSelector } from "../redux/hooks";
import dayjs from "dayjs";

const LostObjectDetails: React.FC = () => {
    const value = useAppSelector((state) => state.lostObject)
    
    return (
        <>
            <CustomNavbar />
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12} md={6}>
                    <Typography variant="h3" sx={{ textAlign: "center", marginBottom: 3 }}>
                        Lost Object Details
                    </Typography>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                <img src={value.lostObject?.photo} alt="Lost Object" width="50%" />
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Descripción:</strong> {value.lostObject?.description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>País:</strong> {value.lostObject?.country.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Ciudad:</strong> {value.lostObject?.city.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Aeropuerto:</strong> {value.lostObject?.airport.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Fecha:</strong> {""}
                                {value.lostObject?.date ? dayjs(value.lostObject.date).format("YYYY-MM-DD") : "N/A"}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default LostObjectDetails;
