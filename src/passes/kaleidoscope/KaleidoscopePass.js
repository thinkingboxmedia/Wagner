import Pass from '../../Pass';

export default class KaleidoscopePass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('glslify!raw!../../shaders/vertex/basic.glsl'), 
      require('glslify!raw!./kaleidoscope-fs.glsl')
    );

    this._params.sides = options.sides || 2;
    this._params.angle = options.angle || 0;

    this._shader.uniforms.tInput.value = null;
  }

  run(composer) {
    this._shader.uniforms.sides.value = this._params.sides;
    this._shader.uniforms.angle.value = this._params.angle;

    composer.pass(this._shader);
  }
}