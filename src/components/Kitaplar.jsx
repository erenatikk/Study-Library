import React from 'react'
import $ from 'jquery'

 
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

function Kitaplar() {
    $(document).ready(function () {
        setTimeout(function(){
        $('#example').DataTable();
         } ,1000);})
  return (
    
      <div>
        <table id="table_id" className='MainDiv'>
            <thead>
                <tr>
                    <th>Column 1</th>
                    <th>Column 2</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Row 1 Data 1</td>
                    <td>Row 1 Data 2</td>
                </tr>
                <tr>
                    <td>Row 2 Data 1</td>
                    <td>Row 2 Data 2</td>
                </tr>
            </tbody>
        </table>
      </div>
  )
}

export default Kitaplar