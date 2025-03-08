import { Box, Container, Snackbar, Typography } from "@mui/material";
import { useEffect, useState, useMemo, useCallback } from "react";
import { categoriaServices } from "../../services/categoriaServices";
import { z } from "zod";
import CardCategoria from "../../components/ui/CardCategoria";
import ModalReutilizavel from "../../components/ui/ModalReutilizavel";
import LoadingBackdrop from "../../components/ui/LoadingBackDrop";
import FloatingButton from "../../components/ui/FloatingButton";
import ConfirmDeleteModal from "../../components/ui/ConfirmDeleteModal";
import InputSearch from "../../components/ui/InputSearch";
import AlertModal from "../../components/ui/AlertModal";

const CategoriasPage = () => {
  const [busca, setBusca] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [categoriaParaExcluir, setCategoriaParaExcluir] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertSucess, setAlertSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

    const handleOpenModal = useCallback((type) => {
      setModalType(type);
      setOpenModal(true);
    }, []);

  const handleCloseModal = useCallback(() => setOpenModal(false), []);

  const fieldsList = [
    { label: "Nome", name: "nome", type: "text", maxLength: 255 },
    { label: "Descrição", name: "descricao", type: "text", multiline: true, rows: 3 },
    { name: "imagem", type: "file" },
  ];

  const schema = z.object({
    nome: z.string().max(255, "Nome deve ter no máximo 255 caracteres.").nonempty("O campo Nome é obrigatório."),
    descricao: z.string().max(255, "Descrição deve conter no máximo 255 caracteres.").nonempty("O campo Descrição é obrigatório."),
  });

  const categoriasFiltradas = useMemo(() => {
    return categorias.filter(
      (cat) => cat.nome.toLowerCase().includes(busca.toLocaleLowerCase()) || cat.descricao.toLowerCase().includes(busca.toLocaleLowerCase())
    );
  }, [categorias, busca]);

  const handleEdit = useCallback(async ({ type, item }) => {
    const categoria = await categoriaServices.getById(item.id);
    setCategoria(categoria);
    setModalType(type);
    setOpenModal(true);
  }, []);

  const handleDelete = useCallback(async ({ openAlertModal, item }) => {
    setCategoriaParaExcluir(item);
    setOpenAlert(openAlertModal);
  }, []);

  const confirmarExclusão = useCallback(async () => {
    if (!categoriaParaExcluir) return;
    try {
      await categoriaServices.delete(categoriaParaExcluir.id);
      setCategorias((prev) => prev.filter((c) => c.id !== categoriaParaExcluir.id));
      setOpenAlert(false);
      setCategoriaParaExcluir(null);
      setAlertSuccess(true);
    } catch (error) {
      console.error("Erro ao excluir categoria.", error);
    }
  }, [categoriaParaExcluir]);

  const onSubmit = async (data) => {
    try {
      if (modalType === "create") {
        // Chama o serviço para criar categoria
        const response = await categoriaServices.create(data);
        setCategorias((prev) => [...prev, response]); // Atualiza a lista com a nova categoria
      } else if (modalType === "update") {
        // Chama o serviço para atualizar categoria
        const response = await categoriaServices.update(categoria.id, data);
        setCategorias((prev) => prev.map((c) => (c.id === categoria.id ? response : c))); // Atualiza a categoria na lista
      }
      setOpenModal(false); // Fecha o modal após o envio
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      // Aqui você pode, por exemplo, exibir um alerta ou notificação para o usuário
      // Exemplo:
      alert("Ocorreu um erro ao tentar salvar a categoria. Tente novamente mais tarde.");
    }
  };

    useEffect(() => {
      const fetchCategorias = async () => {
        try {
          setLoading(true);
          const data = await categoriaServices.getAll();
          setCategorias(data);
        } catch (error) {
          console.error("Erro ao carregar categorias", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCategorias();
    }, []);
  
  console.log('render');
  

  return (
    <>
      {loading ? (
        <LoadingBackdrop open={loading} />
      ) : (
        <Container maxWidth="lg" sx={{ height: "100vh" }}>
          <Box display="flex" flexDirection="column" gap={1}>
            <InputSearch value={busca} onSearch={setBusca} />
            <Typography variant="h4" textTransform="uppercase" textAlign="center" fontWeight="bold">
              CATEGORIAS
            </Typography>
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
            {categoriasFiltradas?.map((items) => (
              <CardCategoria key={items.id} item={items} openModal={(params) => handleEdit(params)} onDelete={(params) => handleDelete(params)} />
            ))}
          </Container>
          {/* Modal de Adicionar Categoria */}
          <ModalReutilizavel
            headerAlign="center"
            headerTitle={`${modalType === "create" ? "Criar" : "Atualizar"} Categoria`}
            fields={fieldsList}
            schema={schema}
            open={openModal}
            type={modalType}
            categoria={categoria}
            onClose={handleCloseModal}
            onSubmit={onSubmit}
          />
          {/* Botão flutuante */}
          <FloatingButton onClick={() => handleOpenModal("create")} />
          {/* Modal de Confirmação */}
          <ConfirmDeleteModal
            open={openAlert}
            onClose={() => setOpenAlert(false)}
            itemName={categoriaParaExcluir?.nome}
            onConfirm={confirmarExclusão}
          />

          {/* Alerta de sucesso */}
          <AlertModal
            open={alertSucess}
            autoHideDuration={3000}
            onClose={() => setAlertSuccess(false)}
            sx={{ mt: 10 }}
            ContentText="Categoria deletada com sucesso!"
          />
        </Container>
      )}
    </>
  );
};

export default CategoriasPage;
