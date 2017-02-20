import Pass from '../../Pass';

export default class ToonPass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('../../shaders/vertex/basic.glsl'), 
      require('./toon-fs.glsl')
    );
  }
}