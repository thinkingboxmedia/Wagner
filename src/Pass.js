import { 
	RGBFormat,
  RGBAFormat,
  LinearFilter,
} from 'three/src/constants';

import { WebGLRenderTarget } from 'three/src/renderers/WebGLRenderTarget';

import { processShader } from './utils/processShader';

export default class Pass {
  
  constructor() {
    this._shader = null;
    this._loaded = null;
    this._params = {};
    this._isSim = false;
  }

  setShader(vs, fs) {
    this._shader = processShader(vs, fs);
  }

  run(composer) {
    composer.pass(this._shader);
  }

  getOfflineTexture(w, h, useRGBA) {
    return new WebGLRenderTarget(w, h, {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      format: useRGBA ? RGBAFormat : RGBFormat
    });
  }
}