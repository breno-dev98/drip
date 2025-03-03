import { Container, Typography } from "@mui/material";
import CardCategoria from "../../components/ui/CardCategoria";
import { useEffect, useState } from "react";
import { getAll } from "../../services/categoriaServices";

const CategoriasPage = () => {
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getAll();
        setCategorias(data)
      } catch (error) {
        console.error("Erro ao carregar categorias", error);
      }
    }

    fetchCategorias()
  }, [])
  return (
    <Container maxWidth='lg' sx={{height: '100vh'}}>
      <Typography variant="h4" textTransform="uppercase" textAlign='center' fontWeight="bold">CATEGORIAS</Typography>
      <Container maxWidth='lg' sx={{my: 4, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2}}>
        {categorias?.map((item, index) => (
          <CardCategoria key={index} title={item.nome} description={item.descricao} image={item.imagem} />
        ))}
      </Container>
    </Container>
  );
};

export default CategoriasPage;
