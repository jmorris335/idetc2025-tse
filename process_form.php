<?php
include ("functions.php");

if (isset($_POST['params'])) {
    $params = $_POST['params'];
    $group = $_POST['group_id'];
    $stage = $_POST['stage'];
    printf("<p>".$params."</p>");
    printf("<p>".$group."</p>");
    printf("<p>".$stage."</p>");
}

printf("<p> WORDS2 </p>");

$conn = connectToServer(to_print: true);
$conn->query("USE tseworkshop;");

$col_names = array("GroupID", "Stage", "TreadWidth", "WheelBase", "RoofHeight", "SuspensionTravel", "MaxTorque", "Gearing", "TireDia", "EnergyCapacity", "FrameRailThick", "BodyPanelThick");
$db_values = array_merge(array($group, $stage), $params);
insertParams("configs", $col_names, $params, $conn);
?>