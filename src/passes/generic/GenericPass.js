import Pass from '../../Pass';

export default class GenericPass extends Pass {
  
  constructor(fragment) {
    super();

    this.setShader(
      require('glslify!raw!../../shaders/vertex/ortho.glsl'), 
      fragment
    );
  }
}