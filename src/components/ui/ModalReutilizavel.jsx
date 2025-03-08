import { Button, Dialog, DialogActions, Divider, FormControl, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
const ModalReutilizavel = ({
  type = "create",
  headerTitle = "Header Title Modal",
  headerAlign = "left",
  fields,
  open,
  onClose,
  schema,
  categoria,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  useEffect(() => {
    if (open && type === "update") {
      setValue("nome", categoria.nome);
      setValue("descricao", categoria.descricao);
      setValue("imagem", categoria.imagem);
    }
  }, [open, categoria, type, reset, setValue]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <Typography variant="h5" fontWeight="bold" textTransform="uppercase" my={2} px={3.3} textAlign={headerAlign}>
        {headerTitle}
      </Typography>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth sx={{ padding: "1rem 1.8rem", gap: 1 }}>
          {fields?.map((item, index) => (
            <TextField
              key={index}
              label={item.label}
              type={item.type}
              name={item.name}
              variant="outlined"
              size="small"
              multiline={item.multiline}
              rows={item.rows}
              inputProps={{ maxLength: item.maxLength }}
              {...register(item.name)}
              error={!!errors[item.name]}
              helperText={errors[item.name]?.message}
            />
          ))}
          {fields?.map((item, index) => {
            item.type === "file" && (
              <TextField
                key={index}
                label={item.label}
                type={item.type}
                name={item.name}
                variant="outlined"
                size="small"
                multiline={item.multiline}
                rows={item.rows}
                inputProps={{ maxLength: item.maxLength }}
                {...register(item.name)}
                error={!!errors[item.name]}
                helperText={errors[item.name]?.message}
              />
            );
          })}
        </FormControl>
        <Divider />
        <DialogActions sx={{ my: 1 }}>
          <Button type="submit" variant="contained" color="primary">
            {type === "create" ? "Adicionar" : "Atualizar"}
          </Button>
          <Button onClick={handleClose} variant="outlined" color="error">
            Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ModalReutilizavel;
