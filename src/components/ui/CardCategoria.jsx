import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Alert,
  Snackbar
} from "@mui/material";
import { Edit, Trash } from "lucide-react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { categoriaServices } from "../../services/categoriaServices";
import ModalCategoria from "./ModalCategoria";

const CardCategoria = ({ title, description, image, item, openModal }) => {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleDelete = async () => {
    setOpen(false);
    setAlertOpen(true); // Exibe o alerta
    try {
      await categoriaServices.delete(item.id)
    } catch (error) {
      console.error("Erro ao deletar a categoria");
    }    
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: "400px",
          width: "400px",
          elevation: 4,
          cursor: "pointer",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 6,
          },
        }}
      >
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {/* EDIT BUTTON */}
            <IconButton
            sx={{ color: "gray", "&:hover": { color: "blue" } }}
            onClick={() => openModal("update")}
            >
              <Edit size={24}/>
            </IconButton>
            {/* DELETE BUTTON */}
            <IconButton
              sx={{ color: "gray", "&:hover": { color: "red" } }}
              onClick={() => setOpen(true)}
            >
              <Trash size={24} />
            </IconButton>
            
          </Box>
          <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
              margin: "0 auto",
            }}
          />
          <Typography variant="h5" sx={{ textAlign: "center" }} fontWeight="bold" title={title}>
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" title={description} sx={{ textAlign: "center" }}>
            {description}
          </Typography>
        </CardContent>
      </Card>

      {/* Modal de Categoria */}
      <ModalCategoria visibilityButton={false}/>

      {/* Modal de Confirmação */}
      <ConfirmDeleteModal
        open={open}
        onClose={() => setOpen(false)}
        itemName={title}
        onConfirm={handleDelete} // Agora ele chama corretamente
      />

      {/* Alerta de sucesso */}
      <Snackbar open={alertOpen} autoHideDuration={3000} onClose={() => setAlertOpen(false)}>
        <Alert severity="success" onClose={() => setAlertOpen(false)}>
          Categoria deletada com sucesso!
        </Alert>
      </Snackbar>
    </>
  );
};

export default CardCategoria;
