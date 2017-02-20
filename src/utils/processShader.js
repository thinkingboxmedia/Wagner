import { FlatShading } from 'three/src/constants';

import { ShaderMaterial } from 'three/src/materials/ShaderMaterial';

import { Matrix3 } from 'three/src/math/Matrix3';
import { Matrix4 } from 'three/src/math/Matrix4';
import { Vector2 } from 'three/src/math/Vector2';
import { Vector3 } from 'three/src/math/Vector3';
import { Vector4 } from 'three/src/math/Vector4';

import { Texture } from 'three/src/textures/Texture';

import Matrix2 from '../math/Matrix2';

export const processShader = (vertexShaderCode, fragmentShaderCode) => {
  const regExp = /uniform\s+([^\s]+)\s+([^\s]+)\s*;/gi;
  const regExp2 = /uniform\s+([^\s]+)\s+([^\s]+)\s*\[\s*(\w+)\s*\]*\s*;/gi;

  const typesMap = {
    sampler2D: { type: 't', value: function() { return new Texture(); } },
    samplerCube: { type: 't', value: function() {} },

    bool: { type: 'b', value: function() { return 0; } },
    int: { type: 'i', value: function() { return 0; } },
    float: { type: 'f', value: function() { return 0; } },

    vec2: { type: 'v2', value: function() { return new Vector2(); } },
    vec3: { type: 'v3', value: function() { return new Vector3(); } },
    vec4: { type: 'v4', value: function() { return new Vector4(); } },

    bvec2: { type: 'v2', value: function() { return new Vector2(); } },
    bvec3: { type: 'v3', value: function() { return new Vector3(); } },
    bvec4: { type: 'v4', value: function() { return new Vector4(); } },

    ivec2: { type: 'v2', value: function() { return new Vector2(); } },
    ivec3: { type: 'v3', value: function() { return new Vector3(); } },
    ivec4: { type: 'v4', value: function() { return new Vector4(); } },

    mat2: { type: 'v2', value: function() { return new Matrix2(); } },
    mat3: { type: 'v3', value: function() { return new Matrix3(); } },
    mat4: { type: 'v4', value: function() { return new Matrix4(); } }
  };

  const arrayTypesMap = {
    float: { type: 'fv', value: function() { return []; } },
    vec3: { type: 'v3v', value: function() { return []; } }
  };

  let matches;
  const uniforms = {
    resolution: { type: 'v2', value: new Vector2( 1, 1 ), default: true },
    time: { type: 'f', value: Date.now(), default: true },
    tInput: { type: 't', value: new Texture(), default: true }
  };

  let uniformType, uniformName, arraySize;

  while ((matches = regExp.exec(fragmentShaderCode)) !== null) {
    if (matches.index === regExp.lastIndex) {
      regExp.lastIndex++;
    }
    uniformType = matches[1];
    uniformName = matches[2];

    uniforms[uniformName] = {
      type: typesMap[uniformType].type,
      value: typesMap[uniformType].value()
    };
  }

  while ((matches = regExp2.exec(fragmentShaderCode)) !== null) {
    if (matches.index === regExp.lastIndex) {
      regExp.lastIndex++;
    }
    uniformType = matches[1];
    uniformName = matches[2];
    arraySize = matches[3];

    uniforms[uniformName] = {
      type: arrayTypesMap[uniformType].type,
      value: arrayTypesMap[uniformType].value()
    };
  }

  const shader = new ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShaderCode,
    fragmentShader: fragmentShaderCode,
    shading: FlatShading,
    depthWrite: false,
    depthTest: false,
    transparent: true
  });

  return shader;
}