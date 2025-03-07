import { Button, Container } from "@mui/material";
import ModalReutilizavel from "../../components/ui/ModalReutilizavel";
import { useState } from "react";
import { z } from  'zod'
import FloatingButton from "../../components/ui/FloatingButton";

const HomePage = () => {
    const [openModal, setOpenModal] = useState(false)
    const [modalType, setModalType] = useState('create')
    const schema = z.object({
        nome: z.string().max(255, "Nome deve ter no máximo 255 caracteres.").nonempty("O campo Nome é obrigatório."),
        descricao: z.string().max(255, "Descrição deve conter no máximo 255 caracteres.").nonempty("O campo Descrição é obrigatório.")
    })
    const handleOpenModal = (type) => {
        setModalType(type)
        setOpenModal(true)
    }

    const handleCloseModal = () => setOpenModal(false)
    const fieldsList = [
        {label: 'Nome', name: 'nome', type: 'text', maxLength: 255},
        {label: 'Descrição', name: 'descricao', type: 'text', multiline: true, rows: 3},
        {name: 'imagem', type: 'file'},
    ]
    return (
      <Container maxWidth="lg">
        <h1>HOME</h1>
        <ModalReutilizavel
          headerAlign="center"
          headerTitle={`${modalType === "create" ? "Criar" : "Atualizar"} Categoria`}
          fields={fieldsList}
          schema={schema}
          open={openModal}
          type={modalType}
          onClose={handleCloseModal}
        />
        <FloatingButton  onClick={() => handleOpenModal("create")} />

        <Button variant="contained" onClick={() => handleOpenModal("update")}>
          Editar
        </Button>
      </Container>
    );
}
 
export default HomePage;