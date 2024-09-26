precision highp float;

uniform sampler2D textureSampler;
varying vec2 vUV;

void main(void) {
    vec2 uv = vUV;

    // Apply some distortion
    uv.y += sin(uv.x * 10.0) * 0.01;

    vec4 color = texture2D(textureSampler, uv);
    
    // Add a green tint
    color.rgb *= vec3(0.8, 1.0, 0.8);

    gl_FragColor = color;
}
