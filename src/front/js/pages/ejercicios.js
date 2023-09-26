import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import {Link} from "react-router-dom";


export const Ejercicios = () => {
  const { store, actions } = useContext(Context);

  return (
  <div className="container-fluid">
  <div className="row">
  <div className="col-sm-12 col-md-4 mt-5">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Fill In The Blank</h5>
        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <p className="d-flex justify-content-center">
        <Link to ={`./fib`}>
          <button className="btn btn-primary mb-4">start</button>
        </Link>
        </p>
      </div>
    </div>
  </div>
  
  
  <div className="col-sm-12 col-md-4 mt-5">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Simple Choice</h5>
        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <p className="d-flex justify-content-center">
          <Link to ={`./sc`}>
          <button className="btn btn-primary mb-4">start</button>
        </Link>
        </p>
      </div>
    </div>
  </div>
  
  
  <div className="col-sm-12 col-md-4 mt-5">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Drag and Droup</h5>
        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <p className="d-flex justify-content-center">
        <Link to ={`./dd`}>
          <button className="btn btn-primary mb-4 ">start</button>
        </Link>
        </p>
      </div>
    </div>
  </div>
  </div>
  
</div>

  );
};
