import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const Registro = () => {
  const { store, actions} = useContext(Context)
  const initialFormData ={
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  const [formData, setFormData] = useState({...initialFormData});
  const [registrationSuccess, setregistrationSuccess] = useState(null)
  const [registrationError, setRegistrationError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword){
      setRegistrationError("Las contraseñas no coinciden")
      return;
    }
    try{
      console.log("enviar action con formData con un await")
      setregistrationSuccess(`Se registró con éxito como ${formData.firstName}`)
      setRegistrationError(null)
      setFormData({ ...initialFormData })
    }catch(error){
      console.error('Error al Agregar al usuario: ', error)

    }
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-6">
        {registrationSuccess && (
            <div class="alert alert-success d-flex align-items-center" role="alert">
           
            <div>
            <i class="fa-regular fa-circle-check fs-2 fw-bold text-success"></i>  usuario Creado success
            </div>
          </div>
          )}
          {registrationError && (
            <div className="alert alert-danger d-flex align-items-center" role="alert">
            
            <div>
            <i class="fa-solid fa-triangle-exclamation fs-2 fw-bold text-danger"></i>  Las contraseñas no coinciden
            </div>
          </div>
          )}
          <h2>Create Account</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Apellido
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo Electrónico
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
