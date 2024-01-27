uniform float u_time;
uniform float u_drag_time;
uniform vec2 u_resolution;
attribute float rndId;
varying float vRndId;

varying float pct;

void main() {
    vRndId = rndId;
    vec2 st = position.xy/u_resolution;

    pct = min(1.0, u_time / (1000. / max(0.2, 0.2 * sin(fract(rndId)))));

    float vNormal = rndId + ((1.0 - rndId) * pct);
    vNormal = rndId + ((1.0 - rndId));
    vNormal = smoothstep(0., 1.0, vNormal);

    if (u_drag_time > 0.) {
        vNormal -= ((sin(u_time / 400.0 * vRndId) + 1.0) * 0.04) * min(1., u_drag_time / 1200.0);
    }

    vec4 modelViewPosition = modelViewMatrix * vec4(position, vNormal);
    gl_Position = projectionMatrix * modelViewPosition;
}
