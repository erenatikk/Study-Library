import React, { useEffect, useRef } from 'react'
import "datatables.net"
import "datatables.net-dt"
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'

 function Kitaplar(props) {
 
    $.DataTable = require('datatables.net')
    const tableRef = useRef()
    // console.log(tableRef)
    const tableName = "table1"
     
    useEffect(() => {
        console.log(tableRef.current)
        const table = $(`#${tableName}`).DataTable(
            {
                data: props.data,
                    columns: [
                        { title: "Book ID"},
                        { title: "Book Name"},
                        { title: "Author"},
                        { title: "Language"},
                        { title: "Start data"},
                        { title: "Salary"}
                    ],
                    destroy: true,  // I think some clean up is happening here
                    searching: false
            }
        )
        // Extra step to do extra clean-up.
        return function() {
            console.log("Table destroyed")
            table.destroy()
        }
    },[])
        return (
            <div>
                <table className="display" width="100%" id={tableName} ref={ tableRef }></table>
            </div>
             
        )
    }


// function Kitaplar() {
   
//   return (   
    
//     //   <div>
//     //     <table id="#table_id" className='MainDiv'>
//     //         <thead>
//     //             <tr>
//     //                 <th>Column 1</th>
//     //                 <th>Column 2</th>
//     //             </tr>
//     //         </thead>
//     //         <tbody>
//     //             <tr>
//     //                 <td>Row 1 Data 1</td>
//     //                 <td>Row 1 Data 2</td>
//     //             </tr>
//     //             <tr>
//     //                 <td>Row 2 Data 1</td>
//     //                 <td>Row 2 Data 2</td>
//     //             </tr>
//     //         </tbody>
//     //     </table>
//     //   </div>   
//   )
// }

 export default Kitaplar