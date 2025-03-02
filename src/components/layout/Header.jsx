import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Container, Divider, Drawer, List, ListItem, ListItemButton, Menu, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const isMobile = useMediaQuery("(max-width:600px)");
  const pagesLinks = [
    {to: '/', label: "Inicio"},
    {to: '/categorias', label: "Categorias"},
    {to: '/marcas', label: "Marcas"},
  ]
  return (
    <Box >
      <AppBar position="static">
        <Container maxWidth="lg" disableGutters>
          <Toolbar>
            {isMobile && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                
              >
                <MenuIcon onClick={toggleDrawer(true)}/>
              </IconButton>
            )}
            <Typography variant="h5" fontWeight="bold" component='div' textAlign={isMobile ? 'center' : 'initial'} width={'100%'}>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                DripStore
              </Link>
            </Typography>
            {/* MENU MOBILE */}
            {isMobile && (
              <Drawer open={open} onClose={toggleDrawer(false)}>
                <Box sx={{width: 250}} role='menu'>
                <List>
                  <ListItem>
                    <Typography variant="h4" fontWeight='bold' textTransform='uppercase'>Menu</Typography>
                  </ListItem>
                  <Divider />
                {pagesLinks.map((item, index) => (
                <ListItemButton key={index} onClick={toggleDrawer(false)}>
                <Link to={item.to} style={{ textDecoration: "none" }}>
                  <Typography variant="h6" color="textPrimary" fontWeight='bold' textTransform='uppercase'>
                    {item.label}
                  </Typography>
                </Link>
              </ListItemButton>
              ))}
                </List>
                </Box>
              </Drawer>
            )}

            {/* MENU DESKTOP */}
            {!isMobile && (
              <List sx={{ display: "flex" }}>
              {pagesLinks.map((item, index) => (
                <ListItem key={index}>
                <Link to={item.to} style={{ textDecoration: "none" }}>
                  <Typography variant="h6" color="white">
                    {item.label}
                  </Typography>
                </Link>
              </ListItem>
              ))}
            </List>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
