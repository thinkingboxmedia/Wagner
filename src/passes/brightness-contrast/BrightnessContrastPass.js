import Pass from '../../Pass';

export default class BrightnessContrastPass extends Pass {
  
  constructor(brightness, contrast) {
    super();
    
    this.setShader(
      require('../../shaders/vertex/basic.glsl'), 
      require('./brightness-contrast-fs.glsl')
    );

    this.params.brightness = brightness || 1;
    this.params.contrast = contrast || 1;
  }

  run(composer) {
    this.shader.uniforms.brightness.value = this.params.brightness;
    this.shader.uniforms.contrast.value = this.params.contrast;

    composer.pass(this.shader);
  }
}