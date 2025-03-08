import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField, Stack, Box } from "@mui/material";
import { categoriaServices } from "../../services/categoriaServices"; // Importa o serviço

const ModalCategoria = ({ visibilityButton = true }) => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
    setPreviewImage(null);
  };

  // Converte a imagem para Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("imagem", reader.result); // Armazena Base64
        setPreviewImage(reader.result); // Exibe preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Enviar os dados para o backend
  const onSubmit = async (data) => {
    try {
      await categoriaServices.create(data); // Envia para API
      console.log("Categoria criada com sucesso:", data);
      handleClose();
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
    }
  };

  return (
    <>
      {visibilityButton && (
        <Button variant="contained" onClick={handleOpen}>
          Adicionar Categoria
        </Button>
      )}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle fontWeight="bold" fontSize="24px" textTransform="uppercase">
          Criar Categoria
        </DialogTitle>
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Stack spacing={2}>
              <TextField label="Nome da categoria" variant="outlined" size="small" {...register("nome")} fullWidth />
              <TextField
                label="Descrição"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                {...register("descricao")}
                InputProps={{ inputProps: { maxLength: 255 } }}
              />
              <Button variant="contained" component="label">
                Escolher imagem
                <input type="file" hidden accept="image/*" onChange={handleImageChange} />
              </Button>

              {previewImage && (
                <Box mt={2}>
                  <p>Imagem selecionada:</p>
                  <img src={previewImage} alt="Preview" width={100} style={{ borderRadius: "8px", marginTop: "8px" }} />
                </Box>
              )}
            </Stack>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button type="submit" variant="contained">
              Criar
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancelar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ModalCategoria;
