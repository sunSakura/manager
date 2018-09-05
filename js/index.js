
//功能模块一：用户登录
//1.1 当用户点击登录按钮，获取参数
//1.2 验证用户输入值
//1.3 发送ajax请求，完成登录业务
//1.4 处理成功或失败的结果

$("[name='usubmit']").click(function(){
  //获取用户输入数据
  var u = $("[name='uname']").val(); //用户名
  var p = $("[name='upwd']").val();  //密码

  //发送ajax请求完成业务处理
  $.ajax({
    type:"POST",
    url:"data/01_login.php",
    data:{uname:u,upwd:p},
    success:function(data){
      if(data.code == -2) {
        alert(data.msg);
      }else{
         sessionStorage.setItem("uid",data.uid);
         sessionStorage.setItem("uname",u);
         alert("登录成功，自动跳转到首页");
         location.href = "main.html";
      }
    },
    error:function(err){
      alert("网络故障请检查");
      console.log(err);
    }
  });
});