import { Texture } from 'three/src/textures/Texture';

import Pass from '../../Pass';
import BlendPass from '../blend/BlendPass';
import FullBoxBlurPass from '../box-blur/FullBoxBlurPass';
import Composer from '../../Composer';

export default class SSAOPass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('glslify!raw!../../shaders/vertex/basic.glsl'), 
      require('glslify!raw!./ssao-fs.glsl')
    );

    this._blendPass = new BlendPass();

    this._blurPass = new FullBoxBlurPass(2);

    this._params.tDepth = new Texture();
    this._params.isPacked = false;
    this._params.onlyOcclusion = false;
    this._params.blurAmount = 1;
  }

  run(composer) {
    this._shader.uniforms.tDepth.value = this._tDepth;

    if(!this._composer) {
      const s = 4;
      this._composer = new Composer(composer.renderer, { useRGBA: true });
      this._composer.setSize(composer.width / s, composer.height / s);
    }

    this._composer.reset();

    this._composer.setSource(composer.output);

    this._shader.uniforms.tDepth.value = this._params.tDepth;
    this._shader.uniforms.isPacked.value = this._params.isPacked;
    this._shader.uniforms.onlyOcclusion.value = this._params.onlyOcclusion;
    this._composer.pass(this._shader);

    this._blurPass.params.amount = this._params.blurAmount;
    this._composer.pass(this._blurPass);

    if(this._params.onlyOcclusion) {
      composer.setSource(this._composer.output);
    } else {    
      this._blendPass.params.mode = 4;
      this._blendPass.params.tInput2 = this._composer.output;

      composer.pass(this._blendPass);
    }
  }
}