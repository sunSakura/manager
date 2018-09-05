<?php 
require("00_init.php");
$mypic = $_FILES["mypic"]; 
if(!empty($mypic)){ 
    $picname = $_FILES['mypic']['name']; 
    $picsize = $_FILES['mypic']['size']; 
    if ($picsize > 512000) { 
        echo '{"code":-1,"msg",""图片大小不能超过500k"}'; 
        exit; 
    } 
    $type = strstr($picname, '.'); 
    if ($type != ".gif" && $type != ".jpg"&& $type != ".png") { 
        echo '{"code":-2,"msg","上传文件格式不正确"}'; 
        exit; 
    } 
    $pics =  time().rand(1,9999). $type; 
    //上传路径 
    $pic_path = "img/index/". $pics; 
    move_uploaded_file($mypic["tmp_name"],"../".$pic_path);
    //echo json_encode($pic_path); 
    $title = $_REQUEST["title"];
    $cid =  $_REQUEST["cid"];
    $sql = "UPDATE   index_carousel SET title='$title',img='$pic_path' ";
    $sql .= " WHERE cid = $cid";
    $result = mysqli_query($conn,$sql);
    echo '{"code":1,"msg","上传成功"}'; 
} 
?> 