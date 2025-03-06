import { Container } from "@mui/material";
import AlertModal from "../../components/ui/AlertModal";

const HomePage = () => {
    return ( 
        <Container maxWidth='lg'>
        <h1>HOME</h1>
        <AlertModal />
        </Container>
     );
}
 
export default HomePage;