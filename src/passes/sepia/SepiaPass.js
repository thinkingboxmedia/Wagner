import { Color } from 'three/src/math/Color';

import Pass from '../../Pass';

export default class SepiaPass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('../../shaders/vertex/basic.glsl'), 
      require('./sepia-fs.glsl')
    );

    this.params.amount = options.amount || 0.5;
    this.params.color = options.color || new Color(1.2, 1.0, 0.8);
  }

  run(composer) {
    this.shader.uniforms.amount.value = this.params.amount;
    this.shader.uniforms.color.value = this.params.color;

    composer.pass(this.shader);
  }
}