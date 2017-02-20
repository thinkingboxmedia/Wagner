import Pass from '../../Pass';

export default class NoisePass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('../../shaders/vertex/basic.glsl'), 
      require('./noise-fs.glsl')
    );

    this.params.amount = options.amount || 0.1;
    this.params.speed = options.speed || 0;
  }

  run(composer) {
    this.shader.uniforms.amount.value = this.params.amount;
    this.shader.uniforms.speed.value = this.params.speed;
    
    composer.pass(this.shader);
  }
}