import Pass from '../../Pass';

export default class NoisePass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('glslify!raw!../../shaders/vertex/basic.glsl'), 
      require('glslify!raw!./noise-fs.glsl')
    );

    this._params.amount = options.amount || 0.1;
  	this._params.speed = options.speed || 0;
  }

  run(composer) {
    this._shader.uniforms.amount.value = this._params.amount;
    this._shader.uniforms.speed.value = this._params.speed;
    
    composer.pass(this._shader);
  }
}