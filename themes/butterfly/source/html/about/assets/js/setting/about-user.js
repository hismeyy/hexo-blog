// 更新信息
$("#update-info").click(function() {
	$.ajax({
		url: "/users/update-user-info",
		type: "POST",
		data: $("#form-info").serialize(),
		dataType: "JSON",
		success: function(json) {
			if (json.state == 200) {
				$.cookie("mm-username", json.data, {
					path: "/"
				})
				location.reload()
				alert("更新成功")
			} else if (json.state == 4005) {
				alert("信息未更改，请先更改信息")
			} else if (json.state == 4006) {
				alert("验证码错误")
			} else {
				location.reload()
				alert("更改失败，请刷新重试")
			}
		},
		error: function(xhr) {
			location.reload()
			alert("更改信息时出现未知错误" + xhr.message)
		}
	});

});


// 更新头像
$("#btn-change-avatar").click(function() {
	console.log(new FormData($("#form-change-avatar")[0]));
	$.ajax({
		url: "/users/update-user-avatar",
		type: "POST",
		data: new FormData($("#form-change-avatar")[0]),
		processData: false, //处理数据的形式,关闭处理数据
		contentType: false, //提交数据的形式,关闭默认提交数据的形式
		dataType: "JSON",
		success: function(json) {
			if (json.state == 200) {

				$.cookie("mm-avatar", json.data, {
					path: "/"
				})
				location.reload()
				alert("头像修改成功")
				//将服务器端返回的头像地址设置到img标签的src属性上
				//attr(属性,属性值)用来给某个属性设值
			} else {
				alert("头像修改失败")
				location.reload()
			}
		},
		error: function(xhr) {
			alert("修改头像时产生未知的异常!" + xhr.message);
			location.reload()
		}
	});
});


// 更新密码

$("#but-update-user-password").click(function() {
	$.ajax({
		url: "/users/update-user-password",
		type: "POST",
		data: $("#form-password").serialize(),
		dataType: "JSON",
		success: function(json) {
			if (json.state == 200) {
				location.reload()
				alert("密码修改成功")
			} else if (json.state == 4004) {
				alert("旧密码错误")
			} else {
				location.reload()
				alert("更改失败，请刷新重试")
			}
		},
		error: function(xhr) {
			location.reload()
			alert("更改密码时出现未知错误" + xhr.message)
		}
	});

});
