<?php
require('00_init.php');
/**
*分页显示所有的笔记本商品信息
*/
@$kw = $_REQUEST['kw'];
@$pno = $_REQUEST['pno'];
if(!$pno){
  $pno = 1;
}else {
  $pno = intval($pno);
}
@$low = $_REQUEST['low'];
if(!$low){
  $low = 0;
}else {
  $low = intval($low);
}
@$high = $_REQUEST['high'];
if(!$high){
  $high = 100000000;
}else {
  $high = intval($high);
}




@$pageSize = $_REQUEST['pageSize'];
if(!$pageSize){
  $pageSize = 10;
}else {
  $pageSize = intval($pageSize);
}

$output = [
  'recordCount' => 0,     //满足条件的总记录数
  'pageSize' => $pageSize,        //每页大小，即每页最多可以显示的记录数量
  'pageCount' => 0,       //总页数
  'pno' => $pno,          //当前数据所在页号
  'data' => null          //当前页中的数据
];

//获取总记录数
$sql = "SELECT COUNT(*) FROM product WHERE 1=1 ";
if($kw){
  $kw = urldecode($kw);
  $sql .= " AND title LIKE '%$kw%'";
}
if($low){
  $low = urldecode($low);
  $sql .= " AND price >= $low ";
}
if($high){
  $high = urldecode($high);
  $sql .= " AND price <= $high ";
}



$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_row($result);
$output['recordCount'] = intval($row[0]);

//计算总页数
$output['pageCount'] = ceil($output['recordCount']/$output['pageSize']);

//获取指定页中的数据
$start = ($output['pno']-1)*$output['pageSize'];
$count = $output['pageSize'];

$sql =  "SELECT pid,title,price,color,size,sold_count";
$sql .= ",is_onsale,expire,p.pname FROM product p LEFT";
$sql .= " JOIN pro_laptop l ON l.lid=p.lid ";
$sql .= " WHERE 1=1 ";
$sql .= ($kw?" AND title LIKE '%$kw%'":"");
$sql .= ($low?" AND price >= $low ":"");
$sql .= ($high?" AND price <= $high ":"");
$sql .= " ORDER BY sold_count DESC LIMIT $start,$count";

$result = mysqli_query($conn,$sql);
 if(!$result){       //SQL语句执行失败
   echo('{"code":500, "msg":"db execute err"}');
   echo mysqli_error($conn);
 }else {
   $list = mysqli_fetch_all($result, MYSQLI_ASSOC);
   for($i=0; $i<count($list); $i++){
     $lid = $list[$i]['pid'];
     $sql = "SELECT md FROM product_pic WHERE pid=$lid LIMIT 0,1";
     $result = mysqli_query($conn, $sql);
     $list[$i]['pic'] = mysqli_fetch_row($result)[0];
   }
   $output['data'] = $list;
   echo json_encode($output);
}