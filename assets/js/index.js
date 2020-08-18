$(function () {
  // 调用getUserInfo 函数，获取用户基本信息
  getUserInfo();
  // 点击按钮,实现退出功能
  $('#btnLogout').on('click', function () {
    // console.log('ok');

    // 采用layui里面的组件
    // 注意：必须声明组件
    var layer = layui.layer;
    // 提示用户是否退出
    layer.confirm('是否退出', {
      icon: 3,
      title: '提示'
      // 点击之后触发回调函数
    }, function (index) {
      // 触发的函数代码就是用户登录的信息进行反方向操作
      // 1.清空本地存储的token
      localStorage.removeItem('token');
      // 2.重新跳转登录面
      location.href = '/login.html'
      // 这是关闭confirm询问框,官网自定的规则,不需要更改
      layer.close(index);
    });
  })
})

// 获取用户基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // header 请求头配置对象：主要是验证用户的身份信息,必写在请求头中
    // headers: {
    //   // 请求的键名：获取直接用本地获取代码
    //   // 犯错的地方：少写了一个|，是或者||9
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: function (res) {
      // console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败');
      }
      // 调用renderAvater渲染用户的头像
      renderAvater(res.data);
    },
    // 无论成功与否，都会返回一个complete函数
    // complete: function (res) {
      // console.log('执行了complate函数');
      // console.log(res);
      // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
      // 判断用户直接进入后台主页后强制性跳转登录页面
      // 问题：没出现跳转的原因：判断条件里面的'身份认证失败！'；注意里面的文本和符号都是汉字，不是英文的!,而是英文的！；还是直接复制粘贴靠谱
      // if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      //   // 1.强制清空token
      //   localStorage.removeItem('token');
      //   // 2.强制跳转登录页面
      //   location.href = '/login.html'
      // }
    // }
  })
}

function renderAvater(user) {
  // 1获取用户的名称
  // 根据文档中提供的nikename和username两个数据进行筛选，有昵称的情况下使用nickname，没有的情况下使用登录账号的username
  var name = user.nickname || user.username
  // 2将登录的信息在指定的位置进行显示
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
  // 3按需渲染用户的头像
  // user_pic是文档中要求的写法
  if (user.user_pic !== null) {
    // 3.1渲染图片头像
    // 3.3显示有图片的头像
    // 设置属性src,将获取到的后台数据进行渲染显示
    $(".layui-nav-img").attr('src', user.user_pic).show();
    // 隐藏文本头像
    $(".text-avater").hide();
  } else {
    // 3.2渲染文本头像
    // 3.4将文本图片头像进行隐藏
    $(".layui-nav-img").hide();
    // 获取用户登录账号的头个字母可以使用数组下标的方式进行获取，0代表第一个
    // 将获取到的字符转化为大写字母
    var first = name[0].toUpperCase();
    // 在文本头像中获取到截取到的第一个字符进行显示
    // 注意点：此处的show()是针对元素的显示而添加的，html只是将元素渲染到页面上
    $('.text-avater').html(first).show();
  }
}