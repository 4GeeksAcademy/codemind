import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from "../store/appContext";

export const Profile = () => {
    
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

    const [selectedTeacher, setSelectedTeacher] = useState("");

    useEffect(()=>{
        if(store.user.teacherName){
            setSelectedTeacher(store.user.teacherName)
        }
    },[store.user.teacherName])

    const handleTeacherSelect = (teacherName, e) => {
        e.preventDefault();
        setSelectedTeacher(teacherName)
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
                        <div className='d-flex justify-content-around mb-2'>
                            <label className='my-0 '>First Name:</label>
                            <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} style={{ maxWidth: "60%" }}></input>
                        </div>
                        <div className='d-flex justify-content-around  mb-2'>
                            <label className='my-0 '>Last Name:</label>
                            <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} style={{ maxWidth: "60%" }}></input>
                        </div>
                        <div className='d-flex justify-content-around  mb-2 '>
                            <label className='my-0 '>E-mail:</label>
                            <input type="text" className="form-control ms-4" id="email" name="email" value={formData.email} onChange={handleChange} style={{ maxWidth: "60%" }}></input>
                        </div>
                        <div className='d-flex justify-content-center  mb-2 mt-4'>
                            <label className='my-0 '>Teacher:</label>
                            <div className="h-25 px-5  ">
                                <div className="btn-group dropdown-center" >
                                    <button className="btn btn-secondary dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false" disabled={!!store.user.teacherName} >
                                    {selectedTeacher ? selectedTeacher : "Select Your Teacher"}
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
                        <div className="row  align-items-center mt-4 justify-content-center">
                            <div className=" col-sm-12 col-md-6  text-center">
                            <button
                  type="submit"
                  className="btnsignup btn-lg"
                  style={{ minWidth: "7em" }}
                >
                  Update Changes
                </button>
                            </div>
                        </div>
                    </form>
                    <div className="col d-flex justify-content-evenly">
                    <div className="d-flex justify-content-around  mt-5">
                        <Link to={"/changepassword"}> <p className='fs-5'> change Password </p> </Link>
                    
                        
                    </div>
                </div>
           
                
            </div>

            </div>

        </div>
    );
};
