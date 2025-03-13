import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import FacebookIcon from "@mui/icons-material/Facebook";
import { z } from "zod";
import { TextField, Button, Container, Typography, Box, Divider, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginService } from "../../services/loginService";

// Esquema de validação com Zod
const schema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("E-mail inválido"),
  senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),

});

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
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
      await loginService(data)
        reset();
        alertSuccess();
    } catch (error) {
        console.error("Erro ao cadastrar usuario.");
        alertError()
    }
  };

  const alertSuccess = () => {
    Swal.fire({
      title: "Sucesso!",
      text: "Logado com sucesso!",
      icon: "success",
      confirmButtonText: "Ok",
      confirmButtonColor: "green",
      timer: 3000,
      timerProgressBar: true,
      allowOutsideClick: false,
    });
  };
  const alertError = () => {
    Swal.fire({
      title: "Erro!",
      text: "Falha ao realizar login!",
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
            label="E-mail"
            fullWidth
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
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Entrar
          </Button>
          <Box component="span" display="flex" justifyContent="center" my={2} gap={1}>
            Ainda não tem uma conta?
            <Link to='/cadastro' style={{textDecoration: 'none', color: 'blue'}}>Cadastre-se</Link>
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
            Entre usando o Google
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
            Entre usando o Facebook
          </Button>
        </form>
      </Box>
    </Container>
  );
}
