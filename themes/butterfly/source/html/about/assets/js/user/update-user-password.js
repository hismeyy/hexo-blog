// 更新密码

$("#but-update-user-password").click(function() {
	$.ajax({
		url: "/users/update-user-password",
		type: "POST",
		data: $("#form-password").serialize(),
		dataType: "JSON",
		success: function(json) {
			if (json.state == 200) {
				location.href = "/users/login.html"
				alert("密码修改成功")
			} else if (json.state == 5001) {
				alert("邮箱不存在")
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