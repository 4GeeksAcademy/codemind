import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Navbar } from "../component/navbar.js";

export const Usuarios = () => {
  const { store, actions } = useContext(Context);

  return (
      <div className="container">
        <div className="row mb-4">
          <div className="col text-center">
            <h2 className="module-title text-line">Admin</h2>
          </div>
        </div>
        <form className="d-flex col-5 mx-auto">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-secondary" type="submit"><i className="fas fa-search"></i></button>
      </form>
        <div className="mt-4">
        <table className="table table-hover text-white">
          <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">e-mail</th>
            <th scope="col">Progress</th>
            <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody >
            <tr className="seleccion">
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>marcotto@mail.com</td>
            <td>35%</td>
            <td>Teacher</td>
            </tr>
            <tr className="seleccion">
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>jacobthornton@mail.com</td>
              <td>80%</td>
              <td>Student</td>
            </tr>
            <tr className="seleccion">
              <th scope="row">3</th>
              <td>Larry</td>
              <td>Bird</td>
              <td>larrybird@mail.com</td>
              <td>20%</td>
              <td>Student</td>
            </tr>
          </tbody>
        </table>
        </div>
        <div className="d-flex justify-content-center mt-4">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className="page-item"><a className="page-link rounded-circle mx-1 bg-dark border-white text-white" href="#">1</a></li>
            <li className="page-item"><a className="page-link rounded-circle mx-1 bg-dark border-white text-white" href="#">2</a></li>
            <li className="page-item"><a className="page-link rounded-circle mx-1 bg-dark border-white text-white" href="#">3</a></li>
          </ul>
        </nav>
        </div>
      </div>
  );
};
