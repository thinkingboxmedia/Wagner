import Pass from '../../Pass';

export default class FXAAPass extends Pass {
  
  constructor() {
    super();

    this.setShader(
      require('glslify!raw!../../shaders/vertex/basic.glsl'), 
      require('glslify!raw!./fxaa-fs.glsl')
    );
  }
}