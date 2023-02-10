import React,{useState,useEffect} from 'react'
import './App.css';
import logo from './images/library-logo.png';
import libPhoto from './images/library-photo.png';
import {Link , Route, Routes , useParams} from 'react-router-dom';
import Anasayfa from './components/Anasayfa';
import Kitaplar from './components/Kitaplar';
import Kurallar from './components/Kurallar';
import Hakkimizda from './components/Hakkimizda';
import Randevu from './components/Randevu';
import Giris from './components/Giris';
import Kayit from './components/Kayıt';

const [emailApp , setEmailApp] = useState("");

function App() {

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img className='logo' src={logo}/>
        </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
             <Link className="nav-link active" to="/">Anasayfa</Link> 
            </li>
            <li className="nav-item">
             <Link className="nav-link active" to="/mevcut-kitaplar">Mevcut Kitaplar</Link> 
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/randevu">Randevu</Link> 
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/kutuphane-kurallari">Kütüphane Kuralları</Link> 
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/hakkimizda">Hakkımızda</Link> 
            </li>
          </ul>
          <form className="d-flex mb-3" role="search">
           <Link to="/register"><button className="btn btn-outline-success"  type="submit">Kayıt Ol</button></Link> 
           <Link to="/giris"><button className="btn btn-outline-success" type="submit">Giriş Yap</button></Link>
           <h3>{}</h3>
          </form>
         </div>
        </div>
      </nav>
      <div className="container mt-3">
        <div className="row">
            <Routes>
              <Route path='/' element={<Anasayfa/>} exact/>
              <Route path='/mevcut-kitaplar' element={<Kitaplar/>}/>
              <Route path='/kutuphane-kurallari' element={<Kurallar/>}/>
              <Route path='/hakkimizda' element={<Hakkimizda/>}/>
              <Route path='/randevu' element={<Randevu/>}/>
              <Route path='/giris' element={<Giris/>}/>
              <Route path='/register' element={<Kayit/>}/>
            </Routes>
        </div>  
      </div>
      
    </div>
  );
}

export default App;
