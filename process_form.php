<?php
include ("functions.php");

// if (isset($_POST['params'])) {
//     $params = $_POST['params'];
//     $group = $_POST['group_id'];
//     $stage = $_POST['stage'];
//     printf("<p>".$params."</p>");
//     printf("<p>".$group."</p>");
//     printf("<p>".$stage."</p>");
// }

$conn = connectToServer(to_print: true);

$col_names = array("GroupID", "Stage", "TrackWidth", "WheelBase", "RoofHeight", "SuspensionTravel", "MaxTorque", "Gearing", "TireDia", "EnergyCapacity", "FrameRailThick", "BodyPanelThick");
$params_array = explode(",",$params);
$db_values = array($group, $stage);
$db_values = array_merge(array($group, $stage), $params_array);
$query = insertParams("configs", $col_names, array($db_values));
$conn->query($query);
?>