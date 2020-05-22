
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;
uniform float speed;

varying vec2 vTextureCoord;
varying vec3 vVertexPosition;

void main() {
	vTextureCoord = aTextureCoord;
	vVertexPosition = aVertexPosition;

	vec3 offset =  0.2 * (vVertexPosition[0] + 0.5) * sin(speed * (vVertexPosition[0] + 0.5) + timeFactor) * vec3(0, 0, 1);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}

