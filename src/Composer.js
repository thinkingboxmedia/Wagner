import { 
	RGBFormat,
  RGBAFormat,
  LinearFilter,
  ClampToEdgeWrapping,
  UnsignedByteType
} from 'three/src/constants';

import { OrthographicCamera } from 'three/src/cameras/OrthographicCamera';

import { PlaneBufferGeometry } from 'three/src/geometries/PlaneBufferGeometry';

import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial';
import { ShaderMaterial } from 'three/src/materials/ShaderMaterial';

import { Mesh } from 'three/src/objects/Mesh';

import { WebGLRenderTarget } from 'three/src/renderers/WebGLRenderTarget';

import { Scene } from 'three/src/scenes/Scene';

import CopyPass from './passes/copy/CopyPass';
import Stack from './Stack';
import Pass from './Pass';

export default class Composer {
  
  constructor(renderer, settings) {
    const pixelRatio = renderer.getPixelRatio();

    this._width  = Math.floor(renderer.context.canvas.width  / pixelRatio) || 1;
    this._height = Math.floor(renderer.context.canvas.height / pixelRatio) || 1;

    this._output = null;
    this._input = null;
    this._read = null;
    this._write = null;

    this._settings = settings || {};
    this._useRGBA = this._settings.useRGBA || false;

    this._renderer = renderer;
    this._copyPass = new CopyPass(this._settings);

    this._defaultMaterial = new MeshBasicMaterial({ color: 0x00FF00, wireframe: false });
    this._scene = new Scene();
    this._quad = new Mesh(new PlaneBufferGeometry(1, 1), this.defaultMaterial);
    this._scene.add(this._quad);
    this._camera = new OrthographicCamera(1, 1, 1, 1, -10000, 10000);

    this._front = new WebGLRenderTarget(1, 1, {
      minFilter: this._settings.minFilter !== undefined ? this._settings.minFilter : LinearFilter,
      magFilter: this._settings.magFilter !== undefined ? this._settings.magFilter : LinearFilter,
      wrapS: this._settings.wrapS !== undefined ? this._settings.wrapS : ClampToEdgeWrapping,
      wrapT: this._settings.wrapT !== undefined ? this._settings.wrapT : ClampToEdgeWrapping,
      format: this._useRGBA ? RGBAFormat : RGBFormat,
      type: this._settings.type !== undefined ? this._settings.type : UnsignedByteType,
      stencilBuffer: this._settings.stencilBuffer !== undefined ? this._settings.stencilBuffer : true
    });

    this._back = this._front.clone();
    this._startTime = Date.now();
    this._passes = {};

    this.setSize(this._width, this._height);
  }

  swapBuffers() {
    this._output = this._write;
    this._input = this._read;

    const t = this._write;
    this._write = this._read;
    this._read = t;
  }

  render(scene, camera, keep, output) {
    if (keep) this.swapBuffers();
    this._renderer.render(scene, camera, output ? output : this._write, true);
    if (!output) this.swapBuffers();
  }

  toScreen(pass) {
    this._quad.material = pass ? pass.shader : this._copyPass.shader;
    this._quad.material.uniforms.tInput.value = this._read.texture;
    this._quad.material.uniforms.resolution.value.set(this._width, this._height);
    this._renderer.render(this._scene, this._camera);
  }

  toTexture(t, pass) {
    this._quad.material = pass ? pass.shader : this._copyPass.shader;
    this._quad.material.uniforms.tInput.value = this._read.texture;
    this._renderer.render(this._scene, this._camera, t, false);
  }

  pass(pass) {
    if (pass instanceof Stack) {
      this.passStack(pass);
    }
    else {
      if (pass instanceof ShaderMaterial) {
        this._quad.material = pass;
      }
      if (pass instanceof Pass) {
        pass.run(this);
        return;
      }

      if (!pass.isSim) {
        this._quad.material.uniforms.tInput.value = this._read.texture;
      }

      this._quad.material.uniforms.resolution.value.set(this._width, this._height);
      this._quad.material.uniforms.time.value = 0.001 * (Date.now() - this._startTime);
      this._renderer.render(this._scene, this._camera, this._write, false);
      this.swapBuffers();
    }
  }

  passStack(stack) {
    stack.getPasses().forEach((pass) =>  {
      this.pass(pass);
    });
  }

  reset() {
    this._read = this._front;
    this._write = this._back;
    this._output = this._write;
    this._input = this._read;
  }

  setSource() {
    this._quad.material = this._copyPass.shader;
    this._quad.material.uniforms.tInput.value = src;
    this._renderer.render(this._scene, this._camera, this._write, true);
    this.swapBuffers();
  }

  setSize(w, h) {
    this._width = w;
    this._height = h;

    this._camera.projectionMatrix.makeOrthographic( w / - 2, w / 2, h / 2, h / - 2, this._camera.near, this._camera.far );
    this._quad.scale.set( w, h, 1 );

    this._front.setSize( w, h );
    this._back.setSize( w, h );
  }
}