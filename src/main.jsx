import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Registro from './components/usuarios/Registro.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './components/usuarios/Login.jsx'
import Viajes from './components/viajes/Viajes.jsx'
import PublicarViaje from './components/viajes/PublicarViaje.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    children:[
      {path:"registro", element:<Registro/>},
      {path:'login',element:<Login />},
      {path:'viajes', element: <Viajes />},
      {path:'publicarViaje', element: <PublicarViaje />}  
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
