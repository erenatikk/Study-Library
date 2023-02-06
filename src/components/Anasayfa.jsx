import React from 'react'
import libPhoto from '../images/library-photo.png';

function Anasayfa() {
  return (
    <div className='container'>
      <div className="row">
        <div className="col-mt-12">
          <div className="">
            <img className='lib-photo' src={libPhoto}/>
          </div>
          <div className="duyuru-listesi">
            <div className="duyuru-header">
              Duyurular
            </div>
            <div className='duyuru-icerik'> 
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Anasayfa