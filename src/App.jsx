import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import PrivateRoutes from "./routes/private.routes";
import PublicRoutes from "./routes/public.routes";

function App() {
  const { auth } = useContext(AuthContext);
  
  return auth ? <PrivateRoutes /> : <PublicRoutes />;
}

export default App;
