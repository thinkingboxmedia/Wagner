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
    let pass;
    let shaderItem;

    for (var i = this._availableShaders.length - 1; i >= 0; i--) {
      shaderItem = this._availableShaders[i];
      if (!shaderItem.used && shaderItem.name === shaderName) {
        shaderItem.used = true;
        pass = shaderItem.pass;
        break;
      }
    }

    if (!pass) {
      throw new Error('This Shader is not available in pool');
    }

    return pass;
  }

  extendParams(target, source) {
    // TODO do it with extends or equivalent package
    
    const obj = {};
    for (var i = 0, il = arguments.length, key; i < il; i++) {
      for (key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          obj[key] = arguments[i][key];
        }
      }
    }
    return obj;
  }
}