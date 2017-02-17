import Pass from '../../Pass';

export default class TiltShiftPass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('glslify!raw!../../shaders/vertex/basic.glsl'), 
      require('glslify!raw!./tiltshift-fs.glsl')
    );

    this._params.bluramount = options.bluramount || 1.0;
	  this._params.center = options.center || 1.1;
	  this._params.stepSize = options.stepSize || 0.004;
  }

  run(composer) {
    this._shader.uniforms.bluramount.value = this._params.bluramount;
    this._shader.uniforms.center.value = this._params.center;
    this._shader.uniforms.stepSize.value = this._params.stepSize;
    
    composer.pass(this._shader);
  }
}