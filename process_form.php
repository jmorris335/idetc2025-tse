<?php
if (isset($_POST['params'])) {
    $params = $_POST['params'];
    printf("<p>".$params."</p>");
    printf("<p>".$_POST['params']."</p>");
}

printf("<p> WORDS </p>");

// $conn = connectToServer(to_print: false);
// $conn->query("USE TSEWorkshop;");

// $col_names = getColumnLabels("Configs", $conn, "TSEWorkspace");
// insertParams("Configs", $col_names, $params, $conn);

/**
 * Connects to the MySQL server using the username "root" with the same password. The programmer must close the connection after use.
 * 
 * @param string $servername = "localhost" Name of the server
 * @param string $username = "root" Username of database user
 * @param string $password = "root" Password of database user
 * @param string $to_print = true Prints to the screen if successfully connected.
 * @param int $port = 8889 Port number
 *  
 * @return mysqli::construct The connection to the database 
 */
function connectToServer(string $servername = "localhost", string $username = "root", string $password = "root", bool $to_print = true, int $port = 8889) {       
    // Create connection for Windows
    if(OSisWindows()) {    
        $conn = new mysqli("localhost","root","root",null,8889);  
        // Check connection  
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        if ($to_print) {
            echo "Connected successfully";
        }
    }
    // Create connection for other OS
    else {
        $conn = new mysqli($servername, $username, $password, null, $port);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        if ($to_print) {
            echo "Connected successfully";
        }
    }
    return $conn;
}

    /**
 * Returns true if the current OS is a Windows platform, otherwise returns false
 */
function OSisWindows() {
    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
        return true;
    } else {
        return false;
    }
}

    /**
 * Forms an general insert query for each value in the inputted array
 * 
 * @param string $table_name The name of the table the values are to be inserted into
 * @param array $col_set The name of each column where you want to insert into, as a string
 * @param array $values_set A 2D array, where each item is an array of connected entities. Each entity must be ordered according to the order of the database table.
 * @return string the formatted query
*/
function insertParams(string $table_name, array $col_set, array $values_set, mysqli $conn) {
    $col_str = "";
    foreach ($col_set as $col) {
        $col_str .= $col;
        if ($col != $col_set[count($col_set) - 1]) {
            $col_str .= ", ";
        }
    }

    $values_str = "";
    foreach($values_set as $row) {
        $values_str = $values_str."(";
        for ($i = 0; $i < count($row); $i++) {
            if (is_string($row[$i])) {
                $values_str .= "\"$row[$i]\"";
            }
            elseif ($row[$i] instanceof DateTimeImmutable || $row[$i] instanceof DateTime ) {
                $date_str = $row[$i]->format("Y-m-d H:i:s.v");
                $values_str .= $date_str;
            }
            else {
                $values_str .= strval($row[$i]);
            }
            if ($i != count($row) - 1) {
                $values_str .= ",";
            }
        }
        $values_str .= ")";
        if ($row != $values_set[count($values_set) - 1]) {
            $values_str = $values_str.",";
        }
    }
    
    $query = "INSERT INTO TSEWorkshop.$table_name ($col_str) VALUES $values_str;";
    $conn->query($query);
    return $query;
}

/**
 * Returns the name of each columns in the table.
 * 
 * @param string $table_name The name of the table in the database
 * @param mysqli $conn Connection to the server
 * @param string $database_name = "3DPrinterDT", the name of the database where the table is stored
 * @return array An ordered array of strings, where each item is a column label
 */
function getColumnLabels(string $table_name, mysqli $conn, string $database_name= "TSEWorkspace") {
    $col_labels = array();
    $query = "SHOW COLUMNS FROM $database_name.$table_name;";
    $results = $conn->query($query);
    $rows = $results->fetch_all(MYSQLI_BOTH);
    foreach ($rows as $row) {
        array_push($col_labels, $row["Field"]);
    }
    return $col_labels;
}

?>