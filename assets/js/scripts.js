
$(document).ready(function(){
    // Document is loaded, ready to run more code

    var search_query = '';
    var search_model = '';
    var selected_year = 0;
    var car_id = false;

    cool_search();

    $("#search-form").on("submit", function(e){
        e.preventDefault(); // prevent form refresh
    });

    // On keyup start search cars
    $("#search-form #search-nickname").on("keyup", function(){
        search_query = $(this).val();
        cool_search();
    }); // end of search keyup

    // On keyup start search cars
    $("#search-form #search-model").on("keyup", function(){
        search_model = $(this).val();
        cool_search();
    }); // end of search keyup

    // on Change of select field
    $("#year-select").on("change", function(){
        selected_year = $(this).val();
        cool_search();
    });


    // On Delete Button Click
    $("#search-results").on("click", "[data-action=delete]", function(){
        car_id = $(this).data("car");
        $("#deleteCarAlert").modal("show");
    });

    // On Delete Confirmation click
    $("#deleteCarAlert").on("click", "[data-action=confirm-delete]", function(){
        console.log(car_id);
        $.ajax({
            url: "ajax/delete.php",
            type: "POST",
            data:{
                id: car_id
            },
            success: function(result){
                console.log(result);
                $("#deleteCarAlert").modal("hide");
                car_id = false;
                cool_search();
            }
        });
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
                search_model: search_model,
                year: selected_year
            }, // Data to be passed to file via POST
            function(car_data){ // On Complete function(returned data)
                if(car_data == "") return;

                var cars = JSON.parse(car_data); // Translates PHP JSON into usable Javascript JSON
                var table_rows = '';
                        // for each( index, object)
                $.each(cars, function(i, car){
                    table_rows += "<tr><td>"+car.make+
                                  "</td><td>"+car.model+
                                  "</td><td>"+car.year+
                                  "</td><td>"+car.nickname+
                                  "</td><td>"+
                                  "<button class='btn btn-danger' data-action='delete' data-car='"+car.id+"'><i class='fas fa-trash'></i></button>"+
                                  "</td></tr>";
                });

                $("#search-results").html(table_rows);
            }
        ); // end $.post

    } // End of cool_search

}); // end of document ready
