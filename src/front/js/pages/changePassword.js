import React, { useState, useEffect, useContext } from "react";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { Context } from "../store/appContext";
import loaderbox from "../../img/loaderbox.gif";

export const ChangePassword = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token") || localStorage.getItem('userToken');
  const [renderComp, setRenderComp] = useState("loader");
  const initialFormData = {
    password: "",
    email: email,
    confirmpassword: "",
  };
  const [formData, setFormData] = useState({ ...initialFormData });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password || !formData.confirmpassword) {
      setErrorMessage("PASSWORD IS REQUIRED");
      setShowAlert(true);
      return;
    }
    if (formData.password !== formData.confirmpassword) {
      setErrorMessage("Passwords do not match");
      setShowAlert(true);
      return;
    }
    try {
      const updatedFormData = {
        "email": email,
        "password": formData.password,
      };

      console.log(updatedFormData);
      await actions.changePassword(updatedFormData);
      setErrorMessage("");
      setShowAlert(true);
      await actions.logout();
      
      // Redirigir a la página de inicio
      
    } catch (error) {
      console.error("Error al actualizar el usuario: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await actions.decrypt(token);

          if (response && response.email) {
            // Set the extracted email in the Email state
            setEmail(response.email);
            setRenderComp("changePasswordComp");
          }
        } catch (error) {
          console.error("Error while decoding token:", error);
        }
      }
    };

    fetchData();
  }, [token, actions]);

  return (
    <div className="container vh-100 position-relative overflow-hidden">
      {renderComp === "loader" && (
        <div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
          <img src={loaderbox} alt="" />
        </div>
      )}

      {renderComp === "changePasswordComp" && (
        <div className="container vh-100">
          <div className="row mb-4">
            <div className="col">
              <Link to="/profile">
                <i className="fa-solid fa-arrow-left arrow-back" />
              </Link>
            </div>
          </div>
          <div className="row justify-content-center d-flex justify-content-between">
            <div className="col-md-6 text-start">
              <div className="embed-responsive embed-responsive-16by9">
                <h2 className="bigtext text-line">
                  Change your Secret{" "}
                  <span className="text-color-primary">password</span>
                </h2>
              </div>
            </div>
            {showAlert && (
              <div
                className={`alert ${
                  errorMessage ? "alert-danger" : "alert-success"
                } alert-dismissible fade show`}
                role="alert"
              >
                {errorMessage ? errorMessage : "User updated successfully!"}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowAlert(false);
                    setErrorMessage("");
                  }}
                ></button>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="d-flex justify-content-between mb-2">
                <p className="my-0 me-4">Email:</p>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  style={{ maxWidth: "60%" }}
                  disabled
                />
              </div>
              <div className="d-flex justify-content-between  mb-2">
                <p className="my-0 me-4">New Password:</p>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  style={{ maxWidth: "60%" }}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
              <div className="d-flex justify-content-between  mb-2">
                <p className="my-0 me-4">Confirm Password:</p>
                <input
                  type="password"
                  className="form-control"
                  id="confirmpassword"
                  name="confirmpassword"
                  style={{ maxWidth: "60%" }}
                  value={formData.confirmpassword}
                  onChange={(e) => setFormData({ ...formData, confirmpassword: e.target.value })}
                />
              </div>

              <div className="row  align-items-center mt-4 justify-content-end">
                <div className="col-sm-12 col-md-6  text-center">
                  <button type="submit" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Change Password
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">Updated password</h1>
                </div>
                <div className="modal-body">
                  <p>Your password has been updated. Please go to the login page and sign in.</p>
                </div>
                <div className="modal-footer">
                  <Link to={'/'}><button className="btn btn-primary" data-bs-dismiss="modal">Login</button></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
