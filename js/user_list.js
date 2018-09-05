//存取页面大小
var pageSize = localStorage['pageSize'];
if(!pageSize){
  pageSize = 10;
}
$('#page-size').val(pageSize).change(function(){
  localStorage['pageSize'] = $(this).val();
  loadProductByPage(1, $(this).val());
});

//分页条单击事件处理
$('#pagination').on('click', 'li a', function(e){
  e.preventDefault();
  loadProductByPage($(this).attr('href'), localStorage['pageSize']);
})

//分页加载数据
function loadProductByPage(pno, pageSize){
  $('#table-laptop tbody').html('<div class="loading"><img src="img/loading.gif" alt=""></div>');
  $.ajax({
    url: 'data/08_user_list.php',
    data: {pno:pno, pageSize: pageSize},
    success: function(pager){
      //表格内容
      var html = '';
      $.each(pager.data, function(i, u){
        html += `
          <tr>
            <td><input type="checkbox" data-action="${u.a_aid}"></td>
            <td><img class="pic" src="img/user.png"></td>
            <td><p class="fname" title="${u.aname}">${u.aname}</p></td>
            <td><p class="title" title="${u.names}">${u.names}</p></td>
            <td><p class="spec" title="${u.gender}">${u.gender==0?"男":"女"}</p></td>
            <td><p class="spec" title="${u.phone}">${slicephone(u.phone)}</p></td>
            <td><p class="spec" title="${u.grade}">${u.grade})</p></td>
            <td>
            `;
            if(u.expire==0){    
              html += `    
                    <a href="#"  data-action="detail" data-id="${u.a_aid}">详情</a>
                    <a href="#"  data-action="update" data-id="${u.a_aid}">修改</a>
                    <a href="#"  data-action="delete" data-id="${u.a_aid}">删除</a>
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
loadProductByPage(1, 10)

// //隐藏手机中间四位
 function slicephone(phone){
   var reg = /(\d{3})(\d{4})(\d{4})/;
   return phone.replace(reg,"$1****$3");
 }

$("#table-laptop").on("click","[data-action='delete']",function(e){
  e.preventDefault();
  var a_aid = $(this).data("id");
  var td = $(this).parent();
  var tr = $(this).parents("tr");
  var fname = tr.find("[class='fname']");
  var rs = window.confirm("您确认要删除："+fname.html()+"对应记录吗?");
  if(!rs){
   return;
  }
  $.ajax({
    type:"post",
    url:"data/09_user_del.php",
    data:{a_aid:a_aid},
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


//更新用户密码
$("#table-laptop").on("click","[data-action='update']",function(e){
  e.preventDefault();
  var div = $(".update-jumbotron");
  $("[data-action='update-ok']").attr("data-id",$(this).data("id"));
  var td = $(this).parent();
  var tr = $(this).parents("tr");
  var fname = tr.find("[class='fname']");
  var price = tr.find("[class='pprice']");
  div.find(".uname").html(fname.html());
  //div.find(".input-price").val(price.html().slice(1));
  div.show(500);
});

$("[data-action='update-ok']").click(function(e){
  e.preventDefault();
  var aid = $(this).attr("data-id");
  var old_pwd = $(".old-pwd").val();
  var new_pwd = $(".new-pwd").val();
  if(old_pwd==""){
   alert("旧密码不能为空");
   return;
  }
  if(new_pwd==""){
    alert("新密码不能为空");
    return;
   }
 
  $.ajax({
    type:"POST",
    url:"data/11_user_update.php",
    data:{a_aid:aid,old_pwd:old_pwd,new_pwd:new_pwd},
    success:function(data){
        alert(data.msg);
        $(".update-jumbotron").hide();
    },
    error:function(){
      alert("network errror");
      $(".update-jumbotron").hide();
    }
  });
});

$("[data-action='update-cancel']").click(function(e){
  e.preventDefault();
  $(".update-jumbotron").hide(500);
});

$("#table-laptop").on("click","[data-action='detail']",function(e){
  e.preventDefault();
  var aid = $(this).data("id");
  $.ajax({
    type:"GET",
    data:{a_aid:aid},
    url:"data/12_user_detail.php",
    success:function(data){
      //console.log(data);
      var div = $(".detail-jumbotron");
      div.find(".uname").html(data.aname);
      div.find(".phone").html(data.phone);
      div.find(".user_name").html(data.names);
      //div.find(".pos").html(data.os);
      div.show(500);
      //console.log(div);
    },
    error:function(){
      alert("network error");
    }
  });
});

$("[data-action='detail-cancel']").click(function(){
  $(".detail-jumbotron").hide(500);
});
