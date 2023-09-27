import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import {Link} from "react-router-dom";


export const Ejercicios = () => {
  const { store, actions } = useContext(Context);
  let [listItems, SetListItems] = useState([
    "fib",
    "sc",
    "dd"
  ])
  
  return (
  <div className="container-fluid">
      <h2 className="mt-5 mx-auto text-center">PREGUNTAS</h2>
      <div className="row">
      {store.tipoPreguntas.map((item,indice)=>
      <div className="card bg-secondary flex-fill bd-highlight col-md-3 mt-5 mx-2 " key={indice}>
      <div><img className="card-img mt-3 p-3" src="http://3.bp.blogspot.com/--d_5KLDVwUI/Vls88yeweUI/AAAAAAAAAqg/ISientf4PTM/s1600/DragAndDrop.png" style={{"maxWidth":"400px"}} alt="Card image"/></div>
      <div>
      <h3 className="card-title text-center text-white mb-3">{item.name}</h3>
      <p className="card-text text-white"> Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500</p>
      <div className="d-flex justify-content-center mb-3">
        <Link to ={`./${item.siglas}`}>
          <button className="btn btn-primary btn-lg ">start</button>
        </Link> 
        </div>
        </div>
      
      </div>)}
      </div>
  </div>

  // <div className="container-fluid">
  //     <h2 className="mt-5 mx-auto text-center">PREGUNTAS</h2>
  //     <div className="row">
  //     {store.tipoPreguntas.map(item=>
  //     <div className="card flex-fill bd-highlight col-md-3 mt-5 mx-2 ">
  //       <h3 className="card-title text-center mt-3">{item.name}</h3>
  //     <div><img className="card-img" src="http://3.bp.blogspot.com/--d_5KLDVwUI/Vls88yeweUI/AAAAAAAAAqg/ISientf4PTM/s1600/DragAndDrop.png" style={{"maxWidth":"480px"}} alt="Card image"/></div>
  //     <div className="card-body d-flex justify-content-between">
  //     <div>
  //     <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
  //       Description
  //     </button>
  //     <div className="collapse" id="collapseExample">
  //     <div className="card-text">
  //     Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.
  //     </div>
  //     </div>
  //     </div>
  //     <div className=" mb-0">
  //       <Link to ={`./${item.siglas}`}>
  //         <button className="btn btn-primary mb-3">start</button>
  //       </Link> 
  //       </div>
  //       </div>
  //     </div>)}
  //     </div>
  // </div>

  );
};
