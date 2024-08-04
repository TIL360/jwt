import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5127/logindb', { name, password }, { withCredentials: true });
      if (res.data.Login) {
        navigate("/dashboard");
      } else {
        navigate('/');
      }
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  };

  return (
    <>
      <div className="container col-md-4 mh-100 my-5" style={{ boxShadow: "2px 2px 2px 2px" }}>
        <h1 className="my-4 text-center">Login Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="User Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <br /><br />
      </div>
    </>
  );
};

export default Login;
