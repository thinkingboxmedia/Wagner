import Pass from '../../Pass';

export default class PixelatePass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('../../shaders/vertex/basic.glsl'), 
      require('./pixelate-fs.glsl')
    );

    this.params.amount = 320;
  }

  run(composer) {
    this.shader.uniforms.amount.value = this.params.amount;
  
    composer.pass(this.shader);
  }
}