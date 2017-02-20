import Pass from '../../Pass';

export default class KaleidoscopePass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('../../shaders/vertex/basic.glsl'), 
      require('./kaleidoscope-fs.glsl')
    );

    this.params.sides = options.sides || 2;
    this.params.angle = options.angle || 0;

    this.shader.uniforms.tInput.value = null;
  }

  run(composer) {
    this.shader.uniforms.sides.value = this.params.sides;
    this.shader.uniforms.angle.value = this.params.angle;

    composer.pass(this.shader);
  }
}