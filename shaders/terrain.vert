
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;
uniform float normScale;

void main() {
	vTextureCoord = aTextureCoord;

	//vec2 aux = mod((vTextureCoord+vec2(timeFactor*0.01,timeFactor*0.01)), vec2(1.0, 1.0));
	vec4 filter = texture2D(uSampler2, vTextureCoord);

	vec3 offset = vec3(0.0, 0.0, filter.b);

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset * 8.0, 1.0);
}

