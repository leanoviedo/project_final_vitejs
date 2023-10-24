import { useState, MouseEvent } from "react";
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
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ReportIcon from "@mui/icons-material/Report";
import { Link } from "react-router-dom";
import { clearUserLogin, selectUserLogin } from "../redux/slices/UserLogin";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const CustomNavbar = () => {
    const loggedInUser = useAppSelector(selectUserLogin);
    const dispatch = useAppDispatch();

    const [mainMenuAnchor, setMainMenuAnchor] = useState<null | HTMLElement>(null);
    const isMainMenuOpen = Boolean(mainMenuAnchor);

    const handleMainMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setMainMenuAnchor(event.currentTarget);
    };

    const handleMainMenuClose = () => {
        setMainMenuAnchor(null);
    };
    const [avatarMenuAnchor, setAvatarMenuAnchor] = useState<null | HTMLElement>(null);
    const isAvatarMenuOpen = Boolean(avatarMenuAnchor);

    const handleAvatarMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setAvatarMenuAnchor(event.currentTarget);
    };

    const handleAvatarMenuClose = () => {
        setAvatarMenuAnchor(null);
    };

    return (
        <AppBar position="static" sx={{ margin: 1, padding: 1 }}>
            <Toolbar>
                <AirplanemodeActiveOutlinedIcon sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Airport Missing Things (MYT)
                </Typography>
                <Box
                    sx={{
                        display: { xs: "none", md: "flex" },
                        flexGrow: 1,
                        justifyContent: "flex-end",
                    }}
                >
                    <Button
                        color="inherit"
                        component={Link}
                        to="/LandingPage"
                        onClick={handleMainMenuOpen}
                    >
                        <ReportIcon />
                        reportar objeto
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/LostObjectsDetails"
                        onClick={handleMainMenuOpen}
                    >
                        <SearchIcon />
                        buscador de objetos perdidos
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/LostAndFoundList"
                        onClick={handleMainMenuOpen}
                    >
                        <ListAltIcon />
                        lista de reportes
                    </Button>
                </Box>
                <Grid>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="avatar-menu-appbar"
                        aria-haspopup="true"
                        onClick={handleAvatarMenuOpen}
                        color="inherit"
                    >
                        {loggedInUser && (
                            <Avatar
                                alt=""
                                src={loggedInUser.picture?.large}
                                sx={{ width: 56, height: 56 }}
                            />
                        )}
                    </IconButton>
                </Grid>
                <Menu
                    id="avatar-menu-appbar"
                    anchorEl={avatarMenuAnchor}
                    open={isAvatarMenuOpen}
                    onClose={handleAvatarMenuClose}
                >
                    <MenuItem
                        onClick={() => {
                            handleAvatarMenuClose();
                            dispatch(clearUserLogin());
                        }}
                        component={Link}
                        to="/"
                    >
                        cerrar sesión
                    </MenuItem>
                </Menu>
                {loggedInUser && (
                    <Box
                        display="flex"
                        alignItems="center"
                        sx={{
                            display: {
                                xs: "block",
                                md: "none",
                            },
                        }}
                    >
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="main-menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMainMenuOpen}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="main-menu-appbar"
                            anchorEl={mainMenuAnchor}
                            open={isMainMenuOpen}
                            onClose={handleMainMenuClose}
                        >
                            <MenuItem
                                onClick={() => {
                                    handleMainMenuClose();
                                }}
                                component={Link}
                                to="/LandingPage"
                            >
                                <ReportIcon />
                                reportar objeto
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleMainMenuClose();

                                }}
                                component={Link}
                                to="/LostObjectsDetails"
                            >
                                <SearchIcon />
                                buscador de objetos perdidos
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleMainMenuClose();
                                }}
                                component={Link}
                                to="/LostAndFoundList"
                            >
                                <ListAltIcon />
                                mis reportes
                            </MenuItem>
                        </Menu>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default CustomNavbar;
