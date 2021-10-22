//HelloPoint1.js

//顶点着色器
var VSHADER_SOURCE =
  "attribute vec4 a_Position;\n" +
  "void main() {\n" +
  " gl_Position = a_Position;\n" +
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

  //获取attribute变量的存储位置
  var a_Position = gl.getAttribLocation(gl.program, "a_Position");
  if (a_Position < 0) {
    return;
  }
  canvas.onmousedown = function(ev){
    click(ev,gl,canvas,a_Position);
  }
  //清空canvas颜色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
}
var g_points = [];
function click(ev,gl,canvas,a_Position) {
  var x = ev.clientX; //鼠标点击处的x坐标
  var y = ev.clientY;
  var rect = ev.target.getBoundingClientRect();
  x = ((x-rect.left) - canvas.height/2)/(canvas.height/2);
  y = (canvas.width/2 - (y-rect.top))/(canvas.width/2);
  //将坐标存储到数组中
  g_points.push(x);
  g_points.push(y);

  //清除canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  var len = g_points.length;
  for(var i=0;i<len;i+=2){
    //将点的位置传递到变量a_Position中
    gl.vertexAttrib3f(a_Position,g_points[i],g_points[i+1],0.0);

    //绘制点
    gl.drawArrays(gl.POINTS,0,1);
  }
}
