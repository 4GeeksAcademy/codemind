import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";


const PrivateRoute = ({ element, ...rest }) => {
  const { store } = useContext(Context);

  // Verificar si el usuario está autenticado
  const isAuthenticated = store.isAuthenticated; // Asegúrate de adaptar esto según cómo determines la autenticación en tu aplicación

  if (isAuthenticated) {
    return <Route {...rest} element={element} />;
  } else {
    // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;