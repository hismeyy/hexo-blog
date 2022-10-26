$(document).ready(function() {
	let name = $.cookie('mm-username')
	let avatar = $.cookie('mm-avatar')
	if(name != undefined && avatar != undefined){
		$("#login-box").hide()
		$("#about-me-box").show()
		$("#my-name").text(name)
		$("#user-avatar-1").attr("src",avatar)
		$("#user-avatar-2").attr("src",avatar)
	}else{
		$("#logout-box").hide()
		$("#about-me-box").hide()
	}
	
	
})

$(function(){
	
	$("#logout-box").click(function(){
		$.ajax({
		    url: "/users/logout",
		    type: "POST",
		    dataType: "JSON",
		    success: function(json) {
		        if(json.state == 200){
					if($.removeCookie('mm-username', { path: '/' }) && $.removeCookie('mm-avatar', { path: '/' })){
						location.href = "/users/logout.html"
					}			
		
				} else{
					alert("退出时发生未知错误")
				}
		    },
		    error: function(xhr) {
		        alert("登陆时发生未知异常" + xhr.message)
		    }
		});
	
	})
})




