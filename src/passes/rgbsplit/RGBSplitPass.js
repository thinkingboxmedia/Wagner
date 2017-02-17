import { Vector2 } from 'three/src/math/Vector2';

import Pass from '../../Pass';

export default class RGBSplitPass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('glslify!raw!../../shaders/vertex/basic.glsl'), 
      require('glslify!raw!./rgbsplit-fs.glsl')
    );

    this._params.delta = options.delta || new Vector2();
  }

  run(composer) {
    this._shader.uniforms.delta.value.copy(this._params.delta);
  
    composer.pass(this._shader);
  }
}