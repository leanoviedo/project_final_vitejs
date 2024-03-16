import React, { useState, useEffect } from "react";
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
  Badge,
} from "@mui/material";
import AirplanemodeActiveOutlinedIcon from "@mui/icons-material/AirplanemodeActiveOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ReportIcon from "@mui/icons-material/Report";
import OutputIcon from "@mui/icons-material/Output";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../model/interface"; 
import { useMediaQuery } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { useAppSelector, useAppDispatch } from "../redux/hooks"; 
import { markMessageAsRead, selectMessages } from "../redux/slices/ChatSlices";
const CustomNavbar = () => {
  const dispatch = useAppDispatch();
  const [storedUser, setStoredUser] = useState<UserData | null>(null);
  const [mainMenuAnchor, setMainMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const [avatarMenuAnchor, setAvatarMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const messages = useAppSelector(selectMessages);

  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setStoredUser(parsedUserData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setStoredUser(null);
    navigate("/");
  };

  const handleMainMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMainMenuAnchor(event.currentTarget);
  };

  const handleMainMenuClose = () => {
    setMainMenuAnchor(null);
  };

  const handleAvatarMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAvatarMenuAnchor(event.currentTarget);
  };

  const handleAvatarMenuClose = () => {
    setAvatarMenuAnchor(null);
  };

  const handleReadMessages = () => {
    messages.forEach((message) => {
      if (message.hasNewMessage && message.user.email === storedUser?.email) {
        dispatch(markMessageAsRead(message.id));
      }
    });
  };

  const unreadMessagesCount = messages.reduce((count, message) => {
    if (message.hasNewMessage && message.user.email === storedUser?.email) {
      return count + 1;
    }
    return count;
  }, 0);

  return (
    <AppBar position="static" sx={{ margin: 1, padding: 1 }}>
      <Toolbar>
        <AirplanemodeActiveOutlinedIcon sx={{ fontSize: 40, mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Airport Missing Things (AMT)
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
            onClick={handleMainMenuClose}
          >
            <ReportIcon />
            Reportar objeto
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/LostObjectsDetails"
            onClick={handleMainMenuClose}
          >
            <SearchIcon />
            Buscador de objetos perdidos
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/LostAndFoundList"
            onClick={handleMainMenuClose}
          >
            <ListAltIcon />
            Lista de reportes
          </Button>
          {unreadMessagesCount > 0 && (
            <IconButton color="inherit" onClick={handleReadMessages}>
              <Badge badgeContent={unreadMessagesCount} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
          )}
        </Box>
        {storedUser && (
          <Grid>
            <IconButton
              aria-label="account of current user"
              aria-controls="avatar-menu-appbar"
              aria-haspopup="true"
              onClick={handleAvatarMenuOpen}
              color="inherit"
            >
              <Avatar
                alt="User Avatar"
                src={storedUser.picture?.large}
                sx={{ width: 56, height: 56 }}
              />
            </IconButton>
          </Grid>
        )}
        <Menu
          id="avatar-menu-appbar"
          anchorEl={avatarMenuAnchor}
          open={Boolean(avatarMenuAnchor)}
          onClose={handleAvatarMenuClose}
        >
          <MenuItem onClick={handleLogout}>
            <OutputIcon />
            Cerrar sesión
          </MenuItem>
        </Menu>
        {isMobile && (
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
              aria-label="open drawer"
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
              open={Boolean(mainMenuAnchor)}
              onClose={handleMainMenuClose}
            >
              <MenuItem
                onClick={handleMainMenuClose}
                component={Link}
                to="/LandingPage"
              >
                <ReportIcon />
                Reportar objeto
              </MenuItem>
              <MenuItem
                onClick={handleMainMenuClose}
                component={Link}
                to="/LostObjectsDetails"
              >
                <SearchIcon />
                Buscador de objetos perdidos
              </MenuItem>
              <MenuItem
                onClick={handleMainMenuClose}
                component={Link}
                to="/LostAndFoundList"
              >
                <ListAltIcon />
                Mis reportes
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <OutputIcon />
                Cerrar sesión
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default CustomNavbar;
