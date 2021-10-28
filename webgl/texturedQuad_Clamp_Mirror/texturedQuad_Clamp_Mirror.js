//HelloPoint1.js

//顶点着色器
var VSHADER_SOURCE =
  "attribute vec4 a_Position;\n" +
  "attribute vec2 a_TexCoord;\n" +
  "varying vec2 v_TexCoord;\n" +
  "void main() {\n" +
  " gl_Position = a_Position;\n" +
  " v_TexCoord = a_TexCoord;\n" +
  "}\n";

//片元着色器
var FSHADER_SOURCE =
  "precision mediump float;\n" +
  "uniform sampler2D u_Sampler;\n" +
  "varying vec2 v_TexCoord;\n" +
  "void main(){\n" +
  " gl_FragColor = texture2D(u_Sampler,v_TexCoord);\n" +
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
  //配置纹理
  if (!initTextures(gl, n)) {
    console.log("Failed to initTextures");
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

  gl.drawArrays(gl.POINTS, 0, n);
}

function initVertexBuffers(gl) {
  var verticesTexCoords = new Float32Array([
    -0.5, 0.5, 0.0, 1.0, -0.5, -0.5, 0.0, 0.0, 0.5, 0.5, 1.0, 1.0, 0.5, -0.5,
    1.0, 0.0,
  ]);
  var n = 4;
  //创建缓冲区对象
  var vertexTexCoordBuffer = gl.createBuffer();
  if (!vertexTexCoordBuffer) {
    console.log("Failed to create the buffer object");
    return -1;
  }

  //将缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);

  //向缓冲区写入数据
  gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);

  var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;

  var a_Position = gl.getAttribLocation(gl.program, "a_Position");
  if (a_Position < 0) {
    return;
  }
  //将缓冲区对象分配给a_Position变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);

  //连接a_Position变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(a_Position);
  var a_TexCoord = gl.getAttribLocation(gl.program, "a_TexCoord");

  gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
  gl.enableVertexAttribArray(a_TexCoord);
  return n;
}
function initTextures(gl, n) {
  var texture = gl.createTexture();
  if (!texture) {
    console.log("Failed to create the texture object");
    return false;
  }
  //获取u_Sampler的存储位置
  var u_Sampler = gl.getUniformLocation(gl.program, "u_Sampler");
  if (u_Sampler < 0) {
    console.log("Failed to find the u_Sampler object");
    return false;
  }
  var image = new Image();

  //注册图像加载事件
  image.onload = function () {
    loadTexture(gl, n, texture, u_Sampler, image);
  };
  image.src = "../resources/sky.jpg";

  return true;
}

function loadTexture(gl, n, texture, u_Sampler, image) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  //开启0号纹理单元
  gl.activeTexture(gl.TEXTURE0);
  //向target绑定纹理对象
  gl.bindTexture(gl.TEXTURE_2D, texture);

  //配置纹理参数
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
  //配置纹理图像
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  //将0号纹理传递给着色器
  gl.uniform1i(u_Sampler, 0);

  //清除canvas
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}
