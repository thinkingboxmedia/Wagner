import Pass from '../../Pass';

export default class FishEyePass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('glslify!raw!../../shaders/vertex/basic.glsl'), 
      require('glslify!raw!./fisheye-fs.glsl')
    );

    this._params.power = options.power || 1.2;
  }

  run(composer) {
    this._shader.uniforms.power.value = this._params.power;
    
    composer.pass(this._shader);
  }
}