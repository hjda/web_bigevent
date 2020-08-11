$(function () {
	// 点击去注册账号的链接
	$('#link_reg').on('click', function () {
		$('.loginBox').hide();
		$('.regBox').show();
	});

	// 点击去登录的链接
	$('#link_login').on('click', function () {
		$('.loginBox').show();
		$('.regBox').hide();
	});

	// 从layui获取form对象
	// 跟jq一样,只要是导入了某个样式库,就要使用该样式的规则
	var form = layui.form;
	var layer = layui.layer;
	// 通过form.verify() 函数自定义规则
	form.verify({
		pwd: [
			// 自定义一个pwd校验规则
			/^[\S]{6,12}$/,
			'密码必须6到12位，且不能出现空格',
		],
		repwd: function (value) {
			// 通过形参拿到的是确认密码框的内容
			// 还需要拿到密码框中的内容
			// 然后进行一次判断
			// 如果判断失败,则return一个消息即可
			var pwd = $('.regBox [name=password]').val();
			if (pwd !== value) {
				return '两次密码不一致';
			}
		},
	});
	// 监听注册表单的提交事件
	$('#form_reg').on('submit', function (e) {
		// 1. 阻止默认的提交行为
		e.preventDefault();
		// 2. 发起Ajax的POST请求
		// var data = {
		// 	username: $('#form_reg [name=username]').val(),
		// 	password: $('#form_reg [name=password]').val()
		// }
		$.post(
			'/api/reguser', {
				username: $('#form_reg [name=username]').val(),
				password: $('#form_reg [name=password]').val(),
			},
			function (res) {
				if (res.status !== 0) {
					return layer.msg(res.message);
				}
				layer.msg('注册成功，请登录！');
				// 模拟人的点击行为
				$('#link_login').click();
			}
		);
	});

	// 方便后期维护，减少请求路径的操作次数，简化请求的地址
	$('#form_login').submit(function (e) {
		e.preventDefault();
		$.ajax({
			url: '/api/login',
			method: 'POST',
			// 快速获取表单中的数据
			data: $(this).serialize(),

			success: function (res) {
				if (res.status !== 0) {
					return layer.msg('登录失败');
				}
				layer.msg('登录成功');
				// token:是验证身份信息使用的
				// console.log(res.token);
				// 将登录成功得到的 token 字符串，保存到localStorage本地中
				localStorage.setItem('token', res.token);
				// 跳转后台主页面
				// 跳转的地址前面写上/网页.html
				location.href = '/index.html';
			},
		});
	});
});