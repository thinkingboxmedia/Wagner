import Pass from '../../Pass';

export default class DOFPass extends Pass {
  
  constructor(options = {}) {
    super();

    this.setShader(
      require('glslify!raw!../../shaders/vertex/basic.glsl'), 
      require('glslify!raw!./dof-fs.glsl')
    );

    this._params.focalDistance = options.focalDistance || 0.01;
    this._params.aperture = options.aperture || .005;
    this._params.tBias = options.tBias || null;
    this._params.blurAmount = options.blurAmount || 1;
  }

  run(composer) {
    this._shader.uniforms.tBias.value = this._params.tBias;
    this._shader.uniforms.focalDistance.value = this._params.focalDistance;
    this._shader.uniforms.aperture.value = this._params.aperture;
    this._shader.uniforms.blurAmount.value = this._params.blurAmount;

    this._shader.uniforms.delta.value.set( 1, 0 );
    composer.pass(this._shader);

    this._shader.uniforms.delta.value.set( 0, 1 );
    composer.pass(this._shader);
  }
}