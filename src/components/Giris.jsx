import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate, Route, useLocation } from 'react-router-dom';
import App from '../App';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';



function Giris() {

  const [passwordLog, setPasswordLog] = useState("");
  const [emailLog, setEmailLog] = useState("");
  const [error, setError] = useState(null);


  const dispatch = useDispatch();



  const navigate = useNavigate();

  const [resp, setResp] = useState(false);
console.log(resp)

  const callMail = (value) => {
    setEmailLog(value)
    // dispatch(authActions.setEmail(value))


  }
  
  useEffect(() => {
    if (resp) {
      navigate("/hakkimizda")
      window.alert("Giriş Başarılı")
    }
    else {
      navigate("")
      

    }
  }, [resp])

 
  const login = (event , value) => {
    event.preventDefault();
    dispatch(authActions.setEmail(emailLog))
    Axios.post("http://localhost:3001/login", {
      email: emailLog,
      password: passwordLog,
    }).then((response) => {
      setResp(response['data']['usr'])
      console.log(response)
      if(response['data']['usr']==false){
        window.alert("Şifre Yanlış")
      }
      if (error) {
        window.alert(error)
      }
    }, (error) => {
      console.log(error);
    });
  };



  return (

    <form onSubmit={login}>

      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" onChange={(e) => {
          callMail(e.target.value)
        }} aria-describedby="emailHelp" />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => {
          setPasswordLog(e.target.value)
        }} />
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
      </div>
      <button className="btn btn-primary">Submit</button>


    </form>
  )
}

export default Giris;