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
  "precision mediump float;\n" +
  "uniform vec4 u_FragColor;\n" +
  "void main(){\n" + 
  " gl_FragColor = u_FragColor;\n" + 
  "}\n";

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
  //获取u_FragColor的存储位置
  var u_FragColor = gl.getUniformLocation(gl.program,"u_FragColor");

  if (a_Position < 0) {
    return;
  }
  canvas.onmousedown = function(ev){
    click(ev,gl,canvas,a_Position,u_FragColor);
  }
  //清空canvas颜色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}
var g_points = [];
var g_colors = [];
function click(ev,gl,canvas,a_Position,u_FragColor) {
  var x = ev.clientX; //鼠标点击处的x坐标
  var y = ev.clientY;
  var rect = ev.target.getBoundingClientRect();
  x = ((x-rect.left) - canvas.height/2)/(canvas.height/2);
  y = (canvas.width/2 - (y-rect.top))/(canvas.width/2);
  //将坐标存储到数组中
  g_points.push([x,y]);
  if( x>= 0.0 && y>=0.0){
    g_colors.push([1.0,0.0,0.0,1.0]);
  }else if(x<0.0&&y<0.0){
    g_colors.push([0.0,1.0,0.0,1.0]);
  } else {
    g_colors.push([1.0,1.0,1.0,1.0]);
  }

  //清除canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  var len = g_points.length;
  for(var i=0;i<len;i++){
    var xy = g_points[i];
    var rgba = g_colors[i];
    //将点的位置传递到变量a_Position中
    gl.vertexAttrib3f(a_Position,xy[0],xy[1],0.0);
    
    //将点的颜色传输到u_Fragcolor
    gl.uniform4f(u_FragColor,rgba[0],rgba[1],rgba[2],rgba[3]);
    //绘制点
    gl.drawArrays(gl.POINTS,0,1);
  }
}
