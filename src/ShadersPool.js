export default class ShadersPool {
  
  constructor() {
    this._availableShaders = [];
  }

  getPasses(passItems) {
    let pass;
    let passes = [];

    this._availableShaders.forEach((availableShader) => {
      this._availableShader.used = false;
    });

    if (passItems) {
      passItems.forEach((passItem) => {
        if (passItem.enabled) {
          pass = this.getShaderFromPool(passItem.shaderName);
          if (passItem.params) {
            pass.params = this.extendParams(pass.params, passItem.params);
          }
          passes.push(pass);
        }
      });
    }

    return passes;
  }

  getShaderFromPool(shaderName) {

  }

  extendParams(target, source) {

  }
}