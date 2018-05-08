import { Component, Method } from '@stencil/core';


@Component({
  tag: 'gl-like-controller'
})
export class LikeController {

  @Method()
  getCount(feature: any): number {
    console.log(feature);
    return 0;
  }

  @Method()
  getLiked(feature: any): boolean {
    console.log(feature);
    return false;
  }

  @Method()
  like(feature: any) {
    console.log('like', feature);
  }

  @Method()
  unlike(feature: any) {
    console.log('unlike', feature);
  }
}
