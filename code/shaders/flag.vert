
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
uniform float speed;

varying vec2 vTextureCoord;


void main() {
	vTextureCoord = aTextureCoord;

	vec3 offset =  0.1 * sin(speed) * vec3(0, 0, 1);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition+offset + offset, 1.0);
}

