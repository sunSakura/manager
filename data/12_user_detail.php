<?php
require("00_init.php");
@$aid = $_REQUEST["a_aid"];
//ALTER TABLE xz_laptop ADD expire ENUM('0','1') NOT NULL DEFAULT '0';
$sql = "SELECT * FROM admins  WHERE a_aid = $aid";
@$result = mysqli_query($conn,$sql);
@$row = mysqli_fetch_assoc($result);
echo json_encode($row);
