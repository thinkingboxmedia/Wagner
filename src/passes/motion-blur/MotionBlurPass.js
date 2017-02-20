import { Matrix4 } from 'three/src/math/Matrix4';

import { Texture } from 'three/src/textures/Texture';

import Pass from '../../Pass';

export default class MotionBlurPass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('../../shaders/vertex/basic.glsl'), 
      require('./motion-blur-fs.glsl')
    );

    this.params.velocityFactor = 1;

    this.params.tDepth = new Texture(1, 1)

    this.params.viewProjectionInverseMatrix = new Matrix4();
    this.params.previousViewProjectionMatrix = new Matrix4();
  }

  run(composer) {
    this.shader.uniforms.velocityFactor.value = this.params.velocityFactor;

    this.shader.uniforms.viewProjectionInverseMatrix.value = this.params.viewProjectionInverseMatrix;
    this.shader.uniforms.previousViewProjectionMatrix.value = this.params.previousViewProjectionMatrix;
    this.shader.uniforms.tDepth.value = this.params.tDepth;
    
    composer.pass(this.shader);
  }
}