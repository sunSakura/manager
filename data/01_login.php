<?php

//获取初始数据
require("00_init.php");

//获取用户输入的数据 用户名／密码／验证码
@$u = $_REQUEST["uname"];
@$p = $_REQUEST["upwd"];
// @$v = $_REQUEST["vcode"];//输入次数
// @$code = $_REQUEST["code"];//用户输入的验证码


//验证用户名密码验证码
// $uPattern='/[a-z0-9]{3,12}/';
// $pPattern='/[a-z0-9]{3,12}/';
// $vPattern='/[a-z0-9]{4}/';

// if(!preg_match($uPattern,$u)){
//     echo '{"code":-2,"msg":"用户名格式不正确"}';
//     exit;
// }

// if(!preg_match($pPattern,$p)){
//     echo '{"code":-2,"msg":"密码格式不正确"}';
//     exit;
// }

// if($v>4){
//  @$sessionFailCount = $_SESSION["failCount"];
//  if($sessionFailCount!=$code){
//     echo '{"code":-3,"msg":"验证码有误"}';
//     exit;
//  }
// }


//验证用户和密码是否正确
$sql = "SELECT * FROM admins  WHERE aname='$u' AND auwpd='$p'";
@$result = mysqli_query($conn,$sql);
@$row = mysqli_fetch_assoc($result);
if($row==null){
    echo '{"code":-2,"msg":"用户名或密码有误"}';
}else{
    $uid = $row["a_aid"];
    echo '{"code":1,"msg":"登录成功","uid":'.$uid.'}';
}
?>