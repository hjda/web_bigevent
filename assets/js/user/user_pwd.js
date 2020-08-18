$(function () {
  var form = layui.form;
  var layer = layui.layer;

  form.verify({
    pwd: [
      // 正则表达式,提示信息
      /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    samePwd: function (value) {
      if (value === $('[name=oldPwd]').val()) {
        return '旧密码跟新密码不能一致';
      }
    },
    // 将新建的规则添加给确认密码，通过参数value和属性选择器选择新密码的name属性进行对比
    rePwd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        // 返回提示信息
        return '两个密码不一致';
      }
    }
  });

  $('.layui-form').on('submit', function (e) {
    // 阻止页面默认事件行为
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg('更新密码失败！');
        }
        layui.layer.msg('更新密码成功！');
        // 重置表单,使用操作原生的form-DOM方法重置
        // 注意：使用jq是无法调用的
        // ！一定要记住下面的代码
        $('.layui-form')[0].reset();
      }
    })
  })
})