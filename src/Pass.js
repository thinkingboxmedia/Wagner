import { 
	RGBFormat,
  RGBAFormat,
  LinearFilter,
} from 'three/src/constants';

import { WebGLRenderTarget } from 'three/src/renderers/WebGLRenderTarget';

import { processShader } from './utils/processShader';

export default class Pass {
  
  constructor() {
    this.shader = null;
    this.isSim = false;
    this.params = {};
  }

  setShader(vs, fs) {
    this.shader = processShader(vs, fs);
  }

  run(composer) {
    composer.pass(this.shader);
  }

  getOfflineTexture(w, h, useRGBA) {
    return new WebGLRenderTarget(w, h, {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      format: useRGBA ? RGBAFormat : RGBFormat
    });
  }
}