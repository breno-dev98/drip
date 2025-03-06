import { Button, Container } from "@mui/material";
import ModalReutilizavel from "../../components/ui/ModalReutilizavel";
import { useState } from "react";

const HomePage = () => {
    const [openModal, setOpenModal] = useState(false)
    const [modalType, setModalType] = useState('create')
    const handleOpenModal = (type) => {
        setModalType(type)
        setOpenModal(true)
    }

    const handleCloseModal = () => setOpenModal(false)
    const fieldsList = [
        {label: 'Nome', name: 'nome', type: 'text'},
        {label: 'Email', name: 'email', type: 'email'},
    ]
    return ( 
        <Container maxWidth='lg'>
        <h1>HOME</h1>
        <ModalReutilizavel 
        headerAlign="center"
        headerTitle={`${modalType === 'create' ? 'Criar' : 'Atualizar'} Categoria`}
        fields={fieldsList}
        open={openModal}
        type={modalType}
        onClose={handleCloseModal}/>
        <Button variant="contained" onClick={() => handleOpenModal('create')}>Adicionar</Button>
        <Button variant="contained" onClick={() => handleOpenModal('update')}>Editar</Button>
        </Container>
     );
}
 
export default HomePage;