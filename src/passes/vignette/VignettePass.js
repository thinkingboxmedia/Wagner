import Pass from '../../Pass';

export default class VignettePass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('glslify!raw!../../shaders/vertex/basic.glsl'), 
      require('glslify!raw!./vignette-fs.glsl')
    );

    this._params.boost = options.boost || 1;
    this._params.reduction = options.reduction || 1;
  }

  run(composer) {
    this._shader.uniforms.boost.value = this._params.boost;
    this._shader.uniforms.reduction.value = this._params.reduction;
    
    composer.pass(this._shader);
  }
}