$(function () {
  // 声明layui的样式
  var form = layui.form;
  var layer = layui.layer;
  // layui规则
  form.verify({
    nickname: function (val) {
      if (val.length > 6) {
        return '昵称长度规定在1-6个之间'
      }
    }
  });

  initUserInfo();

  // 初始化用户的基本信息,从服务器中获取的用户数据
  function initUserInfo() {
    $.ajax({
      url: '/my/userinfo',
      method: 'GET',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败！');
        }
        // console.log(res);
        // 调用form.val()快速获取表单，通过此属性：lay-filter并赋值
        form.val('formUserInfo', res.data);
      }
    })
  };

  // 重置表单的数据
  $('#btnReset').on('click', function (e) {
    // 阻止表单的默认重置行为：解决默认按钮清空文本的问题
    e.preventDefault();
    // 再次调用函数，重新填充提交的数据，就是返回之前的用户数据
    initUserInfo();
  });

  // 监听表单的提交事件
  $('.layui-form').submit(function (e) {
    e.preventDefault();
    // 发起ajax请求
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      // data: $('.layui-form').serialize()
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新用户信息失败');
        }
        // return layer.msg('更新用户信息success');
        // 将index.html页面中的有列表菜单的为父页面，个人中心中的表单为子页面
        // 重新拿到父页面中的调用方法，重新渲染用户的头像和用户信息
        // 从iframe页面(子页面)调用父页面的方法
        window.parent.getUserInfo();
      }
    })
  })
});