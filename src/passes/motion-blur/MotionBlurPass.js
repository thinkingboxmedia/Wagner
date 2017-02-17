import { Matrix4 } from 'three/src/math/Matrix4';

import { Texture } from 'three/src/textures/Texture';

import Pass from '../../Pass';

export default class MotionBlurPass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('glslify!raw!../../shaders/vertex/basic.glsl'), 
      require('glslify!raw!./motion-blur-fs.glsl')
    );

    this._params.velocityFactor = 1;

    this._params.tDepth = new Texture(1, 1)

    this._params.viewProjectionInverseMatrix = new Matrix4();
    this._params.previousViewProjectionMatrix = new Matrix4();
  }

  run(composer) {
    this._shader.uniforms.velocityFactor.value = this._params.velocityFactor;

    this._shader.uniforms.viewProjectionInverseMatrix.value = this._params.viewProjectionInverseMatrix;
    this._shader.uniforms.previousViewProjectionMatrix.value = this._params.previousViewProjectionMatrix;
    this._shader.uniforms.tDepth.value = this._params.tDepth;
    
    composer.pass(this._shader);
  }
}