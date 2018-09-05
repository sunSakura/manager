<?php
require('00_init.php');
@$aid = $_REQUEST["a_aid"];
//ALTER TABLE xz_laptop ADD expire ENUM('0','1') NOT NULL DEFAULT '0';
$sql = "UPDATE  admins  SET  expire = '1'  WHERE a_aid = $aid";
@$result = mysqli_query($conn,$sql);
//echo mysqli_error($conn);
if($result){
    echo '{"code":1,"msg":"删除成功"}';
}else{
    echo '{"code":-1,"msg":"删除失败"}';
}