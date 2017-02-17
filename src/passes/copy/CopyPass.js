import Pass from '../../Pass';

export default class CopyPass extends Pass {
  
  constructor() {
    super();

    this.setShader(
      require('glslify!raw!../../shaders/vertex/basic.glsl'), 
      require('glslify!raw!./copy-fs.glsl')
    );
  }
}