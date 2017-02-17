import Pass from '../../Pass';

export default class BrightnessContrastPass extends Pass {
  
  constructor(brightness, contrast) {
    super();
    
    this.setShader(
      require('glslify!raw!../../shaders/vertex/basic.glsl'), 
      require('glslify!raw!./brightness-contrast-fs.glsl')
    );

    this._params.brightness = brightness || 1;
    this._params.contrast = contrast || 1;
  }

  run(composer) {
    this._shader.uniforms.brightness.value = this._params.brightness;
    this._shader.uniforms.contrast.value = this._params.contrast;

    composer.pass(this._shader);
  }
}