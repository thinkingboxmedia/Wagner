import { Vector2 } from 'three/src/math/Vector2';

import Pass from '../../Pass';

export default class BoxBlurPass extends Pass {
  
  constructor(deltaX, deltaY) {
    super();

    this.setShader(
      require('./box-blur-vs.glsl'), 
      require('./box-blur-fs.glsl')
    );
    this.params.delta = new Vector2(deltaX || 0, deltaY || 0);
  }

  run(composer) {
    this.shader.uniforms.delta.value.copy(this.params.delta);
    
    composer.pass(this.shader);
  }
}