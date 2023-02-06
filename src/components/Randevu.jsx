import React ,{ useState } from 'react'
import Axios from 'axios';


function Randevu() {

  const [emailDate , setEmailDate] = useState("");
  const [date , setDate] = useState( Date.now());
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const dbDate = (event) =>{
    event.preventDefault();
    Axios.post("http://localhost:3001/dbdate",{
      email:emailDate,
      seat_date:date,
      
      
    })
    .then((response)=>{
      console.log(response);
      setError(response["data"])

    }, (error) => {
      console.log(error);
       });
  }

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
                                 
  return (
    <form className="row g-3">
      <div className="col-md-4">
        <label htmlFor="validationCustom01" className="form-label">Email</label>
        <input type="email" className="form-control" id="validationCustom01" required onChange={(e)=>{
          setEmailDate(e.target.value);
        }}/>
          <div className="valid-feedback">
            Looks good!
          </div>
      </div>
      <div className="col-md-3">
        <label htmlFor="validationCustom05" className="form-label">Date</label>
        <input type="datetime-local" className="form-control" id="validationCustom05" required onChange={(e)=>{
          setDate(e.target.value);
        }}/>
          <div className="invalid-feedback">
            Please provide a valid date.
          </div>
      </div>
      
      <div className="col-12">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
            <label className="form-check-label" htmlFor="invalidCheck">
              Agree to terms and conditions
            </label>
            <div className="invalid-feedback">
              You must agree before submitting.
            </div>
        </div>
      </div>
      <div className="col-12">
        <button className="btn btn-primary" type="submit" onClick={dbDate}>Submit form</button>
      </div>
      
    <div className="alert alert-info" role="alert" data-mdb-position="top-right" data-mdb-stacking="true"
  data-mdb-width="535px"
  data-mdb-append-to-body="true"
  data-mdb-hidden="true"
  data-mdb-autohide="true">

      {error && <p className="error">{error}</p>}
      
      </div>
      <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome back!</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Please log in</h1>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
    </form>
  )
} 

export default Randevu;