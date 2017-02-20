import Pass from '../../Pass';

export default class DOFPass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('../../shaders/vertex/basic.glsl'), 
      require('./dof-fs.glsl')
    );

    this.params.focalDistance = options.focalDistance || 0.01;
    this.params.aperture = options.aperture || .005;
    this.params.tBias = options.tBias || null;
    this.params.blurAmount = options.blurAmount || 1;
  }

  run(composer) {
    this.shader.uniforms.tBias.value = this.params.tBias;
    this.shader.uniforms.focalDistance.value = this.params.focalDistance;
    this.shader.uniforms.aperture.value = this.params.aperture;
    this.shader.uniforms.blurAmount.value = this.params.blurAmount;

    this.shader.uniforms.delta.value.set( 1, 0 );
    composer.pass(this.shader);

    this.shader.uniforms.delta.value.set( 0, 1 );
    composer.pass(this.shader);
  }
}