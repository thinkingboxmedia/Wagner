import { Texture } from 'three/src/textures/Texture';

import Pass from '../../Pass';

export default class LookupPass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('glslify!raw!../../shaders/vertex/basic.glsl'), 
      require('glslify!raw!./lookup-fs.glsl')
    );
    this._params.uLookup = new Texture(512, 512);
  }

  run(composer) {
    this._shader.uniforms.uLookup.value = this._params.uLookup;

    composer.pass(this._shader);
  }
}