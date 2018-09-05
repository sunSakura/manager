<?php
require('00_init.php');

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
$sql = "SELECT COUNT(*) FROM index_product WHERE 1=1 ";
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

$sql =  "SELECT pid,title,pic,price,expire";
$sql .= " ,seq_recommended,seq_new_arrival,seq_top_sale";
$sql .= " FROM index_product";
$sql .= " ORDER BY pid DESC LIMIT $start,$count";
$result = mysqli_query($conn,$sql);
 if(!$result){       //SQL语句执行失败
   echo('{"code":500, "msg":"db execute err"}');
   echo mysqli_error($conn);
 }else {
   $list = mysqli_fetch_all($result, MYSQLI_ASSOC);
   $output['data'] = $list;
   echo json_encode($output);
}