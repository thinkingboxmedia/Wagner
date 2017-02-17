import Pass from '../../Pass';

import BoxBlurPass from './BoxBlurPass';

export default class FullBoxBlurPass extends Pass {
  
  constructor(amount) {
    super();

    amount = amount || 2;

    this._boxPass = new BoxBlurPass(amount, amount);
    this._params.amount = amount;
  }

  run(composer) {
    const s = this._params.amount;

    this._boxPass.params.delta.set(s, 0);
    composer.pass(this._boxPass );
    
    this._boxPass.params.delta.set(0, s );
    composer.pass(this._boxPass);
  }
}