varying vec2 vUv;
uniform sampler2D currentImage;
uniform sampler2D nextImage;
uniform float progress;

void main() {
  vec2 uv = vUv;
  vec4 _currentImage;
  vec4 _nextImage;
  float intensity = 0.3;
  vec4 orig1 = texture2D(currentImage, uv);
  vec4 orig2 = texture2D(nextImage, uv);
  _currentImage = texture2D(currentImage, vec2(uv.x, uv.y + progress * (orig2 * intensity)));
  _nextImage = texture2D(nextImage, vec2(uv.x, uv.y + (1.0 - progress) * (orig1 * intensity)));
  vec4 finalTexture = mix(_currentImage, _nextImage, progress);
  gl_FragColor = finalTexture;
}
