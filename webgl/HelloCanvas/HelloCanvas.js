//HelloCanvas.js
function main() {
  var canvas = document.getElementById("webgl");

  //获取上下文
  var gl = getWebGLContext(canvas);

  if (!gl) {
    console.log("Faild to get the rendering context for WebGL");
    return;
  }
  //清空canvas颜色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  //清空canvas

  gl.clear(gl.COLOR_BUFFER_BIT);
}
