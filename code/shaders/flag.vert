
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;
varying vec3 vVertexPosition;

void main() {
	vTextureCoord = aTextureCoord;
	vVertexPosition = aVertexPosition;

	vec3 offset =  0.03 * sin((vVertexPosition[0] + 0.5)) * sin( 30.0 * (vVertexPosition[0] + 0.5) + timeFactor*10.0) * vec3(0, 0, 1);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}

