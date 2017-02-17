import { Vector2 } from 'three/src/math/Vector2';

import Pass from '../../Pass';

export default class SymetricPass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('glslify!raw!../../shaders/vertex/basic.glsl'), 
      require('glslify!raw!./symetric-fs.glsl')
    );

    this._params.xReverse = false;
    this._params.yReverse = false;
    this._params.xMirror = false;
    this._params.yMirror = false;
    this._params.mirrorCenter = new Vector2( 0.5, 0.5);
    this._params.angle = 0;
  }

  run(composer) {
    this._shader.uniforms.xReverse.value = this._params.xReverse;
    this._shader.uniforms.yReverse.value = this._params.yReverse;
    this._shader.uniforms.xMirror.value = this._params.xMirror;
    this._shader.uniforms.yMirror.value = this._params.yMirror;
    this._shader.uniforms.mirrorCenter.value = this._params.mirrorCenter;
    this._shader.uniforms.angle.value = this._params.angle;

    composer.pass(this._shader);
  }
}