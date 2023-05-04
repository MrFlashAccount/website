uniform bool u_dragging;
uniform float u_time;
uniform float u_drag_time;
varying float vRndId;
varying float pct;

void main() {
    float v = sin(u_time / 200.0 * vRndId);
    float alpha = pct * 0.7 + v * 0.2;
    float r = 0.19;
    float g = 0.42;
    float b = 0.65;
    float dragDur = 1200.0;

    vec3 color = vec3(r, g, b);
    float rInc = min(1.0, u_drag_time / dragDur) * (sin(u_drag_time / (dragDur * 0.5) + 1.0) * 0.1);
    float gInc = min(1.0, u_drag_time / dragDur) * (sin(u_drag_time / (dragDur * 0.75) - 1.0) * 0.1);
    float bInc = min(1.0, u_drag_time / dragDur) * (sin(u_drag_time / dragDur) * 0.1);

    if (u_dragging) {
        color.r = r + rInc;
        color.g = g + gInc;
        color.b = b + bInc;
    }

    gl_FragColor = vec4(color, alpha);
}
