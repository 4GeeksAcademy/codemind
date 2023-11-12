import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";

export const ForwotPassword = () => {

const { store, actions} = useContext(Context)
const navigate = useNavigate();
const [email, setEmail]= useState('')



const handleRecovery = async(e) =>{
    e.preventDefault();
    try{
        const response = await actions.recoveryPassword(email)
        if (response.success){
            store.email = email
            navigate('/sendpassword')
        }
    }catch{
        console.log(error)
    }
        
}
return (
  <div className="container mt-3 d-flex flex-column justify-content-center">
  <div className="mb-4">
      <Link to="/">
          <i className="fa-solid fa-arrow-left arrow-back"></i>
      </Link>
  </div>
  <div className="row justify-content-center">
      <div className="col-md-5 text-center me-2">
          <h2 className="bigtext text-line text-break">
              Forgot your secret <span className="text-color-primary">password</span>?
          </h2>
      </div>
      <div className="col-md-6 mt-4 pt-4">
          <div className="text-center">
              <p>Enter your email, and we will send you an email to reset your password.</p>
          </div>
          <div className="mb-3">
              <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
          </div>
          <div className="row mt-4">
              <div className="col text-center">
                  <button type="submit" className="btn btn-info" onClick={handleRecovery}>
                      Send Password
                  </button>
              </div>
          </div>
      </div>
  </div>
</div>
);
};