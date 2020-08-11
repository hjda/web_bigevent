// 利用jQuery函数拼接url地址的根目录
// 注意：每次调用$.get() 或 $.post() 或 $.ajax()的时候，先调用ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给的Ajax提供的配置对象
// 意思就是提交ajax时候整个的配置对象的总称
$.ajaxPrefilter(function (options) {
  // console.log(options.url);
  options.url = 'http://ajax.frontend.itheima.net' + options.url;
  console.log(options.url);
})