import { Component, Method } from '@stencil/core';
import { LikeOptions } from './interface';
import { LikeProxy } from './like-proxy';

@Component({
  tag: 'gl-like-controller'
})
export class LikeController {

  @Method()
  async create(feature: any, options: LikeOptions = {}) : Promise<LikeProxy> {
    return new LikeProxy(feature, options);
  }
}
