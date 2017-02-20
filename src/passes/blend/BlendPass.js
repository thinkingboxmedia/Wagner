import { Vector2 } from 'three/src/math/Vector2';

import Pass from '../../Pass';

export default class BlendPass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('../../shaders/vertex/basic.glsl'), 
      require('./blend-fs.glsl')
    );

    this.params.mode = options.mode || 1;
    this.params.opacity = options.opacity || 1;
    this.params.tInput2 = options.tInput2 || null;
    this.params.resolution2 = options.resolution2 || new Vector2();
    this.params.sizeMode = options.sizeMode || 1;
    this.params.aspectRatio = options.aspectRatio || 1;
    this.params.aspectRatio2 = options.aspectRatio2 || 1;
  }

  run(composer) {
    this.shader.uniforms.mode.value = this.params.mode;
    this.shader.uniforms.opacity.value = this.params.opacity;
    this.shader.uniforms.tInput2.value = this.params.tInput2;
    this.shader.uniforms.sizeMode.value = this.params.sizeMode;
    this.shader.uniforms.aspectRatio.value = this.params.aspectRatio;
    this.shader.uniforms.aspectRatio2.value = this.params.aspectRatio2;
    
    composer.pass(this.shader);
  }
}