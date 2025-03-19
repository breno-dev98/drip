import { Box, Container, IconButton, Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { marcasServices } from "../../services/marcasServices";
import { useEffect, useState } from "react";
import { Check, Edit, Trash, X } from "lucide-react";
const MarcasPage = () => {
  const [marcas, setMarcas] = useState([]);
  const [isEditMode, setIsEditMode] = useState(null);
  const [editedNome, setEditedNome] = useState("");

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
      setMarcas((prev) => prev.map((marca) => (marca.id === item.id ? { ...marca, nome: editedNome } : marca)));
      handleEditOff();
    } catch (error) {
      console.error("Erro ao salvar edição", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <h1>MARCAS</h1>
      <TableContainer>
        {marcas.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "20px" }}>#ID</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "20px" }}>Marca</TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "20px" }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {marcas.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>{index + 1}</TableCell>
                  <TableCell sx={{ fontSize: "15px" }}>
                    {isEditMode === item.id ? (
                      <TextField
                        sx={{ width: "auto", minWidth: "200px", maxWidth: "300px" }}
                        type="text"
                        autoComplete="off"
                        size="small"
                        name="nome"
                        placeholder="Nome"
                        value={editedNome}
                        onChange={handleChangeNome}
                      />
                    ) : (
                      item.nome
                    )}
                  </TableCell>
                  <TableCell sx={{ fontSize: "15px" }}>
                    {isEditMode === item.id ? (
                      <>
                        <IconButton title="Salvar">
                          <Check color="green" onClick={() => handleEditSave(item)} />
                        </IconButton>
                        <IconButton title="Cancelar">
                          <X color="red" onClick={() => handleEditOff()} />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton>
                        <Edit onClick={() => handleEditOn(item)} />
                      </IconButton>
                    )}
                    <IconButton>
                      <Trash style={{ color: "red" }} onClick={() => alert(item.id)} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Container>
  );
};

export default MarcasPage;
