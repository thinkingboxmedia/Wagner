import { Vector2 } from 'three/src/math/Vector2';

import Pass from '../../Pass';

export default class ZoomBlurPass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('../../shaders/vertex/basic.glsl'), 
      require('./zoom-blur-fs.glsl')
    );

    this.params.center = new Vector2(options.centerX || 0.5, options.centerY || 0.5);
    this.params.strength = options.strength || 0.1;
  }

  run(composer) {
    this.shader.uniforms.center.value.set(
      composer.width * this.params.center.x, 
      composer.height * this.params.center.y
    );
    this.shader.uniforms.strength.value = this.params.strength;
    
    composer.pass(this.shader);
  }
}