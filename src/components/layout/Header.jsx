import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useIsMobile } from "../../utils/MediaQuery";
import { Avatar, Button, Container, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, Menu, MenuItem, MenuList } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { House, LayoutGrid, Tags, CircleUserRound, LogOut, Settings } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [perfilAnchorEl, setPerfilAnchorEl] = useState(null);
  const perfilOpen = Boolean(perfilAnchorEl);

  const handlePerfilOpen = (event) => {
    setPerfilAnchorEl(event.currentTarget);
  };
  const handlePerfilClose = () => {
    setPerfilAnchorEl(null);
  };
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
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Decodifica o token para pegar o nome do usuário
      const usuario = jwtDecode(token);
      setNomeUsuario(usuario.nome);
    }
  }, []);
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
                <Box sx={{ width: 250, height: "100%" }} role="menu" display="flex" flexDirection="column" justifyContent="space-between">
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
                  <Box sx={{ mt: "auto" }}>
                    {" "}
                    {/* mt: "auto" empurra o botão para baixo */}
                    <ListItemButton>
                      <ListItemIcon>
                        <CircleUserRound size={24} />
                      </ListItemIcon>
                      <Typography variant="h6" color="textPrimary" fontWeight="bold" textTransform="uppercase">
                        Perfil
                      </Typography>
                    </ListItemButton>
                    <ListItemButton onClick={() => logout()}>
                      <ListItemIcon>
                        <LogOut size={24} />
                      </ListItemIcon>
                      <Typography variant="h6" color="textPrimary" fontWeight="bold" textTransform="uppercase">
                        Sair
                      </Typography>
                    </ListItemButton>
                  </Box>
                </Box>
              </Drawer>
            )}

            {/* NAVBAR DESKTOP */}
            {!isMobile && (
              <>
                {/* NAVLINKS */}
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

                {/* BOAS VINDAS */}
                <Box display="flex" alignItems="center" gap={1} marginRight={2}>
                  <Typography component="span" variant="body1" color="white">
                    Olá,
                  </Typography>
                  <Typography component="span" variant="subtitle1" color="white" fontWeight="bold">
                    {nomeUsuario.split(" ")[0]}
                  </Typography>
                </Box>

                {/* MENU DESKTOP */}
                <Box>
                  <Button onClick={handlePerfilOpen} title="Menu">
                    <Avatar sx={{width: "30px", height: "30px"}}>{nomeUsuario.split(" ")[0][0]}</Avatar>
                  </Button>
                  <Menu
                    open={perfilOpen}
                    anchorEl={perfilAnchorEl}
                    onClose={handlePerfilClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // Posição em relação ao ícone
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <MenuList>
                      <MenuItem sx={{ display: "flex", gap: 2 }} title="Perfil">
                        <CircleUserRound /> Perfil
                      </MenuItem>
                      <MenuItem sx={{ display: "flex", gap: 2 }} title="Minha Conta">
                        <CircleUserRound /> Minha Conta
                      </MenuItem>
                      <Divider />
                      <MenuItem sx={{ display: "flex", gap: 2 }} title="Configurações">
                        <Settings /> Configurações
                      </MenuItem>
                      <MenuItem sx={{ display: "flex", gap: 2 }} onClick={() => logout()} title="Sair">
                        <LogOut /> Sair
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
