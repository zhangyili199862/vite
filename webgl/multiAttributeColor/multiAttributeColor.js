//HelloPoint1.js

//顶点着色器
var VSHADER_SOURCE =
  "attribute vec4 a_Position;\n" +
  "attribute vec4 a_Color;\n" +
  "varying vec4 v_Color;\n" +
  "void main() {\n" +
  " gl_Position = a_Position;\n" +
  " gl_PointSize = 10.0;\n" +
  " v_Color = a_Color;\n" +
  "}\n";

//片元着色器
var FSHADER_SOURCE =
  "precision mediump float;\n" +
  "varying vec4 v_Color;\n" +
  "void main(){\n" +
  " gl_FragColor = v_Color;\n" +
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

  //设置顶点位置
  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log("Failed to set the positions of the vertices");
    return;
  }

  //获取attribute变量的存储位置
  var a_Position = gl.getAttribLocation(gl.program, "a_Position");
  if (a_Position < 0) {
    return;
  }
  //清除canvas
  gl.clear(gl.COLOR_BUFFER_BIT);
  //清空canvas颜色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffers(gl) {
  var verticesColors = new Float32Array([
    0.0, 0.5, 1.0, 0.0, 0.0, -0.5, -0.5, 0.0, 1.0, 1.0, 0.5, -0.5, 0.0, 0.0,
    1.0,
  ]);
  var n = 3;
  //创建缓冲区对象
  var vertexColorBuffer = gl.createBuffer();
  if (!vertexColorBuffer) {
    console.log("Failed to create the buffer object");
    return -1;
  }

  //将缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);

  //向缓冲区写入数据
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

  var FSIZE = verticesColors.BYTES_PER_ELEMENT;

  var a_Position = gl.getAttribLocation(gl.program, "a_Position");
  if (a_Position < 0) {
    return;
  }
  //将缓冲区对象分配给a_Position变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);

  //连接a_Position变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(a_Position);
  //获取a_Color的地址，分配缓冲区并开启
  var a_Color = gl.getAttribLocation(gl.program, "a_Color");

  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
  gl.enableVertexAttribArray(a_Color);
  return n;
}
