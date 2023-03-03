import React from 'react'
import libPhoto from '../images/library-photo.png';

function Anasayfa() {
  return (
    <div className='container'>
      <div className="row">
        <div className="col-mt-12">
          <div className="mx-auto">
            <img className='lib-photo' src={libPhoto}/>
          </div>
          <div className="duyuru-listesi">
            <div className="duyuru-header">
              Duyurular
            </div>
            <div className='duyuru-icerik'> 
              -Oturma planları güncellendi.<br/><br/>
              -Yeni kitaplar sisteme eklendi.<br/><br/>
              -Kurallar güncellendi.<br/><br/>
              -Kütüphane kayıt şartlarını okuyunuz.
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Anasayfa