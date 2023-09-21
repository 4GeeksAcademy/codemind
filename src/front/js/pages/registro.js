import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import codemindillus from '../../img/codemindillus.png'




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
      const imgURL = `${baseUrl}/?name=${encodeURIComponent(name)}&size=${size}&rounded=${rounded}&background=${background}`
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
    <section className="vh-100 d-flex align-items-center justify-content-center bg">
      
    <div className="container">
    <div className="row">
                <div className="col">
                    <Link to="/"><i className="fa-solid fa-arrow-left arrow-back"></i></Link>
                </div>
            </div>

      <div className="row justify-content-evenly align-items-center">
      <h2 className="text-center  text-color-primary">&#60;Sing<span className="text-line">Up/&#62;</span></h2>
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
         
          
          <form onSubmit={handleSubmit}>
            <div className="">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control border-black"
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
                className="form-control border-black"
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
                className="form-control  border-black"
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
                className="form-control  border-black"
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
                className="form-control border-black"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="row justify-content-center">

            <button type="submit" className="btnsignup mt-2 " style={{ maxWidth: "15em" }}>Sign up</button>
           
            </div>
          </form>
        </div>
        <div className="col-md-6 justify-content-center align-items-center d-flex">
          <img src={codemindillus} className=" imgsignup mt-4 mb-4"></img>
          </div>
      </div>
    </div>
    </section>
  );
};
