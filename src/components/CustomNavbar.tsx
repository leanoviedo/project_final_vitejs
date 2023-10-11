import React, { useState } from "react";
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
    Grid,
} from "@mui/material";
import AirplanemodeActiveOutlinedIcon from "@mui/icons-material/AirplanemodeActiveOutlined";
import { Link } from "react-router-dom";
import {
    clearUserLogin,
    selectUserLogin,
} from "../redux/slices/UserLogin";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const CustomNavbar = () => {
    const loggedInUser = useAppSelector(selectUserLogin);
    const dispatch = useAppDispatch();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{ margin: 1, padding: 1 }}>
            <Toolbar>
                <IconButton edge="start" color="inherit">
                    <AirplanemodeActiveOutlinedIcon sx={{ fontSize: 40 }} />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Airport Missing Things (MYT)
                </Typography>
                <Grid
                    container
                    alignItems="center"
                    justifyContent="flex-end"
                    spacing={3}
                >
                    <Grid item >
                        <Button color="inherit" component={Link} to="/LandingPage">
                            Reportar objeto
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button color="inherit" component={Link} to="/LostObjectsDetails">
                            Objetos perdidos
                        </Button>
                    </Grid>
                    {loggedInUser && (
                        <Grid item>
                            <Box display="flex" alignItems="center">
                                <MenuItem>
                                    <Typography variant="body1" color="text.primary">
                                        {loggedInUser?.name.first} {loggedInUser?.name.last}
                                    </Typography>
                                    <Typography variant="body1" color="text.primary">
                                        {loggedInUser?.email}
                                    </Typography>
                                </MenuItem>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    
                                    <Avatar
                                        alt=""
                                        src={loggedInUser.picture?.large}
                                        sx={{ width: 56, height: 56, marginRight: 1 }}
                                    />

                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >

                                    <MenuItem
                                        onClick={() => {
                                            handleClose();
                                            dispatch(clearUserLogin());
                                        }}
                                        component={Link}
                                        to="/"
                                    >
                                        Cerrar Sesión
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default CustomNavbar;
