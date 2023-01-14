import React,{useState} from 'react'
import Axios from 'axios'
import { useNavigate, Route } from 'react-router-dom';
function Giris() {
  const [passwordLog,setPasswordLog] = useState("");
  const [emailLog,setEmailLog] = useState("");
  console.log(emailLog)
    const navigate = useNavigate();

  
  const login = () =>{
    Axios.post("http://localhost:3001/login",{
      email:emailLog,
      password:passwordLog,
    }).then((response)=>{
      console.log(response);
      navigate("/hakkimizda");
    }, (error) => {
      console.log(error);});
  };

  return (
    <form>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" onChange={(e)=>{
          setEmailLog(e.target.value)}} aria-describedby="emailHelp"/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e)=>{
          setPasswordLog(e.target.value)}}/>
    </div>
    <div className="mb-3 form-check">
      <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
      <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
    </div>
    <button onClick={login} className="btn btn-primary">Submit</button>
  </form>
  )
}

export default Giris