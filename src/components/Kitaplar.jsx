import React, { useEffect, useRef, useState } from 'react'
import DataTable from 'react-data-table-component';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Axios from 'axios'




const selectProps = { indeterminate: isIndeterminate => isIndeterminate };

function Kitaplar(props) {
    const [columns, setColumns] = useState([]);
    // const [pending, setPending] = React.useState(true);
    const [selectedData, setSelectedData] = React.useState();
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [resp, setResp] = useState();
    const [dbdata, setDbData] = useState([]);

    const data = dbdata?dbdata.map((element, index) => {
        return {
            id: index + 1,
            book_name: element.book_name,
            author: element.author,
            publication_date: element.publication_date,
            language_code: element.language_code,
            count: element.count
        }
    }):window.alert("BOŞ")

    // const handleRowSelected = React.useCallback(state => {
	// 	setSelectedRows(state.selectedRows);
    //     console.log(selectedRows)
	// }, []);
     const handleRowSelected = ({ selectedRows })=>{
        setSelectedRows(selectedRows)
        console.log(selectedRows)
     }
console.log(data)
useEffect(()=>{
    getAllBooks();
    setColumns([
                     {
                         name: 'Book Name',
                         selector: row => row.book_name,
                         sortable: true,
    
                     },
                     {
                         name: 'Author',
                         selector: row => row.author,
                         sortable: true,
                     },
                     {
                         name: 'Publication Date',
                         selector: row => row.publication_date,
                         sortable: true,
                     },
                     {
                         name: 'Language',
                         selector: row => row.language_code,
                         sortable: true,
                     },
                     {
                         name: 'Count',
                         selector: row => row.count,
                         sortable: true,
                     },
                    
                 ]);

},[])

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setColumns([
    //             {
    //                 name: 'Book Name',
    //                 selector: row => row.book_name,
    //                 sortable: true,

    //             },
    //             {
    //                 name: 'Author',
    //                 selector: row => row.author,
    //                 sortable: true,
    //             },
    //             {
    //                 name: 'Publication Date',
    //                 selector: row => row.publication_date,
    //                 sortable: true,
    //             },
    //             {
    //                 name: 'Language',
    //                 selector: row => row.language_code,
    //                 sortable: true,
    //             },
    //             {
    //                 name: 'Count',
    //                 selector: row => row.count,
    //                 sortable: true,
    //             },
                
    //         ]);
    //         setPending(false);
    //     }, 2000);
    //     return () => clearTimeout(timeout);
    // }, [dbdata]);

    const getAllBooks = () => {
        // event.preventDefault();
        console.log("a")
        Axios.get("http://localhost:3001/db-book",{
        }).then((response) => {
                // setResp(response['data']['tmpdata'])
                // console.log(response)
                setDbData(response['data']['result'])
                console.log(response)
            },
                (error) => {
                    console.log(error)
                })
    }
    
     const updateCount = (event) => {
        event.preventDefault();
        console.log(selectedRows[0].book_name)
         Axios.post("http://localhost:3001/update-db-book",{
             selectedRows:selectedRows[0].book_name

         }).then((response) => {
                
                 setDbData(response['data']['result'])
                 console.log(response)
             },
                (error) => {
                    console.log(error)
                })
                getAllBooks(event);
     }

    


    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = columns.filter(
        item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
    );

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        // return (
        // 	<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        // );
    }, [filterText, resetPaginationToggle]);
    return (
        <>
            <button className="btn btn-outline-warning" onClick={getAllBooks}>LİSTELE</button>
            {dbdata?<DataTable
                columns={columns}
                data={data}
                selectableRows 
                onSelectedRowsChange={handleRowSelected}
//selectedRows={handleRowSelected}
                selectableRowsComponent={Checkbox}
                selectableRowsComponentProps={selectProps}
                dense
                pagination
                highlightOnHover
                {...props}
                button
                // progressPending={pending}
            />:<p>Loading</p>}
            <button className="btn btn-outline-warning" onClick={updateCount}>AYIRT</button>
        </>
    );
}




export default Kitaplar