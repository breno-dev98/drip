import { Container, Switch } from "@mui/material";
import { useState } from "react";

const MarcasPage = () => {
    const [initialValue, setInitialValue] = useState(true)
    const handleChange = () => {
        setInitialValue(!initialValue)
    }
    return ( 
        <Container maxWidth='lg'>
        <h1>MARCAS</h1>
        <Switch onChange={handleChange} checked={initialValue}/>
        </Container>
     );
}
 
export default MarcasPage;