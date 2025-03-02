import {
  Card,
  CardContent,
  CardMedia,
  ImageList,
  Typography,
  useMediaQuery,
} from "@mui/material";

const CardCategoria = ({ title, description, image }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Card  sx={{
        maxWidth: "300px",
        width: "auto",
        elevation: 4,
        cursor: 'pointer',
        transition: "transform 0.3s ease, box-shadow 0.3s ease", // Suaviza a transição
        "&:hover": {
          transform: "translateY(-5px)", // Move o card para cima
          boxShadow: 6, // Aumenta a sombra para dar destaque
        },
      }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            width: "100px", // Definindo a largura
            height: "100px", // Definindo a altura igual à largura
            borderRadius: "50%", // Deixa a imagem redonda
            objectFit: "cover", // Garante que a imagem preencha sem distorcer
            margin: "0 auto", // Centraliza a imagem dentro do card
          }}
        />
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{ textAlign: "center" }}
          fontWeight='bold'
          title={title}
        >
          {title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" title={description} sx={{ textAlign: "center" }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardCategoria;
