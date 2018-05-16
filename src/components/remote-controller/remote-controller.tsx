import { Component, Method } from '@stencil/core';


export interface RemoteOptions {
  url: string;
  feature: any;
  token?: string;
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  mode?: RequestMode;
}

@Component({
  tag: 'gl-remote-controller'
})
export class RemoteController {
  @Method()
  send(options: RemoteOptions) {
    let headers = {};
    headers['Content-Type'] = 'application/json';
    if (options.token) headers['Authorization'] = 'Bearer ' + options.token;

    return fetch(options.url, {
      body: JSON.stringify(options.feature),
      headers: headers,
      method: options.method || 'POST',
      mode: options.mode || 'cors'
    });
  }
}
