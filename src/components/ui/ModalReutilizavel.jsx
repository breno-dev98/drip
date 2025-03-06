import { Button, Dialog, DialogActions, Divider, FormControl, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
const ModalReutilizavel = ({type = 'create', headerTitle = 'Header Title Modal', headerAlign = 'left', fields, open, onClose}) => {
    const schema = z.object({
        nome: z.string().max(255, "Nome deve ter no máximo 255 caracteres.").nonempty("O campo Nome é obrigatório."),
        email: z.string().email("Email inválido!").nonempty("O campo Email é obrigatório.")
    })
    
    
    const {register, handleSubmit, reset, formState: {errors}} = useForm({resolver: zodResolver(schema)})
    const onSubmit = (data) => {
        console.log("Dados enviados:",data);
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
                        <TextField key={item.label} label={item.label} 
                        type={item.type} 
                        name={item.name}
                        variant="outlined" 
                        size="small" 
                        multiline={item.multiline}
                        rows={item.rows}
                        inputProps={{maxLength: item.maxLength}}
                        {...register(item.name)}
                        error={!!errors[item.name]}
                        helperText={errors[item.name]?.message}
                        />
                        
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