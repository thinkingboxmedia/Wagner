import Pass from '../../Pass';

export default class InvertPass extends Pass {
  
  constructor() {
    super();

    this.setShader(
      require('../../shaders/vertex/basic.glsl'), 
      require('./invert-fs.glsl')
    );
  }
}