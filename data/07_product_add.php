<?php
require("00_init.php");
$title = $_REQUEST['title'];
$subtitle = $_REQUEST['subtitle'];
$price = $_REQUEST['price'];
$color = $_REQUEST['color'];
$size = $_REQUEST['size'];
$pname = $_REQUEST['pname'];
$category = $_REQUEST['category'];
$is_onsale = $_REQUEST['is_onsale'];

$sql = "INSERT INTO product VALUES(null,";
$sql .=" $category,'$pname','$title','$subtitle',$price,1528944530,0,";
$sql .=" '$is_onsale','$color','$size',0";
$sql .=" );";

$result = mysqli_query($conn,$sql);
if($result==true){
    echo '{"code":1,"msg":"添加成功"}';
}else{
    echo '{"code":-1,"msg":"添加失败"}';
}
