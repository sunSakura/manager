
var uid = sessionStorage.getItem("uid");
if(!uid){
  location.href = "index.html";
}


//存取页面大小
var pageSize = localStorage['pageSize'];
if(!pageSize){
  pageSize = 10;
}
$('#page-size').val(pageSize).change(function(){
  localStorage['pageSize'] = $(this).val();
  loadProductByPage(1, $(this).val(),"");
});

//分页条单击事件处理
$('#pagination').on('click', 'li a', function(e){
  e.preventDefault();
  loadProductByPage($(this).attr('href'), localStorage['pageSize'],"");
})

//分页加载数据
function loadProductByPage(pno, pageSize,kw){
  $('#table-laptop tbody').html('<div class="loading"><img src="img/loading.gif" alt=""></div>');
  $.ajax({
    url: 'data/13_order_list.php',
    data: {pno:pno, pageSize: pageSize,kw:kw},
    success: function(pager){
      //表格内容
      var html = '';
      $.each(pager.data, function(i, u){
        html += `
          <tr>
            <td><input type="checkbox" data-action="${u.aid}"></td>
            <td>${u.aid}</td>
            <td><p class="fname" title="${u.uname}">${u.uname}</p></td>
            <td><p class="title" title="${u.receiver}">${u.receiver}</p></td>
            <td><p class="spec" title="${u.gener}">${u.status}</p></td>
            <td><p class="spec" title="${u.phone}">${u.order_time})</p></td>
            <td>
            `;
            if(u.expire==0){    
              html += `    
                    <a href="#"  data-action="detail" data-id="${u.aid}">详情</a>
                    <a href="#"  data-action="update" data-id="${u.aid}_${u.status}">修改</a>
                    <a href="#"  data-action="delete" data-id="${u.aid}">删除</a>
                 `;
              }
             html += `    
                    </td>
                </tr>
              `;
            })
            $('#table-laptop tbody').html(html);
      



      //分页条
      var html = '';
      html += `<li class="${pager.pno<=1?'disabled':''}"><a href="${pager.pno>1?pager.pno-1:'#'}">上一页</a></li>`;
      if(pager.pno-2>0){
        html += `<li><a href="${pager.pno-2}">${pager.pno-2}</a></li>`;
      }
      if(pager.pno-1>0){
        html += `<li><a href="${pager.pno-1}">${pager.pno-1}</a></li>`;
      }
      html += `<li class="active"><a href="${pager.pno}">${pager.pno}</a></li>`;
      if(pager.pno+1<=pager.pageCount){
        html += `<li><a href="${pager.pno+1}">${pager.pno+1}</a></li>`;
      }
      if(pager.pno+2<=pager.pageCount){
        html += `<li><a href="${pager.pno+2}">${pager.pno+2}</a></li>`;
      }
      html += `<li class="${pager.pno>=pager.pageCount?'disabled':''}"><a href="${pager.pno<pager.pageCount?pager.pno+1:'#'}">下一页</a></li>`;
      $('#pagination').html(html);
    }
  })
}
loadProductByPage(1, 10,"")

//$('#product-kw').bind('keyup',function(event){
$("#product-kw").keyup(function(e){
  if(e.keyCode==13){
    loadProductByPage(1, 10,this.value);
    //loadProductByPageSeacrh(1,10,this.value);
  }
});


//删除方案一：DELETE FROM xz_laptop WHERE lid = 2;
//删除方案二：UPDATE  xz_laptop  SET  isdel = 1   WHERE lid = 2;
//删除方案三：UPDATE  xz_laptop  SET  expire = 1  WHERE lid = 2;
//删除方案四：SELECT * FROM xz_laptop WHERE lid = 2;
//          INSERT INTO delete_xz_laptop... del_user del_time del_uid
$("#table-laptop").on("click","[data-action='delete']",function(e){
   e.preventDefault();
   var lid = $(this).data("id");
   var td = $(this).parent();
   var tr = $(this).parents("tr");
   var fname = tr.find("[class='fname']");
   var rs = window.confirm("您确认要删除："+fname.html()+"对应记录吗?");
   if(!rs){
    return;
   }
   $.ajax({
     type:"post",
     url:"data/05_product_del.php",
     data:{lid:lid},
     success:function(data){
        if(data.code>0){
          alert("删除成功");
          tr.addClass("expire");
          td.html("");
        }else{
          alert("删除失败");
        }
     },
     error:function(){
       alert("网络故障请检查");
     }
   });
});



//更新产品
$("#table-laptop").on("click","[data-action='update']",function(e){
  e.preventDefault();
  var div = $(".update-jumbotron");
  $("[data-action='update-ok']").attr("data-lid",$(this).data("id"));
  var td = $(this).parent();
  var tr = $(this).parents("tr");
  var fname = tr.find("[class='fname']");
  var price = tr.find("[class='pprice']");
  div.find(".pname").html(fname.html());
  div.find(".input-price").val(price.html().slice(1));
  div.show(500);
});

$("[data-action='update-ok']").click(function(e){
  e.preventDefault();
  var lid = $(this).attr("data-lid");
  var val = $(".input-price").val();
  $.ajax({
    type:"POST",
    url:"",
    data:{lid:lid,val:val},
    success:function(){},
    error:function(){}
  });
});

$("[data-action='update-cancel']").click(function(e){
  e.preventDefault();
  $(".update-jumbotron").hide(500);
});

$("#table-laptop").on("click","[data-action='detail']",function(e){
  e.preventDefault();
  var lid = $(this).data("id");
  $.ajax({
    type:"GET",
    data:{lid:lid},
    url:"data/06_product_detail.php",
    success:function(data){
      //console.log(data);
      var div = $(".detail-jumbotron");
      div.find(".pname").html(data.name);
      div.find(".pprice").html(data.price);
      div.find(".pcategory").html(data.category);
      div.find(".pos").html(data.os);
      div.show(500);
      console.log(div);
    },
    error:function(){
      alert("network error");
    }
  });
});

$("[data-action='detail-cancel']").click(function(){
  $(".detail-jumbotron").hide(500);
});
