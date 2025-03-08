import { Container } from "@mui/material";
import FiltroPorOrdem from "../../components/ui/FiltroPorOrdem";
const HomePage = () => {
    return (
      <Container maxWidth="lg">
        <h1>HOME</h1>
        <FiltroPorOrdem
          items={[
            { nome: "Ordem crescente", value: "asc" },
            { nome: "Ordem decrescente", value: "desc" },
          ]}
        />
      </Container>
    );
}
 
export default HomePage;