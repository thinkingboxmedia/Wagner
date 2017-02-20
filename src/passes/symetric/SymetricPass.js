import { Vector2 } from 'three/src/math/Vector2';

import Pass from '../../Pass';

export default class SymetricPass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('../../shaders/vertex/basic.glsl'), 
      require('./symetric-fs.glsl')
    );

    this.params.xReverse = false;
    this.params.yReverse = false;
    this.params.xMirror = false;
    this.params.yMirror = false;
    this.params.mirrorCenter = new Vector2( 0.5, 0.5);
    this.params.angle = 0;
  }

  run(composer) {
    this.shader.uniforms.xReverse.value = this.params.xReverse;
    this.shader.uniforms.yReverse.value = this.params.yReverse;
    this.shader.uniforms.xMirror.value = this.params.xMirror;
    this.shader.uniforms.yMirror.value = this.params.yMirror;
    this.shader.uniforms.mirrorCenter.value = this.params.mirrorCenter;
    this.shader.uniforms.angle.value = this.params.angle;

    composer.pass(this.shader);
  }
}