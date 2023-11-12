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

  useEffect(() => {
    actions.getProgresoStudents();
  }, []);

  return (
    <div className="container mt-5">
    <div className="row mb-4">
      <div className="col text-center">
        <h2 className="module-title">Students</h2>
      </div>
    </div>

    <div className="mt-4">
      {store.teacherData && store.teacherData.teacher[0].students && store.teacherData.teacher[0].students.length > 0 ? (
        <table className="table table-responsive text-white">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">E-mail</th>
              <th scope="col">Progress</th>
            </tr>
          </thead>
          <tbody className="">
            {store.teacherData.teacher[0].students.map((student, index) => (
              <tr className="table-hover" key={index}>
                <th scope="row">{index + 1}</th>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
                <td>{store.progressStudents[index]} %</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tienes estudiantes aún.</p>
      )}
    </div>
  </div>
);
};