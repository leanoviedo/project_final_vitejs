import { useState, useEffect } from "react";
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
import { UserData, LostObjectData, Message } from "../model/interface";
import { useMediaQuery } from "@mui/material";
import { selectMenssage } from "../redux/slices/ChatSlices";
import { useAppSelector } from "../redux/hooks";
import { selectLostObjects } from "../redux/slices/LostObjectSlice";

const CustomNavbar = () => {
  const [storedUser, setStoredUser] = useState<UserData | null>(null);
  const [mainMenuAnchor, setMainMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const [avatarMenuAnchor, setAvatarMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const messageData = useAppSelector(selectMenssage);
  const lostObjects = useAppSelector(selectLostObjects);

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
    if (isMobile) {
      setMainMenuAnchor(event.currentTarget);
    }
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

  // Verificar si el usuario actual está relacionado con algún objeto perdido
  const isUserRelatedToLostObject = (lostObject: LostObjectData) => {
    return (
      lostObject.userReport?.email === storedUser?.email ||
      lostObject.userReclamed?.email === storedUser?.email
    );
  };

  // Contar el número de mensajes no leídos relacionados con el objeto perdido del usuario actual
  const unreadMessagesCount = messageData.filter((message: Message) => {
    const relatedLostObject = lostObjects.find(
      (lostObject: LostObjectData) => lostObject.id === message.lostObjectId
    );
    return (
      !message.messageRead &&
      message.user.email !== storedUser?.email &&
      relatedLostObject &&
      isUserRelatedToLostObject(relatedLostObject)
    );
  }).length;

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
            onClick={handleMainMenuOpen}
          >
            <ReportIcon />
            Reportar objeto
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/LostObjectsDetails"
            onClick={handleMainMenuOpen}
          >
            <SearchIcon />
            Buscador de objetos perdidos
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/LostAndFoundList"
            onClick={handleMainMenuOpen}
          >
            <Badge
              badgeContent={unreadMessagesCount}
              color="secondary"
              sx={{ m: 1 }}
            ></Badge>
            <ListAltIcon />
            Lista de reportes
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
            {storedUser && (
              <Avatar
                alt=""
                src={storedUser.picture?.large}
                sx={{ width: 56, height: 56 }}
              />
            )}
          </IconButton>
        </Grid>
        <Menu
          id="avatar-menu-appbar"
          anchorEl={avatarMenuAnchor}
          open={Boolean(avatarMenuAnchor)}
          onClose={handleAvatarMenuClose}
        >
          <MenuItem onClick={handleLogout}>
            <OutputIcon />
            cerrar sesión
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
              aria-label="account of current user"
              aria-controls="main-menu-appbar"
              aria-haspopup="true"
              onClick={handleMainMenuOpen}
              color="inherit"
              sx={{
                display: {
                  xs: "block",
                  md: "none",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="main-menu-appbar"
              anchorEl={mainMenuAnchor}
              open={Boolean(mainMenuAnchor)}
              onClose={handleMainMenuClose}
              sx={{
                display: {
                  xs: "block",
                  md: "none",
                },
              }}
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
                buscador de objetos perdidos
              </MenuItem>
              <MenuItem
                onClick={handleMainMenuClose}
                component={Link}
                to="/LostAndFoundList"
                sx={{ p: 1 }}
              >
                <Badge badgeContent={unreadMessagesCount} color="secondary">
                  <ListAltIcon />
                  Mis reportes
                </Badge>
              </MenuItem>

              <MenuItem onClick={handleLogout} component={Link} to="/">
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
