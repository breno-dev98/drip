import { useState } from 'react'
import './App.css'
import PrivateRoutes from './routes/private.routes'
import PublicRoutes from './routes/public.routes'


function App() {
  const [auth, setAuth] = useState(false)
  return auth ? <PrivateRoutes /> : <PublicRoutes />
    
  
}

export default App
