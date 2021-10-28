//HelloPoint1.js

//顶点着色器
var VSHADER_SOURCE =
  "attribute vec4 a_Position;\n" +
  "uniform mat4 u_ModelMatrix;\n"+
  "void main() {\n" +
  " gl_Position = a_Position*u_ModelMatrix;\n" +
  "}\n";

//片元着色器
var FSHADER_SOURCE =
  "void main(){\n" + " gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n" + "}\n";

var ANGLE_STEP = 45.0;
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
  //设置顶点位置
  var n = initVertexBuffers(gl);
  if(n<0){
    console.log('Failed to set the positions of the vertices');
    return;
  }
  var u_ModelMatrix = gl.getUniformLocation(gl.program,'u_ModelMatrix');
  var currentAngle = 0.0;

  var modelMatrix = new Matrix4();

  //绘制三角形
  var tick = function(){
    currentAngle = animate(currentAngle);
    draw(gl,n,currentAngle,modelMatrix,u_ModelMatrix);
    requestAnimationFrame(tick);
  }
  tick();
}

function initVertexBuffers(gl){
  var vertices = new Float32Array([
    0.0,0.5,-0.5,-0.5,0.5,-0.5
  ]);
  var n = 3;
  
  //创建缓冲区对象
  var vertexBuffer = gl.createBuffer();
  if(!vertexBuffer){
    console.log('Failed to create the buffer object')
    return -1;
  }

  //将缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);

  //向缓冲区写入数据
  gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

  var a_Position = gl.getAttribLocation(gl.program,'a_Position');
  if (a_Position < 0) {
    return;
  }
  //将缓冲区对象分配给a_Position变量
  gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);

  //连接a_Position变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(a_Position);

  return n;
}
function draw(gl,n,currentAngle,modelMatrix,u_ModelMatrix){
  //设置旋转矩阵
  modelMatrix.setRotate(currentAngle,0,0,1);
  modelMatrix.translate(0.35,0,0)
  //将旋转矩阵传输给顶点着色器
  gl.uniformMatrix4fv(u_ModelMatrix,false,modelMatrix.elements);

  //清除canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  //绘制三角形
  gl.drawArrays(gl.TRIANGLES,0,n);
}
//记录上一次调用函数的时刻
var g_last = Date.now();
function animate(angle){
  var now = Date.now();
  var elapsed = now - g_last;
  g_last = now;
  
  var newAngle = angle + (ANGLE_STEP *elapsed)/1000.0;
  return newAngle %= 360;
}