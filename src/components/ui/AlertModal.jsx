import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
const AlertModal = ({open, onClose, autoHideDuration, severity = 'success', ContentText }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      sx={{ mt: 10 }}
    >
      <Alert severity={severity} onClose={onClose}>
        {ContentText}
      </Alert>
    </Snackbar>
  );
};

export default AlertModal;
