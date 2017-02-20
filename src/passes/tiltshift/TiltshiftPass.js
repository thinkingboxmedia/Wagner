import Pass from '../../Pass';

export default class TiltShiftPass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('../../shaders/vertex/basic.glsl'), 
      require('./tiltshift-fs.glsl')
    );

    this.params.bluramount = options.bluramount || 1.0;
    this.params.center = options.center || 1.1;
    this.params.stepSize = options.stepSize || 0.004;
  }

  run(composer) {
    this.shader.uniforms.bluramount.value = this.params.bluramount;
    this.shader.uniforms.center.value = this.params.center;
    this.shader.uniforms.stepSize.value = this.params.stepSize;
    
    composer.pass(this.shader);
  }
}