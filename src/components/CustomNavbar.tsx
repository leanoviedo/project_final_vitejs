import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AirplanemodeActiveOutlinedIcon from '@mui/icons-material/AirplanemodeActiveOutlined';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const CustomNavbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    href='/'
                >
                    <AirplanemodeActiveOutlinedIcon sx={{ fontSize: 40 }} />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Airport Missing Things (MYT)
                </Typography>
                <Box>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/"
                    >
                        Inicio
                    </Button>
                    <Button
                        color="inherit"
                        component={Link}
                        to="/LostObjectsList"
                    >
                        Objetos Perdidos
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export default CustomNavbar