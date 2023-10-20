import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/index.css";


export const Registro = () => {
  const { store, actions} = useContext(Context)
  const baseUrl = "https://ui-avatars.com/api";
  const size = 200; // Tamaño del avatar (píxeles)
  
  const rounded = true; // Forma redondeada
  const background = "random"; // Color de fondo aleatorio
  const initialFormData ={
    firstName: '',
    lastName: '',
    email: '',
    teacherName:null,
    password: '',
    confirmPassword: '',
    img: ''
  }
  const [formData, setFormData] = useState({...initialFormData});
  const [registrationSuccess, setregistrationSuccess] = useState(null)
  const [registrationError, setRegistrationError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Realiza la transformación de la primera letra en mayúscula
    const updatedValue =
      name === "firstName" || name === "lastName"
        ? value
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        : value;

   
    const updatedFormData = { ...formData, [name]: updatedValue };
    setFormData(updatedFormData);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword){
      setRegistrationError("Las contraseñas no coinciden")
      return;
    }
    try{
      const name = formData.firstName + " " + formData.lastName
      const imgURL = `${baseUrl}/?name=${name}&size=${size}&rounded=${rounded}&background=${background}`
      const updatedFormData = { ...formData, img: imgURL };
      await actions.addUser(updatedFormData);
      
      setregistrationSuccess(`Se registró con éxito como ${formData.firstName}`)
      setRegistrationError(null)
      setFormData({ ...initialFormData })
      
    }catch(error){
      console.error('Error al Agregar al usuario: ', error)

    }
  };

  return (
    <>
    <div className="container">
    <div className="row mb-4">
                <div className="col">
                    <Link to="/"><i className="fa-solid fa-arrow-left arrow-back"></i></Link>
                </div>
            </div>

      <div className="row justify-content-center">

        <div className="col-md-6">
        {registrationSuccess && (
            <div className="alert alert-success d-flex align-items-center" role="alert">
           
            <div>
            <i className="fa-regular fa-circle-check fs-2 fw-bold text-success"></i>  usuario Creado success
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
                First Name
              </label>
              <input
                type="text"
                className="form-control bg-dark text-white border-primary"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control bg-dark text-white border-primary"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control bg-dark text-white border-primary"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control bg-dark text-white border-primary"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control bg-dark text-white border-primary"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="row">
              <button
                type="submit"
                className="btn btn-lg btn-primary rounded-pill btn-outline-secondary:hover mt-5"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};
