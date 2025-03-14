import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useIsMobile } from "../../utils/MediaQuery";
import { Button, Container, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { House, LayoutGrid, Tags } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const { logout } = useContext(AuthContext);
  const isMobile = useIsMobile();
  const pagesLinks = [
    { to: "/", label: "Inicio", icon: <House size={24} /> },
    { to: "/categorias", label: "Categorias", icon: <LayoutGrid size={24} /> },
    { to: "/marcas", label: "Marcas", icon: <Tags size={24} /> },
  ];
  return (
    <Box>
      <AppBar position="fixed">
        <Container maxWidth="lg" disableGutters>
          <Toolbar>
            {isMobile && (
              <IconButton size="large" edge="start" color="inherit" aria-label="menu">
                <MenuIcon onClick={toggleDrawer(true)} />
              </IconButton>
            )}
            <Typography variant="h5" fontWeight="bold" component="div" textAlign={isMobile ? "center" : "initial"} width={"100%"}>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                DripStore
              </Link>
            </Typography>
            {/* MENU MOBILE */}
            {isMobile && (
              <Drawer open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250 }} role="menu">
                  <List>
                    <ListItem>
                      <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
                        Menu
                      </Typography>
                    </ListItem>
                    <Divider />
                    {pagesLinks.map((item, index) => (
                      <ListItemButton key={index} onClick={toggleDrawer(false)}>
                        <Link to={item.to} style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <Typography variant="h6" color="textPrimary" fontWeight="bold" textTransform="uppercase">
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
            <Button onClick={() => logout()} variant="text" color="white">
              Logout
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
