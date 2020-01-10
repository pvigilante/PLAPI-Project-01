<?php
require_once("../conn.php");

// if $_POST["search"] isset and is not blank
$search = isset($_POST["search"]) && $_POST["search"] != "" ? $_POST["search"] : false;
$search_model = isset($_POST["search_model"]) && $_POST["search_model"] != "" ? $_POST["search_model"] : false;
$year = isset($_POST["year"]) ? $_POST["year"] : false;


$search = $db->real_escape_string(trim($search)); // Prevents mysql injection attacks
$search_model = $db->real_escape_string(trim($search_model));


if($search || $year || $search_model) {
    $search_sql = "SELECT * FROM cars
                   WHERE nickname LIKE '%$search%' AND CONCAT_WS('', make, model) LIKE '%$search_model%'";
    
    if($year != 0) {
        $search_sql .= " AND year = $year";
    }
    
} else {
    $search_sql = "SELECT * FROM cars";
}


$result = $db->query($search_sql);

$cars = array();
while($row = $result->fetch_assoc()){
    $cars[] = $row; // append row to the $cars array
}
$db->close(); // Close connection when finished

echo json_encode($cars); // return results in JavaScript Object-Notation
?>