import Pass from '../../Pass';

import FullBoxBlurPass from '../box-blur/FullBoxBlurPass';

export default class GodrayPass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('glslify!raw!../../shaders/vertex/basic.glsl'), 
      require('glslify!raw!./godray-fs.glsl')
    );

    this._blurPass = new FullBoxBlurPass(2);

    this._width = options.width || 512;
    this._height = options.height || 512;

    this._params.blurAmount = options.blurAmount || 2;

    this._params.fX = 0.5;
    this._params.fY = 0.5;
    this._params.fExposure = 0.6;
    this._params.fDecay = 0.93;
    this._params.fDensity = 0.88;
    this._params.fWeight = 0.4;
    this._params.fClamp = 1.0;
  }

  run(composer) {
    this._shader.uniforms.fX.value = this._params.fX;
    this._shader.uniforms.fY.value = this._params.fY;
    this._shader.uniforms.fExposure.value = this._params.fExposure;
    this._shader.uniforms.fDecay.value = this._params.fDecay;
    this._shader.uniforms.fDensity.value = this._params.fDensity;
    this._shader.uniforms.fWeight.value = this._params.fWeight;
    this._shader.uniforms.fClamp.value = this._params.fClamp;

    this._blurPass.params.amount = this.params.blurAmount;
    
    composer.pass(this._blurPass);
    composer.pass(this._blurPass);

    composer.pass(this._shader);
  }
}