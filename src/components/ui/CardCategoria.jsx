import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,

} from "@mui/material";
import { Edit, Trash } from "lucide-react";

const CardCategoria = ({ item, openModal, onDelete }) => {
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
            onClick={() => openModal({type: "update", item})}
            >
              <Edit size={24}/>
            </IconButton>
            {/* DELETE BUTTON */}
            <IconButton
              sx={{ color: "gray", "&:hover": { color: "red" } }}
              onClick={() => onDelete({openAlertModal: true, item})}
            >
              <Trash size={24} />
            </IconButton>
            
          </Box>
          <CardMedia
            component="img"
            image={item.imagem}
            alt={item.nome}
            sx={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
              margin: "0 auto",
            }}
          />
          <Typography variant="h5" sx={{ textAlign: "center" }} fontWeight="bold" title={item.nome}>
            {item.nome}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" title={item.descricao} sx={{ textAlign: "center" }}>
            {item.descricao}
          </Typography>
        </CardContent>
      </Card>   
    </>
  );
};

export default CardCategoria;
