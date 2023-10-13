import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Navbar } from "../component/navbar.js";

export const Student = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getTeachersStudents(store.user.id);
  }, [store.user.id]);

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col text-center">
          <h2 className="module-title">Students</h2>
        </div>
      </div>
      <form className="d-flex col-5 mx-auto">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-secondary" type="submit"><i className="fas fa-search"></i></button>
      </form>
      <div className="mt-4">
      {console.log("store.teacherData:", store.teacherData)} {/* Agregado para verificar store.teacherData */}
      {console.log("store.teacherData.students:", store.teacherData && store.teacherData.teacher[0].students)} {/* Agregado para verificar store.teacherData.students */}
        {store.teacherData && store.teacherData.teacher[0].students && store.teacherData.teacher[0].students.length > 0 ? (
          <table className="table table-hover text-white">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">e-mail</th>
              </tr>
            </thead>
            <tbody>
              {store.teacherData.teacher[0].students.map((student, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No tienes estudiantes aún.</p>
        )}
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
