import { Box, CircularProgress, Container, Typography } from "@mui/material";
import CardCategoria from "../../components/ui/CardCategoria";
import { useEffect, useState } from "react";
import { categoriaServices } from "../../services/categoriaServices";
import ModalCategoria from "../../components/ui/ModalCategoria";
import { useIsMobile } from "../../utils/MediaQuery";
import LoadingBackdrop from "../../components/ui/LoadingBackDrop";

const CategoriasPage = () => {
  const [categorias, setCategorias] = useState([]);
  const isMobile = useIsMobile()
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        setLoading(true)
        const data = await categoriaServices.getAll();
        setCategorias(data);
      } catch (error) {
        console.error("Erro ao carregar categorias", error);
      } finally {
        setLoading(false)
      }
    };

    fetchCategorias();
  }, []);
  return (
    <>
    {loading ? <LoadingBackdrop open={loading}/> : (
      <Container maxWidth="lg" sx={{ height: "100vh" }}>
      <Box display="flex" sx={{justifyContent: isMobile ? "" : "space-between", flexDirection: isMobile ? "column" : ""}}>
        <Typography
          variant="h4"
          textTransform="uppercase"
          textAlign="center"
          fontWeight="bold"
        >
          CATEGORIAS
        </Typography>
        <ModalCategoria/>
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          my: 4,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
        }}
      >
        {categorias?.map((item, index) => (
          <CardCategoria
            key={index}
            title={item.nome}
            description={item.descricao}
            image={item.imagem}
            itemId={item.id}
          />
        ))}
      </Container>
    </Container>
    )}
    </>
  );
};

export default CategoriasPage;
