import {
  Box,
  Button,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AlertModal from "../../components/ui/AlertModal";
import { marcasServices } from "../../services/marcasServices";
import { useEffect, useState } from "react";
import { Check, Edit, Trash, X } from "lucide-react";
import Swal from "sweetalert2";
const MarcasPage = () => {
  const [marcas, setMarcas] = useState([]);
  const [isEditMode, setIsEditMode] = useState(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [editedNome, setEditedNome] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
  });
  const [errors, setErros] = useState(null);

  const ConfirmDelete = async (marca) => {
    return Swal.fire({
      title: "Atenção",
      html: `Tem certeza que deseja exlcuir a marca <strong>${marca.nome}</strong>?`,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Excluir",
      confirmButtonColor: "red",
    });
  };

  const handleDeleteMarca = async (marca) => {
    const result = await ConfirmDelete(marca);
    if (result.isConfirmed) {
      await marcasServices.delete(marca.id);
      alert("confirmado");
      setMarcas((...prev) => prev);
    }
  };

  useEffect(() => {
    const fetchMarcas = async () => {
      const res = await marcasServices.getAll();
      setMarcas(res);
    };

    fetchMarcas();
  }, [marcas.length]);

  const handleChangeNome = (e) => {
    setEditedNome(e.target.value);
  };

  const handleEditOn = (item) => {
    setIsEditMode(item.id);
    setEditedNome(item.nome);
  };
  const handleEditOff = () => {
    setIsEditMode(null);
    setEditedNome("");
  };

  const handleEditSave = async (item) => {
    try {
      await marcasServices.update(item.id, { nome: editedNome });
      setMarcas((prev) =>
        prev.map((marca) =>
          marca.id === item.id ? { ...marca, nome: editedNome } : marca
        )
      );
      handleEditOff();
    } catch (error) {
      console.error("Erro ao salvar edição", error.message);
    }
  };

  const handleChangeCreateNome = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors !== null) {
      setErros(null);
    }
  };

  useEffect(() => {
    if (isCreateMode === false) {
      setFormData({ nome: "" });
      setErros(null);
    }
  }, [isCreateMode, isEditMode]);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.nome.trim() !== "") {
        await marcasServices.create(formData);
        setFormData({ nome: "" });
        setOpenConfirm(true);
        setMarcas((...prev) => prev);
      } else {
        setErros("O nome é obrigatório");
      }
    } catch (error) {
      console.error("Erro ao criar marca", error.message);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="space-between">
        <h1>MARCAS</h1>
        <Box display="flex" alignItems="center" gap={3}>
          {isCreateMode && (
            <form
              onSubmit={handleCreateSubmit}
              style={{ display: "flex", gap: 3 }}
            >
              <TextField
                type="text"
                autoComplete="off"
                size="small"
                name="nome"
                placeholder="Insira o nome da marca"
                onChange={handleChangeCreateNome}
                value={formData.nome}
                error={errors}
                helperText={errors}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{ height: "min-content" }}
              >
                Criar
              </Button>
            </form>
          )}
          <Button
            variant="contained"
            color={isCreateMode ? "inherit" : "success"}
            onClick={() => setIsCreateMode(!isCreateMode)}
          >
            {isCreateMode ? "Cancelar" : "Adicionar Marca"}
          </Button>
        </Box>
      </Box>
      <AlertModal
        ContentText="Marca cadastrada com sucesso"
        open={openConfirm}
        autoHideDuration={3000}
        onClose={() => setOpenConfirm(false)}
        severity="success"
      />
      <TableContainer>
        {marcas.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "20px" }}>
                  #ID
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "20px" }}>
                  Marca
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "20px" }}>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {marcas.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ fontSize: "15px" }}>
                    {isEditMode === item.id ? (
                      <TextField
                        sx={{
                          width: "auto",
                          minWidth: "200px",
                          maxWidth: "300px",
                        }}
                        type="text"
                        autoComplete="off"
                        size="small"
                        name="nome"
                        placeholder="Nome"
                        value={editedNome}
                        onChange={handleChangeNome}
                        error={errors}
                        helperText={errors}
                      />
                    ) : (
                      item.nome
                    )}
                  </TableCell>
                  <TableCell sx={{ fontSize: "15px" }}>
                    {isEditMode === item.id ? (
                      <>
                        <IconButton title="Salvar">
                          <Check
                            color="green"
                            onClick={() => handleEditSave(item)}
                          />
                        </IconButton>
                        <IconButton title="Cancelar">
                          <X color="gray" onClick={() => handleEditOff()} />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton title="Editar">
                        <Edit onClick={() => handleEditOn(item)} />
                      </IconButton>
                    )}
                    <IconButton title="Excluir">
                      <Trash
                        style={{ color: "red" }}
                        onClick={() => handleDeleteMarca(item)}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
          >
            <Typography variant="h6">Nenhuma marca existente</Typography>
          </Box>
        )}
      </TableContainer>
    </Container>
  );
};

export default MarcasPage;
