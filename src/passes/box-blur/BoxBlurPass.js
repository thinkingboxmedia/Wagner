import { Vector2 } from 'three/src/math/Vector2';

import Pass from '../../Pass';

export default class BoxBlurPass extends Pass {
  
  constructor(deltaX, deltaY) {
    super();

    this.setShader(
      require('glslify!raw!./box-blur-vs.glsl'), 
      require('glslify!raw!./box-blur-fs.glsl')
    );
    this._params.delta = new Vector2(deltaX || 0, deltaY || 0);
  }

  run(composer) {
    this._shader.uniforms.delta.value.copy(this._params.delta);
    
    composer.pass(this._shader);
  }
}