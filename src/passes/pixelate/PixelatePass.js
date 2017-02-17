import Pass from '../../Pass';

export default class PixelatePass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('glslify!raw!../../shaders/vertex/basic.glsl'), 
      require('glslify!raw!./pixelate-fs.glsl')
    );

    this._params.amount = 320;
  }

  run(composer) {
    this._shader.uniforms.amount.value = this._params.amount;
  
    composer.pass(this._shader);
  }
}