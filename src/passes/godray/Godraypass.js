import Pass from '../../Pass';

import FullBoxBlurPass from '../box-blur/FullBoxBlurPass';

export default class GodrayPass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('../../shaders/vertex/basic.glsl'), 
      require('./godray-fs.glsl')
    );

    this._blurPass = new FullBoxBlurPass(2);

    this._width = options.width || 512;
    this._height = options.height || 512;

    this.params.blurAmount = options.blurAmount || 2;

    this.params.fX = 0.5;
    this.params.fY = 0.5;
    this.params.fExposure = 0.6;
    this.params.fDecay = 0.93;
    this.params.fDensity = 0.88;
    this.params.fWeight = 0.4;
    this.params.fClamp = 1.0;
  }

  run(composer) {
    this.shader.uniforms.fX.value = this.params.fX;
    this.shader.uniforms.fY.value = this.params.fY;
    this.shader.uniforms.fExposure.value = this.params.fExposure;
    this.shader.uniforms.fDecay.value = this.params.fDecay;
    this.shader.uniforms.fDensity.value = this.params.fDensity;
    this.shader.uniforms.fWeight.value = this.params.fWeight;
    this.shader.uniforms.fClamp.value = this.params.fClamp;

    this._blurPass.params.amount = this.params.blurAmount;
    
    composer.pass(this._blurPass);
    composer.pass(this._blurPass);

    composer.pass(this.shader);
  }
}