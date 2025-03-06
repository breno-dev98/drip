import { Backdrop, CircularProgress } from "@mui/material";

const LoadingBackdrop = ({ open }) => {
  return (
    <Backdrop open={open} sx={{ color: "#fff", zIndex: 1300 }}>
      <CircularProgress color="primary" size={100}/>
    </Backdrop>
  );
};

export default LoadingBackdrop;
