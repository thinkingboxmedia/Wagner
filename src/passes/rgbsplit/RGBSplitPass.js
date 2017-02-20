import { Vector2 } from 'three/src/math/Vector2';

import Pass from '../../Pass';

export default class RGBSplitPass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('../../shaders/vertex/basic.glsl'), 
      require('./rgbsplit-fs.glsl')
    );

    this.params.delta = options.delta || new Vector2();
  }

  run(composer) {
    this.shader.uniforms.delta.value.copy(this.params.delta);
  
    composer.pass(this.shader);
  }
}