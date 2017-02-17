import { Vector2 } from 'three/src/math/Vector2';

export default class BlendPass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('glslify!raw!../../shaders/vertex/basic.glsl'), 
      require('glslify!raw!./blend-fs.glsl')
    );

    this._params.mode = options.mode || 1;
    this._params.opacity = options.opacity || 1;
    this._params.tInput2 = options.tInput2 || null;
    this._params.resolution2 = options.resolution2 || new Vector2();
    this._params.sizeMode = options.sizeMode || 1;
    this._params.aspectRatio = options.aspectRatio || 1;
    this._params.aspectRatio2 = options.aspectRatio2 || 1;
  }

  run(composer) {
    this._shader.uniforms.mode.value = this._params.mode;
    this._shader.uniforms.opacity.value = this._params.opacity;
    this._hader.uniforms.tInput2.value = this._params.tInput2;
    this._shader.uniforms.sizeMode.value = this._params.sizeMode;
    this._shader.uniforms.aspectRatio.value = this._params.aspectRatio;
    this._shader.uniforms.aspectRatio2.value = this._params.aspectRatio2;
    
    composer.pass(this._shader);
  }
}