
$(document).ready(function(){
    // Document is loaded, ready to run more code

    var search_query = '';
    var selected_year = 0;

    $("#search-form").on("submit", function(e){
        e.preventDefault(); // prevent form refresh
    });

    // On keyup start search cars
    $("#search-form #search-nickname").on("keyup", function(){
        search_query = $(this).val();
        cool_search();
    }); // end of search keyup

    // on Change of select field
    $("#year-select").on("change", function(){
        selected_year = $(this).val();
        cool_search();
    });

    /*
     *  cool_search
     *  send search query to search.php
     *  return json results
     */
    function cool_search() {

        $.post(
            'ajax/search.php', // URL of file to call
            {
                search: search_query,
                year: selected_year
            }, // Data to be passed to file via POST
            function(car_data){ // On Complete function(returned data)
                if(car_data == "") return;

                var cars = JSON.parse(car_data); // Translates PHP JSON into usable Javascript JSON
                var table_rows = '';
                        // for each( index, object)
                $.each(cars, function(i, car){
                    table_rows += "<tr><td>"+car.make+"</td><td>"+car.model+"</td><td>"+car.year+"</td><td>"+car.nickname+"</td></tr>";
                });

                $("#search-results").html(table_rows);
            }
        ); // end $.post

    } // End of cool_search

}); // end of document ready
