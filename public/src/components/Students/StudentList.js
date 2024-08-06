import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StudentList() {
  const [message, setMessage] = useState()
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:5127/dashboard')
        .then(res => {
            //console.log(res)
            if(res.data.valid) {
                setMessage(res.data.message)
            } else {
                navigate('/login')
            }
        })
        .catch(err => console.log(err))
    })


  const [students, setStudents] = useState([]);


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5127/students');
        setStudents(response.data); // Assuming the data you need is in response.data
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleclick = (e) => {
    e.preventDefault();
    navigate('/studentcreate');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5127/students/${id}`);
      setStudents(students.filter(student => student.id !== id)); // Update the state to remove the deleted student
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/studentedit/${id}`); // Navigate to the edit page specific to the student
  };

  return (
    <>
    {message}
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1>Students Data</h1>
            </div>
            <div className="col-md-6">
              <button className="btn btn-primary" onClick={handleclick}>Add New</button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Id</th>
                <th>Adm No</th>
                <th>Name</th>
                <th>Standard</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}> {/* Assuming 'id' is a unique identifier */}
                  <td>{student.id}</td>
                  <td>{student.adm_no}</td>
                  <td>{student.name}</td>
                  <td>{student.standard}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleEdit(student.id)}>Edit</button>
                    <button 
                      className="btn btn-danger"
                      onClick={() => handleDelete(student.id)} // Pass the student id to handleDelete
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
