import { Color } from 'three/src/math/Color';

import Pass from '../../Pass';

export default class SepiaPass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('glslify!raw!../../shaders/vertex/basic.glsl'), 
      require('glslify!raw!./sepia-fs.glsl')
    );

    this._params.amount = options.amount || 0.5;
    this._params.color = options.color || new Color(1.2, 1.0, 0.8);
  }

  run(composer) {
    this._shader.uniforms.amount.value = this._params.amount;
    this._shader.uniforms.color.value = this._params.color;

    composer.pass(this._shader);
  }
}