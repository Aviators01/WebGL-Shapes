/* 
Timothy Queva
CS3110 Lab4
October 21, 2020
*/

var VSHADER_SOURCE =
	'attribute vec4 a_position;\n' +
	'void main(){ \n' +
	'	gl_Position = a_position;\n' +
	'	gl_PointSize = 2.0;\n' +
	'}\n';

var FSHADER_SOURCE =
	'precision mediump float;\n' +
	'uniform vec4 u_FragColor;\n' +
	'void main(){ \n' +
	'	gl_FragColor = u_FragColor;\n' +
	'}\n';

function main(){
	//Gets the canvas
	var canvas = document.getElementById('Lab4');
	
	//Gets the WebGL rendering context in order for us to use the webgl system
	var gl = getWebGLContext(canvas);
	
	//This initializes the shaders. Parameters are (rendering context,vshader,fshader)
	var stat;
	stat = initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);
	if(!stat) console.log("Shaders failed to initialize");
	
	//This code section gets the memory location of the WebGL variables we specified earlier(a_position,u_FragColor)
	//Parameters are (program,name)
	var u_fragcolour = gl.getUniformLocation(gl.program,'u_FragColor');
	var a_position = gl.getAttribLocation(gl.program,'a_position');

	//Clears the canvas. ie. cleans the drawing area.
	gl.clearColor(0.0,0.0,0.0,0.5);	//This specifies the color
	gl.clear(gl.COLOR_BUFFER_BIT);	//This actually cleans the canvas with the specified color
	
	alphabet(gl,a_position,u_fragcolour);	//This function will create the "Z"
	lines(gl,a_position,u_fragcolour);
	miniTriangles(gl,a_position,u_fragcolour);
	circle(gl,a_position,u_fragcolour);
	tfan(gl,a_position,u_fragcolour);
}

//Draws "Z"
function alphabet(gl,position,colour){
	//1. Create the buffer object
	var vertexBuffer = gl.createBuffer();
	
	//2. Bind the buffer object to a target
	gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
	
	//3. Write data to the buffer object
	var vertices = new Float32Array([
		-0.8,0.8,		-0.1,0.8,
		-0.8,0.1,		-0.1,0.1
	]);
	gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
	
	//Assigning a colour to this shape
	gl.uniform4f(colour,0.0,0.0,0.0,1);
	
	//4. Assign the buffer object to an attribute variable
	gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
	
	//5. Enable the assignment
	gl.enableVertexAttribArray(position);
	
	//Draws the lines for the "Z"
	gl.drawArrays(gl.LINE_STRIP,0,4);
}

//Draws the straight lines
function lines(gl,position,colour){
	//1. Create the buffer object
	var vertexBuffer = gl.createBuffer();
	
	//2. Bind the buffer object to a target
	gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
	
	//3. Write data to the buffer object
	var vertices = new Float32Array([
		0.1,0.9,		0.8,0.9,
		0.1,0.8,		0.8,0.8,
		0.1,0.7,		0.8,0.7,
		0.1,0.6,		0.8,0.6,
		0.1,0.5,		0.8,0.5
	]);
	gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
	
	//4. Assign the buffer object to an attribute variable
	gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
	
	//5. Enable the assignment
	gl.enableVertexAttribArray(position);
	
	//Draws the straight lines
	gl.drawArrays(gl.LINES,0,10);
}

//Draws the two small triangles
function miniTriangles(gl,position,colour){
	//1. Create the buffer object
	var vertexBuffer = gl.createBuffer();
	
	//2. Bind the buffer object to a target
	gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
	
	//3. Write data to the buffer object
	var vertices = new Float32Array([
		0.2,0.5,		0.3,0.1,
		0.1,0.1,		0.7,0.5,
		0.8,0.1,		0.6,0.1
	]);
	gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
	
	//Assigning a colour to this shape
	gl.uniform4f(colour,1.0,1.0,0.0,1);
	
	//4. Assign the buffer object to an attribute variable
	gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
	
	//5. Enable the assignment
	gl.enableVertexAttribArray(position);
	
	//Draws the triangles
	gl.drawArrays(gl.TRIANGLES,0,6);
}

//Draws the circle
function circle(gl,position,colour){
	//1. Create the buffer object
	var vertexBuffer = gl.createBuffer();
	
	//2. Bind the buffer object to a target
	gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
	
	//3. Write data to the buffer object
	var vertexCount = 360;
	var vertices = new Float32Array(makeCircleVertices(-0.5,-0.5,0.35,vertexCount));
	
	gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
	
	//Assigning a colour to this shape
	gl.uniform4f(colour,0.1,1.0,0.0,0.7);
	
	//4. Assign the buffer object to an attribute variable
	gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
	
	//5. Enable the assignment
	gl.enableVertexAttribArray(position);
	
	//Draws the circle using TRIANGLE_FAN
	gl.drawArrays(gl.TRIANGLE_FAN,0,vertexCount);
}

function makeCircleVertices(centerX,centerY,radius,vertexCount){
	var circleData=[];
	
	for(var i=0;i<=vertexCount;i++){
		var angle = i/vertexCount*2*Math.PI;
		circleData.push(centerX+radius*Math.cos(angle));
		circleData.push(centerY+radius*Math.sin(angle));
	}
	return circleData;
}

//Draws the triangle fan
function tfan(gl,position,colour){
	//1. Create the buffer object
	var vertexBuffer = gl.createBuffer();
	
	//2. Bind the buffer object to a target
	gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
	
	//3. Write data to the buffer object
	var vertices = new Float32Array([
		0.1,-0.1,		0.8,-0.1,
		0.8,-0.8,		0.1,-0.1,
		0.8,-0.1,		0.1,-0.8
	]);
	gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
	
	//Assigning a colour to this shape
	gl.uniform4f(colour,1.0,0.0,0.0,0.7);
	
	//4. Assign the buffer object to an attribute variable
	gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
	
	//5. Enable the assignment
	gl.enableVertexAttribArray(position);
	
	//Draws the two triangle fans
	gl.drawArrays(gl.TRIANGLE_FAN,0,6);
}