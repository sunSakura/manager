<?php
require("00_init.php");
@$pid = $_REQUEST["pid"];
$sql = "SELECT * FROM product  WHERE pid = $pid";
@$result = mysqli_query($conn,$sql);
@$row = mysqli_fetch_assoc($result);
echo json_encode($row);
