import Pass from '../../Pass';

export default class CopyPass extends Pass {
  
  constructor() {
    super();

    this.setShader(
      require('../../shaders/vertex/basic.glsl'), 
      require('./copy-fs.glsl')
    );
  }
}