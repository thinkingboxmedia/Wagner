import { Texture } from 'three/src/textures/Texture';

import Pass from '../../Pass';

export default class LookupPass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('../../shaders/vertex/basic.glsl'), 
      require('./lookup-fs.glsl')
    );
    this.params.uLookup = new Texture(512, 512);
  }

  run(composer) {
    this.shader.uniforms.uLookup.value = this.params.uLookup;

    composer.pass(this.shader);
  }
}