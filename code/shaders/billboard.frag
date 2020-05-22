#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec3 vVertexPosition;

uniform float nSuppliesDelivered;
uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {
    float factor = vVertexPosition[0];
    if(vVertexPosition[0] + 0.5 > 1.0 - nSuppliesDelivered / 5.0)
        gl_FragColor = vec4(0.5 + factor, 0.5 - factor, 0.0, 1.0);
    else
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}