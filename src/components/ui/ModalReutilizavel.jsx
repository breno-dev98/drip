import { Button, Dialog, DialogActions, Divider, FormControl, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
const ModalReutilizavel = ({type = 'create', headerTitle = 'Header Title Modal', headerAlign = 'left', fields, open, onClose}) => {
    const {register, handleSubmit, reset} = useForm()
    const onSubmit = (data) => {
        console.log(data);
        reset()
        onClose()
    }
    return ( 
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='xs'>
            <Typography variant="h5" fontWeight='bold' textTransform='uppercase' my={2} px={3.3} textAlign={headerAlign}>
                {headerTitle}
            </Typography>
            <Divider />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth sx={{padding: '1rem 1.8rem', gap: 1}}>
                    {fields?.map(item => (
                        <TextField label={item.label} type={item.type} name={item.name} variant="outlined" size="small" {...register(`${item?.name}`)}/>
                    ))}

                </FormControl>
                <Divider />
                <DialogActions sx={{my: 1}}>
                    <Button type="submit" variant="contained" color='primary'>{type === 'create' ? 'Adicionar' : 'Atualizar'}</Button>
                    <Button onClick={() => {onClose(); reset()}} variant="outlined" color='error'>Cancelar</Button>
                </DialogActions>
            </form>
        </Dialog>


     );
}
 
export default ModalReutilizavel;