import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import AirplanemodeActiveOutlinedIcon from '@mui/icons-material/AirplanemodeActiveOutlined';
const CustomNavbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ mt: 1 }}>
                    Airport Missing Things (MYT)
                </Typography>
                <IconButton edge="end" color="inherit" aria-label="menu">
                    <AirplanemodeActiveOutlinedIcon sx={{ fontSize: 40 }} />
                </IconButton>

            </Toolbar>
        </AppBar>
    );
};
export default CustomNavbar