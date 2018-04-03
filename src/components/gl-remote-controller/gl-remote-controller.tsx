import { Component, Method } from '@stencil/core';


@Component({
  tag: 'gl-remote-controller'
})
export class GLRemoteController {
  @Method()
  send(behavior: any, feature: any) {
    console.log(behavior, feature);
  }
}
