import { Vector2 } from 'three/src/math/Vector2';

import Pass from '../../Pass';

export default class ZoomBlurPass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('glslify!raw!../../shaders/vertex/basic.glsl'), 
      require('glslify!raw!./zoom-blur-fs.glsl')
    );

    this._params.center = new Vector2(options.centerX || 0.5, options.centerY || 0.5);
    this._params.strength = options.strength || 0.1;
  }

  run(composer) {
    this._shader.uniforms.center.value.set(
      composer.width * this._params.center.x, 
      composer.height * this._params.center.y
    );
    this._shader.uniforms.strength.value = this._params.strength;
    
    composer.pass(this._shader);
  }
}