<?php
require('00_init.php');
@$pid = $_REQUEST["pid"];
//ALTER TABLE xz_laptop ADD expire ENUM('0','1') NOT NULL DEFAULT '0';
$sql = "UPDATE  index_product  SET  expire = '1'  WHERE pid = $pid";
@$result = mysqli_query($conn,$sql);
if($result){
    echo '{"code":1,"msg":"删除成功"}';
}else{
    echo '{"code":-1,"msg":"删除失败"}';
}