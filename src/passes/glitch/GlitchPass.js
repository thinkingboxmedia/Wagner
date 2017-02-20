import { FloatType, RGBFormat } from 'three/src/constants';

import { _Math } from 'three/src/math/Math';

import { DataTexture } from 'three/src/textures/DataTexture';

import Pass from '../../Pass';

export default class GlitchPass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('../../shaders/vertex/basic.glsl'), 
      require('./glitch-fs.glsl')
    );

    // this.params.tPerturb = null;
    this.params.mode = options.mode || 0;

    this._counter = 0;
    this._breakPoint = 0;
    this._breakPoint = _Math.randInt(120, 240);

    if(options.perturbMap !== undefined) {

      this.params.tPerturb = options.perturbMap;

    } else {

      this._perturbMap = null;
      let i, x;
      let l = 64 * 64;
      let data = new Float32Array(l * 3);

      for(i = 0; i < l; ++i) {

        x = _Math.randFloat(0, 1);

        data[i * 3] = x;
        data[i * 3 + 1] = x;
        data[i * 3 + 2] = x;

      }

      this._perturbMap = new DataTexture(data, 64, 64, RGBFormat, FloatType);
      this._perturbMap.needsUpdate = true;
      this.params.tPerturb = this._perturbMap;
    }
  }

  generateTrigger() {
    this._breakPoint = _Math.randInt(120, 240);
  }

  run(composer) {
    this.shader.uniforms.tPerturb = this.params.tPerturb;
    this.shader.uniforms.active.value = true;

    if (this._counter % this._breakPoint === 0 || this.params.mode === 2) {

      this.shader.uniforms.amount.value = Math.random() / 30.0;
      this.shader.uniforms.angle.value = _Math.randFloat(-Math.PI, Math.PI);
      this.shader.uniforms.seed.value = Math.random();
      this.shader.uniforms.seedX.value = _Math.randFloat(-1.0, 1.0);
      this.shader.uniforms.seedY.value = _Math.randFloat(-1.0, 1.0);
      this.shader.uniforms.distortionX.value = _Math.randFloat(0.0, 1.0);
      this.shader.uniforms.distortionY.value = _Math.randFloat(0.0, 1.0);
      this.shader.uniforms.colS.value = 0.05;
      
      this.generateTrigger();

    } else if(this._counter % this._breakPoint < this._breakPoint / 5 || this.params.mode === 1) {

      this.shader.uniforms.amount.value = Math.random() / 90.0;
      this.shader.uniforms.angle.value = _Math.randFloat(-Math.PI, Math.PI);
      this.shader.uniforms.seed.value = Math.random();
      this.shader.uniforms.seedX.value = _Math.randFloat(-0.3, 0.3);
      this.shader.uniforms.seedY.value = _Math.randFloat(-0.3, 0.3);
      this.shader.uniforms.distortionX.value = _Math.randFloat(0.0, 1.0);
      this.shader.uniforms.distortionY.value = _Math.randFloat(0.0, 1.0);
      this.shader.uniforms.colS.value = 0.05;

    } else if(this.params.mode === 0) {

      this.shader.uniforms.active.value = false;

    }

    ++this._counter;

    composer.pass(this.shader);
  }
}