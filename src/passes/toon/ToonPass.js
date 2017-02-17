import Pass from '../../Pass';

export default class ToonPass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('glslify!raw!../../shaders/vertex/basic.glsl'), 
      require('glslify!raw!./toon-fs.glsl')
    );
  }
}