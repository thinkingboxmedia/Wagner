export default class Stack {
  
  constructor(shadersPool) {
    this._passItems = [];
    this._shadersPool = shadersPool;
    this._passes = [];
  }

  addPass(shaderName, enabled, params, index) {
    let length = 0;
    const passItem = {
      shaderName: shaderName,
      enabled: enabled || false
    };

    // TODO use and store params values

    this._passItems.push(passItem);
    length = this._passItems.length;

    this.updatePasses();

    if (index) {
      return this.movePassToIndex(this._passItems[length], index);
    }
    else {
      return length - 1;
    }
  }

  removePass(index) {
    this._passItems.splice(index, 1);
    this.updatePasses();
  }

  enablePass(index) {
    this._passItems[index].enabled = true;
    this.updatePasses();
  }

  disablePass(index) {
    this._passItems[index].enabled = false;
    this.updatePasses();
  }

  isPassEnabled(index) {
    return this._passItems[index].enabled;
  }

  movePassToIndex(index, destIndex) {
    this._passItems.splice(destIndex, 0, this._passItems.splice(index, 1)[0]);
    this.updatePasses();

    // TODO check if destIndex is final index
    return destIndex;
  }

  reverse() {
    this._passItems.reverse();
    this.updatePasses();
  }

  updatePasses() {
    this._passes = this._shadersPool.getPasses(this._passItems);

    // init default params for new passItems
    this._passItems.forEach((passItem, index) => {
      if (passItem.params === undefined) {
        passItem.params = JSON.parse(JSON.stringify(this._passes[index].params)); // clone params without reference to the real shader instance params
      }
    });
  }

  getPasses() {
    return this._passes;
  }
}