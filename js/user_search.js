
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
    url: 'data/13_users_list.php',
    data: {pno:pno, pageSize: pageSize,kw:kw},
    success: function(pager){
      //表格内容
      var html = '';
      $.each(pager.data, function(i, l){
        html += "<tr "
        if(l.expire==1){
           html += ` class="expire">`;
        }
        html += `
            >
            <td><input type="checkbox"></td>
            <td>${l.uid}</td>
            <td><img class="pic" src="img/default.png"></td>
            <td><p class="fname" title="${l.uname}">${l.uname}</p></td>
            <td><p class="title" title="${l.gender}">${l.gender==0?"男":"女"}</p></td>
            <td><p class="spec" title="${l.email}">${l.email}</p></td>
            <td><p class="pprice" title="${l.pnone}">${slicephone(l.phone)}</p></td>
            <td>`;
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

// //隐藏手机中间四位
function slicephone(phone){
  var reg = /(\d{3})(\d{4})(\d{4})/;
  return phone.replace(reg,"$1****$3");
}