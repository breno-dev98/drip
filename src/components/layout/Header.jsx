import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Container, List, ListItem, Menu, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            {isMobile && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h5" fontWeight="bold" component="div">
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                DripStore
              </Link>
            </Typography>
            <List sx={{ display: "flex" }}>
              <ListItem>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Typography variant="h6" color="white">
                    Home
                  </Typography>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/categorias" style={{ textDecoration: "none" }}>
                  <Typography variant="h6" color="white">
                    Categorias
                  </Typography>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/marcas" style={{ textDecoration: "none" }}>
                  <Typography variant="h6" color="white">
                    Marcas
                  </Typography>
                </Link>
              </ListItem>
            </List>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
