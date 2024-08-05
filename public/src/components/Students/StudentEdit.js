import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function StudentEdit() {
  const { id } = useParams(); // Get the student id from the URL
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    adm_no: '',
    name: '',
    standard: '',
  });

  useEffect(() => {
    const fetchStudent = async () => {
      console.log(`Fetching student with ID: ${id}`); // Debug log
      try {
        const response = await axios.get(`http://localhost:5127/students/${id}`);
        console.log(response.data); // Debug log
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
  
    fetchStudent();
  }, [id]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prevStudent => ({ ...prevStudent, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5127/students/${id}`, student);
      navigate('/studentlist'); // Redirect to the student list after success
    } catch (error) {
      console.error("Error updating student data:", error);
    }
  };

  return (
    <div className="container">
      <h1>Edit Student</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Adm No</label>
          <input
            type="text"
            name="adm_no"
            value={student.adm_no}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Standard</label>
          <input
            type="text"
            name="standard"
            value={student.standard}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}
