import { Vector2 } from 'three/src/math/Vector2';

import Pass from '../../Pass';
import Composer from '../../Composer';
import { BlendMode } from '../../BlendMode';

import FullBoxBlurPass from '../box-blur/FullBoxBlurPass';
import BlendPass from '../blend/BlendPass';
import ZoomBlurPass from '../zoom-blur/ZoomBlurPass';
import BrightnessContrastPass from '../brightness-contrast/BrightnessContrastPass';

export default class MultiPassBloomPass extends Pass {
  
  constructor(options = {}) {
    super();

    this._composer = null;

    this._tmpTexture = this.getOfflineTexture(options.width, options.height, true);
    this._blurPass = new FullBoxBlurPass(2);
    this._blendPass = new BlendPass();
    this._zoomBlur = new ZoomBlurPass();
    this._brightnessContrastPass = new BrightnessContrastPass();

    this._width = options.width || 512;
    this._height = options.height || 512;

    this.params.blurAmount = options.blurAmount || 2;
    this.params.applyZoomBlur = options.applyZoomBlur || false;
    this.params.zoomBlurStrength = options.zoomBlurStrength || 0.2;
    this.params.useTexture = options.useTexture || false;
    this.params.zoomBlurCenter = options.zoomBlurCenter || new Vector2(0.5, 0.5);
    this.params.blendMode = options.blendMode || BlendMode.Screen;
    this.params.glowTexture = null;
  }

  run(composer) {

    if (!this._composer) {
      this._composer = new Composer(composer.renderer, { useRGBA: true });
      this._composer.setSize(this._width, this._height);
    }

    this._composer.reset();

    if (this.params.useTexture === true) {
      this._composer.setSource(this.params.glowTexture.texture);
    } else {
      this._composer.setSource(composer.output.texture);
    }

    this._blurPass.params.amount = this.params.blurAmount;
    this._composer.pass(this._blurPass);
    
    if (this.params.applyZoomBlur) {
      this._zoomBlur.params.center.set(0.5, 0.5);
      this._zoomBlur.params.strength = this.params.zoomBlurStrength;
      
      this._composer.pass(this._zoomBlur);
    }

    if (this.params.useTexture === true) {
      this._blendPass.params.mode = BlendMode.Screen;
      this._blendPass.params.tInput = this.params.glowTexture.texture;

      composer.pass(this._blendPass);
    }

    this._blendPass.params.mode = this.params.blendMode;
    this._blendPass.params.tInput2 = this._composer.output.texture;

    composer.pass(this._blendPass)
  }
}