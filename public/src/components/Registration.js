import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Registration = () => {
const [name, setName] = useState();
const [password, setPassword] = useState();
const navigate = useNavigate;

//form submit function 
const handlesubmit = (e) =>{
  e.preventDefault()
  axios.post('http://localhost:5127/registerdb', {name, password})
  .then(res => {
    navigate('/login')
  })
  .catch(err => console.log(err))
 }


  return (
    <>
      <div className="container col-md-4 mh-100 my-5" style={{boxShadow:"2px 2px 2px 2px"}}>
        
        <h1 className="my-4 text-center">Registeration Page</h1>
        <form onSubmit={handlesubmit}>
          <div className="form-group">
            <label>User Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="User Name"
              onChange={(e)=>setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <br/><br/>
      </div>
    </>
  );
};
export default Registration;
