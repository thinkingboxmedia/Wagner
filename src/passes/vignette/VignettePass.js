import Pass from '../../Pass';

export default class VignettePass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('../../shaders/vertex/basic.glsl'), 
      require('./vignette-fs.glsl')
    );

    this.params.boost = options.boost || 1;
    this.params.reduction = options.reduction || 1;
  }

  run(composer) {
    this.shader.uniforms.boost.value = this.params.boost;
    this.shader.uniforms.reduction.value = this.params.reduction;
    
    composer.pass(this.shader);
  }
}