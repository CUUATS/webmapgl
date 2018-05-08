import { Component, Method } from '@stencil/core';


@Component({
  tag: 'gl-remote-controller'
})
export class RemoteController {
  @Method()
  send(behavior: any, feature: any) {
    let headers = {};
    headers['Content-Type'] = 'application/json';
    if (behavior.token) headers['Authorization'] = 'Bearer ' + behavior.token;

    return fetch(behavior.endpoint, {
      body: JSON.stringify(feature),
      headers: headers,
      method: behavior.method || 'POST',
      mode: behavior.mode || 'cors'
    });
  }
}
