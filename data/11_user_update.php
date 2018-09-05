<?php
require('00_init.php');
@$aid = $_REQUEST["a_aid"];
@$old_pwd = $_REQUEST["old_pwd"];
@$new_pwd = $_REQUEST["new_pwd"];
//echo "|".$new_pwd."|";
$sql = "SELECT * FROM admins WHERE auwpd = '$old_pwd'";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
if($row==null){
    echo '{"code":-1,"msg":"旧密码有误"}';
    exit; 
}else{
    $sql = "UPDATE  admins  SET  auwpd = '$new_pwd'  WHERE a_aid = $aid";
    $result = mysqli_query($conn,$sql);
    echo '{"code":1,"msg":"更新成功"}';
}
