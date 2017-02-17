import Pass from '../../Pass';

export default class InvertPass extends Pass {
  
  constructor() {
    super();

    this.setShader(
      require('glslify!raw!../../shaders/vertex/basic.glsl'), 
      require('glslify!raw!./invert-fs.glsl')
    );
  }
}