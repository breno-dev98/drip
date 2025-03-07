
import { Button, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const FloatingButton = ({ onClick }) => {
  return (
    <Container maxWidth='lg' sx={{display: 'flex', justifyContent: 'flex-end'}}>
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        sx={{
          position: "fixed",
          bottom: 16,
          borderRadius: "50%",
          minWidth: "56px",
          height: "56px",
          boxShadow: 3,
        }}
      >
        <AddIcon />
      </Button>
    </Container>
  );
};

export default FloatingButton;
