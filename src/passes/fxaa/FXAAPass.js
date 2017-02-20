import Pass from '../../Pass';

export default class FXAAPass extends Pass {
  
  constructor() {
    super();

    this.setShader(
      require('../../shaders/vertex/basic.glsl'), 
      require('./fxaa-fs.glsl')
    );
  }
}