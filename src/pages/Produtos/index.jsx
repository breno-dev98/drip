import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Container,
  Box,
  Typography,
  FormHelperText,
} from "@mui/material";
import TableComponent from "../../components/ui/TableComponent";
import { produtosServices } from "../../services/produtosServices";
import { categoriaServices } from "../../services/categoriaServices";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatarParaBRL } from "../../utils/formatarParaBRL";

const ProdutosPage = () => {
  const tHeaders = ["#ID", "Nome", "Descrição", "Avaliação", "Tamanho", "Cor", "Preço", "Categoria", "Cadastrado em:", "Editado em:"];
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [open, setOpen] = useState(false);

  const schema = z.object({
    nome: z.string().nonempty("Nome é obrigatório"),
    descricao: z.string().min(1, "Descrição é obrigatória"),
    avaliacao: z.number({invalid_type_error: 'Avaliação é obrigatória'}).min(1, "O valor mínimo é 1").max(5, "O valor máximo é 5"),
    tamanho: z
      .number({ required_error: "Tamanho é obrigatório", invalid_type_error: "Tamanho deve ser um número" })
      .positive("O Tamanho deve ser um número positivo"),
    cor: z.string().min(1, "Cor é obrigatória"),
    preco: z.coerce
      .number({ required_error: "Preço é obrigatório", invalid_type_error: "Preço deve ser númerico" })
      .positive("O Preço deve ser um número positivo"),
    categoriaId: z.number({invalid_type_error: "Categoria deve ser um número"}).min(1, "Categoria é obrigatória"),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const handleOnClose = () => {
    setOpen(false);
    reset();
  };
  
  
  const onSubmit = async (data) => {
    try {
      const novoProduto = await produtosServices.create(data);
      setOpen(false);
      reset();
      setProdutos((prev) => [...prev, novoProduto]);
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const produtosResponse = await produtosServices.getAll();
      setProdutos(produtosResponse);

      const categoriaResponse = await categoriaServices.getAll();
      setCategorias(categoriaResponse);

      if (categoriaResponse.length > 0) {
        setValue("categoriaId", categoriaResponse[0].id); // Define a primeira categoria como padrão
      }
    };

    fetchData();
  }, [setValue]);

  const getCategoriaNome = (categoriaId) => {
    if (!categoriaId) return "Sem Categoria";
    const categoria = categorias.find((c) => c.id === categoriaId);
    return categoria ? categoria.nome : "Desconhecida";
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4">Produtos</Typography>
        <Button variant="contained" color="success" onClick={() => setOpen(true)}>
          Adicionar Produto
        </Button>
      </Box>
      <strong>Total de produtos:</strong> <span>{produtos.length}</span>
      <Dialog open={open} onClose={handleOnClose} fullWidth maxWidth="sm">
        <DialogTitle>Cadastrar Produto</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              size="small"
              label="Nome"
              fullWidth
              margin="dense"
              {...register("nome")}
              error={!!errors.nome}
              helperText={errors.nome?.message}
            />
            <TextField
              size="medium"
              label="Descrição"
              fullWidth
              margin="dense"
              {...register("descricao")}
              error={!!errors.descricao}
              helperText={errors.descricao?.message}
            />
            <TextField
              size="small"
              label="Avaliação"
              type="number"
              fullWidth
              margin="dense"
              inputProps={{ min: 1, max: 5, step: 1 }}
              {...register("avaliacao", { valueAsNumber: true })}
              error={!!errors.avaliacao}
              helperText={errors.avaliacao?.message}
            />
            <TextField
              size="small"
              label="Tamanho"
              type="number"
              fullWidth
              margin="dense"
              {...register("tamanho", { valueAsNumber: true })}
              error={!!errors.tamanho}
              helperText={errors.tamanho?.message}
            />
            <TextField size="small" label="Cor" fullWidth margin="dense" {...register("cor")} error={!!errors.cor} helperText={errors.cor?.message} />
            <TextField
              size="small"
              label="Preço"
              fullWidth
              margin="dense"
              {...register("preco")}
              error={!!errors.preco}
              helperText={errors.preco?.message}
            />
            <FormControl fullWidth margin="dense" error={!!errors.categoriaId}>
              <InputLabel id="categoria-label">Categoria</InputLabel>
              <Select label="Categoria" size="medium" defaultValue="" {...register("categoriaId", { valueAsNumber: true })}>
                {categorias.map((categoria) => (
                  <MenuItem key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </MenuItem>
                ))}
              </Select>
              {errors.categoriaId && <FormHelperText>{errors.categoriaId.message}</FormHelperText>}
            </FormControl>
            <DialogActions>
              <Button onClick={handleOnClose} variant="outlined" color="inherit">
                Cancelar
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Salvar
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <TableComponent
        tHeaders={tHeaders}
        tBody={produtos.map((produto) => ({
          ...produto,
          categoriaId: getCategoriaNome(produto.categoriaId),
          preco: formatarParaBRL(produto.preco),
        }))}
      />
    </Container>
  );
};

export default ProdutosPage;
