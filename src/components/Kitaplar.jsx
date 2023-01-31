import React, { useEffect, useRef, useState } from 'react'

import DataTable from 'react-data-table-component';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Axios from 'axios'




const selectProps = { indeterminate: isIndeterminate => isIndeterminate };

function Kitaplar(props) {
    const [columns, setColumns] = useState([]);
    const [pending, setPending] = React.useState(true);
    const [result, setResult] = useState();

    const [resp, setResp] = useState();
    const [dbdata, setDbData] = useState([]);
    const data = [
        {
            id: 1,
            title: dbdata.map((dbdata)=>title),
            year: '1988',


        },
        {
            id: 2,
            title: 'Ghostbusters',
            year: '1984',
        },
    ]

    useEffect(() => {
        const timeout = setTimeout(() => {
            setColumns([
                {
                    name: 'Title',
                    selector: row => row.title,
                    sortable: true,

                },
                {
                    name: 'isbn',
                    selector: row => row.year,
                    sortable: true,
                },
                {
                    name: 'language id',
                    selector: row => row.email,
                    sortable: true,
                },
                {
                    name: 'numpages',
                    selector: row => row.email,
                    sortable: true,
                },
                {
                    name: 'publication date',
                    selector: row => row.email,
                    sortable: true,
                },
                {
                    name: 'publisher id',
                    selector: row => row.email,
                    sortable: true,
                },

            ]);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

    const getAllBooks = (event) => {
        event.preventDefault();
        Axios.get("http://localhost:3001/db-book").
            then((response) => {
                // setResp(response['data']['tmpdata'])
                // console.log(response)
                setDbData(response['data']['result'])
                console.log(response)
            },
                (error) => {
                    console.log(error)
                })
    }


    //  useEffect(()=>{
    //     getAllBooks(); 
    //  },[])
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
            <button onClick={getAllBooks}>GET DATA</button>
            <DataTable
                columns={columns}
                data={data}
                selectableRows
                selectableRowsComponent={Checkbox}
                selectableRowsComponentProps={selectProps}
                dense
                pagination
                highlightOnHover
                {...props}
                button
                progressPending={pending}
            />
        </>
    );
}




export default Kitaplar