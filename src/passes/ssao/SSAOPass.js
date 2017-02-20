import { Texture } from 'three/src/textures/Texture';

import Pass from '../../Pass';
import BlendPass from '../blend/BlendPass';
import FullBoxBlurPass from '../box-blur/FullBoxBlurPass';
import Composer from '../../Composer';

export default class SSAOPass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('../../shaders/vertex/basic.glsl'), 
      require('./ssao-fs.glsl')
    );

    this._blendPass = new BlendPass();

    this._blurPass = new FullBoxBlurPass(2);

    this.params.tDepth = new Texture();
    this.params.isPacked = false;
    this.params.onlyOcclusion = false;
    this.params.blurAmount = 1;
  }

  run(composer) {
    this.shader.uniforms.tDepth.value = this._tDepth;

    if(!this._composer) {
      const s = 4;
      this._composer = new Composer(composer.renderer, { useRGBA: true });
      this._composer.setSize(composer.width / s, composer.height / s);
    }

    this._composer.reset();

    this._composer.setSource(composer.output);

    this.shader.uniforms.tDepth.value = this.params.tDepth;
    this.shader.uniforms.isPacked.value = this.params.isPacked;
    this.shader.uniforms.onlyOcclusion.value = this.params.onlyOcclusion;
    this._composer.pass(this.shader);

    this._blurPass.params.amount = this.params.blurAmount;
    this._composer.pass(this._blurPass);

    if(this.params.onlyOcclusion) {
      composer.setSource(this._composer.output);
    } else {    
      this._blendPass.params.mode = 4;
      this._blendPass.params.tInput2 = this._composer.output;

      composer.pass(this._blendPass);
    }
  }
}