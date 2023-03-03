import React , { useState,useEffect } from 'react'
import Axios from 'axios';
import { useNavigate, Route ,Navigate} from 'react-router-dom';


function Kayıt() {

  const [userNameReg,setUserName] = useState("");
  const [passwordReg,setPassword] = useState("");
  const [emailReg,setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const[resp,setResp] = useState(false);
  // console.log(resp)

  useEffect(() => {
    if (resp==true) {
      navigate("/giris")
      window.alert("Giriş Başarılı")
    }
    else {
      navigate("/register")
      // window.alert("Eposta daha önceden kayıtlı")
     
    }
  }, [resp])



  const register = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:3001/register", {
      username: userNameReg,
      password: passwordReg,
      email: emailReg,

    }).then((response) => {
      setResp(response)
      console.log(response);
      if (error) {
        window.alert(error)
      }
    }, (error) => {
      console.log(error);
    });
  };


  return (
    <form>
        <div className="mb-3">
        <label htmlFor="userName" className="form-label">İsim Soyisim</label>
        <input type="text" className="form-control" id="exampleInputUserName" aria-describedby="emailHelp" onChange={(e)=>{
          setUserName(e.target.value);
        }}/>
        </div>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>{
          setEmail(e.target.value)}}/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e)=>{
          setPassword(e.target.value)}}/>
    </div>
    <div className="mb-3 form-check">
      <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
      <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
    </div>
    <button className="btn btn-primary" onClick={register}>Submit</button>
  </form>
  )
}


export default Kayıt
