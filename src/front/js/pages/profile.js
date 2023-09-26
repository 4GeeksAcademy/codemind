import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from "../store/appContext";

export const Profile = () => {
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const { store, actions } = useContext(Context);
    const initialFormData ={
        firstName: store.user.firstName,
        lastName: store.user.lastName,
        email: store.user.email,
        teacherName: store.user.teacherName || "",
        password: store.user.password,
        confirmPassword: store.user.confirmPassword,
        img: store.user.img
    };
    const [formData, setFormData] = useState({...initialFormData});


    const handleTeacherSelect = (teacherName, e) => {
        e.preventDefault(); // Prevenir desplazamiento automático
        if (!store.user.teacherName) {
            setFormData({ ...formData, teacherName: teacherName });
        }
    };

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

        try {
        const baseUrl = "https://ui-avatars.com/api";
        const size = 200; // Tamaño del avatar (píxeles)
        const rounded = true; // Forma redondeada
        const background = "random"; // Color de fondo aleatorio
        const name = formData.firstName + " " + formData.lastName
        const imgURL = `${baseUrl}/?name=${encodeURIComponent(name)}&size=${size}&rounded=${rounded}&background=${background}`
        const updatedFormData = { ...formData, img: imgURL };
        console.log(updatedFormData)
            await actions.updateUser(updatedFormData);
            setShowAlert(true);
            console.log("Datos actualizados:", formData);
        } catch (error) {
            console.error('Error al actualizar el usuario: ', error)
        }
    };

    return (
        <div className="container vh-100 align-items-center">
            <div className="row mb-4">
                <div className="col">
                    <Link to="/modules"><i className="fa-solid fa-arrow-left arrow-back"></i></Link>
                </div>
            </div>
            <div className="row justify-content-center d-flex justify-content-between">
                <div className="col-sm-12 col-md-6 text-start">
                    <div className="embed-responsive embed-responsive-16by9">
                        <h2 className='bigtext text-line text-break'>
                            Hi <span className='text-color-primary'>{store.user.firstName}</span>! This is your profile
                        </h2>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 mt-4 align-items-start">
                                        
                                        {showAlert && (
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            User updated successfully!
                            <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className='d-flex justify-content-between mb-2'>
                            <p className='my-0 me-4'>First Name:</p>
                            <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} style={{ maxWidth: "60%" }}></input>
                        </div>
                        <div className='d-flex justify-content-between  mb-2'>
                            <p className='my-0 me-4'>Last Name:</p>
                            <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} style={{ maxWidth: "60%" }}></input>
                        </div>
                        <div className='d-flex justify-content-between  mb-2'>
                            <p className='my-0 me-4'>E-mail:</p>
                            <input type="text" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} style={{ maxWidth: "60%" }}></input>
                        </div>
                        <div className='d-flex justify-content-between  mb-2'>
                            <p className='my-0 '>Teacher:</p>
                            <div className="h-25 px-5  ">
                                <div className="btn-group dropdown-center" >
                                    <button className="btn btn-secondary dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false" disabled={!!store.user.teacherName} >
                                    {store.user.teacherName || "Select Your Teacher"}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-dark">
                                    <li><a className="dropdown-item" href="#" onClick={(e) => handleTeacherSelect("Arnaldo Perez", e)}>Arnaldo Perez</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleTeacherSelect("Martin Coimbra", e)}>Martin Coimbra</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleTeacherSelect("Nicola Tesla", e)}>Nicola Tesla</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleTeacherSelect("Albert Einstein", e)}>Albert Einstein</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleTeacherSelect("Isaac Newton", e)}>Isaac Newton</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleTeacherSelect("Aristoteles", e)}>Aristoteles</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleTeacherSelect("Galileo Galilei", e)}>Galileo Galilei</a></li>
                            <li><a className="dropdown-item" href="#" onClick={(e) => handleTeacherSelect("Marie Curie", e)}>Marie Curie</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row  align-items-center mt-4 justify-content-end">
                            <div className=" col-sm-12 col-md-6  text-center">
                                <button type="submit" className="btn btn-primary">
                                    Update User
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className='row h-25 d-flex justify-content-end align-items-center'>
                <div className="col-sm-1 col-md-4  text-sm-end justify-content-between">
                    <div className="d-flex justify-content-between ">
                        <Link to={"/changepassword"}><a href="#" className="btn btn-outline-secondary">Change password</a></Link>
                        <a href="#" className="">I'm Professor</a>
                    </div>
                </div>
            </div>
        </div>
    );
};
