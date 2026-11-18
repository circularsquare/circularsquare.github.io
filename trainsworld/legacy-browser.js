// Runs only in browsers that ignore type="module" (360, QQ, Sogou in compatibility mode). ES5 on purpose.
(function () {
  var box = document.createElement('div');
  box.style.cssText = 'font:18px/1.6 sans-serif;text-align:center;padding:48px 24px;color:#333';
  box.innerHTML = '\u6b64\u6d4f\u89c8\u5668\u6b63\u5728\u7528\u517c\u5bb9\u6a21\u5f0f\u6253\u5f00\u7f51\u9875\uff0c\u6e38\u620f\u65e0\u6cd5\u8fd0\u884c\u3002\u8bf7\u70b9\u51fb\u5730\u5740\u680f\u53f3\u4fa7\u7684\u56fe\u6807\uff0c\u5207\u6362\u5230\u6781\u901f\u6a21\u5f0f\u540e\u5237\u65b0\u9875\u9762\u3002';
  var game = document.getElementById('game');
  if (game) game.style.display = 'none';
  document.body.appendChild(box);
})();
