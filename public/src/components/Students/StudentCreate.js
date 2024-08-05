import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function StudentCreate() {
  const [admno, setAdmNo] = useState();
  const [name, setName] = useState();
  const [standard, setStandard] = useState();
  
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5127/studentcreate', {admno, name, standard})
    .then((res)=>{
      navigate('/studentlist')
    })
    .catch((err)=>{
      console.log(err)
    })


  }


  return (
    <>
      <div className="card col-md-8 mx-auto">
        <div className="card-header">
          <div className="col-md-12">
            <h2 className="text-center">Add Student</h2>
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={handlesubmit}>
        <div>
          <label className="form-control">
            <b>Adm No</b>
          </label>
          <input className="form-control" 
          type="text" 
          placeholder="Adm No..."
          onChange={(e)=>setAdmNo(e.target.value)} />
        </div>

        <div>
          <label className="form-control">
            <b>Student Name</b>
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Student Name..."
            onChange={(e)=>setName(e.target.value)}
          />
        </div>
        <br />

        <div>
          <label className="form-control">
            <b>Standard</b>
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Standard Name..."
            onChange={(e)=>setStandard(e.target.value)}
          />
        </div>
        <br />

       
        <div>
          <button className="btn btn-primary">Add Record</button>
        </div>
        </form>
        </div>
      </div>
    </>
  );
}
