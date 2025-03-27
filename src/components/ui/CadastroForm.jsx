import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import FacebookIcon from "@mui/icons-material/Facebook";
import { z } from "zod";
import { TextField, Button, Container, Typography, Box, Divider, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { usuarioServices } from "../../services/usuarioServices";
import { AuthContext } from "../../context/AuthContext";

// Esquema de validação com Zod
const schema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().min(1, "Email é obrigatório").email("E-mail inválido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  telefone: z.string().min(11, "O telefone deve ter no mínimo 11 digitos"),
  cpf: z.string().nonempty("CPF é obrigatório").min(11, "O CPF deve ter 11 digitos")
});

export default function CadastroForm() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
    const { cadastro } = useContext(AuthContext);
  
    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev)
    }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
        const response = await usuarioServices.create(data);
        console.log("Dados enviados:", data);
        reset();
      await alertSuccess();
      cadastro(response.token)
        navigate("/")
    } catch (error) {
        console.error("Erro ao cadastrar usuario.");
        alertError()
    }
  };

  const alertSuccess = async () => {
    await Swal.fire({
      title: "Sucesso!",
      text: "Usuário cadastrado com sucesso!",
      icon: "success",
      confirmButtonText: "Ok",
      confirmButtonColor: "green",
      timer: 3000,
      timerProgressBar: true,
      allowOutsideClick: false,
    });
  };
  const alertError = async () => {
    await Swal.fire({
      title: "Erro!",
      text: "Falha ao cadastrar usuário!",
      icon: "error",
      confirmButtonText: "Ok",
      confirmButtonColor: "red",
      timer: 3000,
      timerProgressBar: true,
      allowOutsideClick: false,
    });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper", minWidth: "200px", maxWidth: "500px" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Registrar-se
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Nome"
            fullWidth
            id="nome"
            size="small"
            margin="dense"
            {...register("nome")}
            error={!!errors.nome}
            helperText={errors.nome?.message}
          />
          <TextField
            label="E-mail"
            fullWidth
            id="email"
            size="small"
            margin="dense"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Box position="relative">
            <TextField
              label="Senha"
              type={showPassword ? "text" : "password"}
              fullWidth
              id="senha"
              size="small"
              margin="dense"
              {...register("senha")}
              error={!!errors.senha}
              helperText={errors.senha?.message}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleTogglePassword}
                    edge="end"
                    sx={{
                      position: "absolute",
                      right: "15px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
          </Box>

          <TextField
            label="Telefone"
            type="tel"
            fullWidth
            id="telefone"
            size="small"
            margin="dense"
            placeholder="(99)99999-9999"
            {...register("telefone")}
            error={!!errors.telefone}
            helperText={errors.telefone?.message}
            inputProps={{ maxLength: 15 }}
          />
          <TextField
            label="CPF"
            type="number"
            fullWidth
            id="cpf"
            size="small"
            margin="dense"
            placeholder="57249557092"
            {...register("cpf")}
            error={!!errors.cpf}
            helperText={errors.cpf?.message}
            inputProps={{ maxLength: 15 }}
          />
          <Button type="submit" id="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Cadastrar
          </Button>
          <Box component="span" display="flex" justifyContent="center" my={2} gap={1}>
            Já tem uma conta?
            <Link to="/entrar" style={{ textDecoration: "none", color: "blue" }}>
              Entre
            </Link>
          </Box>

          <Divider>ou</Divider>

          <Button
            type="button"
            fullWidth
            variant="outlined"
            color="gray"
            onClick={() => alert("Cadastrado com o Google")}
            sx={{
              mt: 1,
            }}
            startIcon={<FcGoogle size={20} />}
          >
            Cadastre-se com o Google
          </Button>
          <Button
            type="button"
            fullWidth
            variant="outlined"
            color="gray"
            onClick={() => alert("Cadastrado com o Facebook")}
            sx={{
              mt: 1,
            }}
            startIcon={<FacebookIcon color="info" size={24} />}
          >
            Cadastre-se com o Facebook
          </Button>
        </form>
      </Box>
    </Container>
  );
}
