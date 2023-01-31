var express = require('express');
var router = express.Router();

var database = require('../index.js');


router.get('/get_data',function(request,response,next){
    var draw = request.query.draw;

    var start = request.query.start;

    var length = request.query.length;

    var order_data = request.query.order;

    if(typeof order_data == 'undefined')
    {
        var column_name = 'book.book_id';

        var column_sort_order = 'desc';
    }

    else
    {
        var column_index = request.query.order[0]['column'];

        var column_name = request.query.columns[column_index]['data'];

        var column_sort_order = request.query.order[0]['dir'];
    }

    var search_value = request.query.search['value'];

    var search_query = `
     AND (
      title LIKE '%${search_value}%' 
      OR isbn13 LIKE '%${search_value}%' 
      OR language_id LIKE '%${search_value}%'
      OR num_pages LIKE '%${search_value}%'
     )
    `;
    database.query("SELECT COUNT(*) AS Total FROM book", function(error, data){

        var total_records = data[0].Total;

        //Total number of records with filtering

        database.query(`SELECT COUNT(*) AS Total FROM book WHERE 1 ${search_query}`, function(error, data){

            var total_records_with_filter = data[0].Total;

            var query = `
            SELECT * FROM book 
            WHERE 1 ${search_query} 
            ORDER BY ${column_name} ${column_sort_order} 
            LIMIT ${start}, ${length}
            `;

            var data_arr = [];

            database.query(query, function(error, data){

                data.forEach(function(row){
                    data_arr.push({
                        'title' : row.title,
                        'isbn13' : row.isbn13,
                        'language_id' : row.language_id,
                        'num_pages' : row.num_pages
                    });
                });

                var output = {
                    'draw' : draw,
                    'iTotalRecords' : total_records,
                    'iTotalDisplayRecords' : total_records_with_filter,
                    'aaData' : data_arr
                };

                respnse.json(output);

            });

        });

    });

});

module.exports = router;