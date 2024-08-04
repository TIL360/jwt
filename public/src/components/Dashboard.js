import axios from 'axios'
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom'

const Dashboard = () => {
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
  return (
    <>
 <h1>Dashboard</h1>

 <div>
 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Registration">Registration</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/logout">Logout</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </Link>
</li>        </ul>



 </div>

       {message}
       
 
    
    </>
  )
}

export default Dashboard