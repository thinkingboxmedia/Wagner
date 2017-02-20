import Pass from '../../Pass';

export default class FishEyePass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('../../shaders/vertex/basic.glsl'), 
      require('./fisheye-fs.glsl')
    );

    this.params.power = options.power || 1.2;
  }

  run(composer) {
    this.shader.uniforms.power.value = this.params.power;
    
    composer.pass(this.shader);
  }
}