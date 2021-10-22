//HelloPoint1.js

//顶点着色器
var VSHADER_SOURCE =
  "void main() {\n" +
  " gl_Position = vec4(0.0,0.0,0.0,1.0);\n" +
  " gl_PointSize = 10.0;\n" +
  "}\n";

//片元着色器
var FSHADER_SOURCE =
  "void main(){\n" + " gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n" + "}\n";

function main() {
  var canvas = document.getElementById("webgl");

  //获取上下文
  var gl = getWebGLContext(canvas);

  if (!gl) {
    console.log("Faild to get the rendering context for WebGL");
    return;
  }
  //初始化着色器
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log("Failed to initialize shaders.");
    return;
  }

  //清空canvas颜色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  //清空canvas

  gl.clear(gl.COLOR_BUFFER_BIT);

  //绘制一个点
  gl.drawArrays(gl.POINTS, 0, 1);
}
