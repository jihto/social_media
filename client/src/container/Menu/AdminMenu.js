import * as React from "react";
import { makeStyles } from "@material-ui/core";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@material-ui/icons/Menu";

const AdminMenu = () =>{
    const classes = useStyles();
    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className={classes.abRoot}>
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                >
                    Admin
                </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

const useStyles = makeStyles((theme) => ({
    abRoot: {
      backgroundColor: "red"
    },
    abStatic: {
      border: "solid blue 2px"
    }
  })
  );
export default AdminMenu;