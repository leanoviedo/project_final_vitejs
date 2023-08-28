import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AirplanemodeActiveOutlinedIcon from '@mui/icons-material/AirplanemodeActiveOutlined';
import { Link } from 'react-router-dom';
import { Avatar, FormGroup, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { clearUserLogin, selectUserLogin } from '../redux/slices/UserLogin';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const CustomNavbar = () => {

    const loggedInUser = useAppSelector(selectUserLogin);
    const dispatch = useAppDispatch()

    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <FormGroup onChange={handleChange}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 1 }}
                        href="/"
                    >
                        <AirplanemodeActiveOutlinedIcon sx={{ fontSize: 40 }} />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Airport Missing Things (MYT)
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>

                        <Button color="inherit" component={Link} to="/">
                            Inicio
                        </Button>
                        <Button color="inherit" component={Link} to="/LandingPage">
                            reportar objeto
                        </Button>
                        <Button color="inherit" component={Link} to="/LostObjectsDetails">
                            Objetos perdidos
                        </Button>
                        {auth && loggedInUser && (
                            <div>
                                <Box sx={{ marginLeft: 2 }}>
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        color="inherit"
                                    >
                                        <Typography variant="body1" color="text.primary">
                                            {loggedInUser?.first} {loggedInUser?.last}
                                        </Typography>

                                        <Avatar
                                            alt=""
                                            src={loggedInUser.picture?.large}
                                            sx={{ ml: 1, width: 56, height: 56 }}
                                        />

                                    </IconButton>
                                </Box>

                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >

                                    <MenuItem onClick={handleClose}><Typography variant="body1" color="text.primary">{loggedInUser?.email}</Typography></MenuItem>
                                    <MenuItem onClick={() => {
                                        handleClose();
                                        dispatch(clearUserLogin());
                                    }} component={Link} to="/">Cerrar Sesión</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Box>
                </Toolbar>
            </FormGroup>
        </AppBar>
    );
};

export default CustomNavbar;
