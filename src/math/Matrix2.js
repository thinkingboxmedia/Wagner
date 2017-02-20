import { Matrix3 } from 'three/src/math/Matrix3';

export default class Matrix2 {
  
  constructor() {
    this.isMatrix2 = true;

    this.elements = new Float32Array( [
      1, 0,
      0, 1,
    ]);
  }

  set(n11, n12, n21, n22) {
    const te = this.elements;

    te[0] = n11; te[2] = n12;
    te[1] = n21; te[3] = n22;

    return this;
  }

  identity() {
    this.set(
      1, 0,
      0, 1
    );

    return this;
  }

  clone() {
    return new Matrix2().fromArray(this.elements);
  }

  copy(m) {
    this.elements.set(m.elements);
    
    return this;
  }

  fromArray(array, offset) {
    if (offset === undefined) offset = 0;

    for(var i = 0; i < 4; i ++) {
      this.elements[i] = array[i + offset];
    }

    return this;
  }

  multiply(m, n) {
    if (n !== undefined) {
      console.warn( 'THREE.Matrix2: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.' );
      return this.multiplyMatrices(m, n);
    }

    return this.multiplyMatrices(this, m);
  }

  multiplyMatrices(a, b) {
    const ae = a.elements;
    const be = b.elements;
    const te = this.elements;

    const a11 = ae[0], a12 = ae[2];
    const a21 = ae[1], a22 = ae[3];

    const b11 = be[0], b12 = be[2];
    const b21 = be[1], b22 = be[3];

    te[0] = a11 * b11 + a12 * b21;
    te[1] = a21 * b11 + a22 * b21;
    te[2] = a11 * b12 + a12 * b22;
    te[3] = a21 * b12 + a22 * b22;


    return this;
  }

  multiplyScalar(s) {
    const te = this.elements;

    te[0] *= s;
    te[1] *= s; 
    te[2] *= s;
    te[3] *= s;

    return this;
  }

  getInverse() {
    const mat3 = new Matrix3();
    mat3.set(
      mat2.elements[0], mat2.elements[2], 0,
      mat2.elements[1], mat2.elements[3], 0,
      0, 0, 1
    );

    var inv = (new Matrix3()).getInverse(mat3);
    return (new Matrix2()).set(
      inv.elements[0], inv.elements[3],
      inv.elements[1], inv.elements[4]
    );
  }
}