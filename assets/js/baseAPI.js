// 利用jQuery函数拼接url地址的根目录
// 注意：每次调用$.get() 或 $.post() 或 $.ajax()的时候，先调用ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给的Ajax提供的配置对象
// 意思就是提交ajax时候整个的配置对象的总称
$.ajaxPrefilter(function (options) {
  // console.log(options.url);
  options.url = 'http://ajax.frontend.itheima.net' + options.url;
  // 优化1：统一为有权限的接口，设置headers请求头;解决多个获取验证身份信息接口地址的问题
  // 优化2：考虑api接口不需要添加请求头，以/my开头请求路径的需要请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }
  // console.log(options.url);

  // 解决需要验证用户信息的网页都添加一个complete函数，将挂载函数全局统一
  options.complete = function (res) {
    if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 1.强制清空token
      localStorage.removeItem('token');
      // 2.强制跳转登录页面
      location.href = '/login.html'
    }
  }
})