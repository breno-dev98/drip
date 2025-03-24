import { Container, Typography } from "@mui/material";
import TableComponent from "../../components/ui/TableComponent";
import { produtosServices } from "../../services/produtosServices";
import { useEffect, useState } from "react";

const ProdutosPage = () => {
  const tHeaders = ["#ID", "Nome", "Descrição", "Avaliação", "Tamanho", "Cor", "Preço", "Categoria", "Cadastrado em:", "Editado em:"];
  const [produtos, setProdutos] = useState([]);

    const buscarProdutos = async () => {
        const response = await produtosServices.getAll();
        setProdutos(response)
    }

    useEffect(() => {
        buscarProdutos()
    }, [])
  return (
    <Container>
      <Typography variant="h4">Produtos</Typography>

      <TableComponent tHeaders={tHeaders} tBody={produtos} />
    </Container>
  );
};

export default ProdutosPage;
