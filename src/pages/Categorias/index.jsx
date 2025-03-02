import { Container, Typography } from "@mui/material";
import CardCategoria from "../../components/ui/CardCategoria";

const CategoriasPage = () => {
  const list = [1,1,1,1,1,1,1,1,1,1,1,1]
  return (
    <Container maxWidth='lg'>
      <Typography variant="h4" textTransform="uppercase" fontWeight="bold">CATEGORIAS</Typography>
      <Container maxWidth='lg' sx={{my: 4, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2}}>
        {list.map((item, index) => (
          <CardCategoria key={index} title='Eletrônicos' description='Eletrônicos em geral' image='https://setcesp.org.br/wp-content/uploads/2019/08/WhatsApp-Image-2019-08-05-at-08.51.43.jpeg' />
        ))}
      </Container>
    </Container>
  );
};

export default CategoriasPage;
