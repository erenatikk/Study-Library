import React, { useState } from 'react'
import Axios from 'axios';
import { useSelector } from 'react-redux';


function Randevu() {
  const email = useSelector(state => state.auth.email);
  console.log(email)

  const [date, setDate] = useState(Date.now());
  const [error, setError] = useState(null);
 

  const dbDate = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:3001/dbdate", {
      email: email,
      seat_date: date
    })
      .then((response) => {
        console.log(response);
        setError(response["data"])
        if (error) {
          window.alert(error)
        }
      }, (error) => {
        console.log(error);
      });
  }



  return (
    <form className="row g-3">
      
        {/* <input type="email" className="form-control" id="validationCustom01" required onChange={(e)=>{
          setEmailDate(e.target.value);
        }}/> */}
      
      <div className="col-md-3">
        <label htmlFor="validationCustom05" className="form-label">Date</label>
        <input type="datetime-local" className="form-control" id="validationCustom05" required onChange={(e) => {
          setDate(e.target.value);
        }} />
        <div className="invalid-feedback">
          Please provide a valid date.
        </div>
      </div>

      <div className="col-12">
        <div className="form-check">
          <div className="invalid-feedback">
            You must agree before submitting.
          </div>
        </div>
      </div>
      <div className="col-12">
        <button className="btn btn-primary" type="submit" onClick={dbDate}>Kayıt</button>
      </div>



    </form>
  )
}

export default Randevu;