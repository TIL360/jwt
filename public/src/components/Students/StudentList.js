import React, { useEffect, useState } from "react";
import axios from "axios";

export default function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5127/students');

        setStudents(response.data); // assuming the data you need is in response.data
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1>Students Data</h1>
            </div>
            <div className="col-md-6"></div>
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
                    {/* Add action buttons here, like edit or delete */}
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger">Delete</button>
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
