import { Component, Method }
  from '@stencil/core';
import { RestOptions } from './interface';


@Component({
  tag: 'gl-rest-controller'
})
export class RestController {
  @Method()
  async send(feature: any, options: RestOptions) {
    let headers = {};
    headers['Content-Type'] = 'application/json';
    if (options.token) headers['Authorization'] = 'Bearer ' + options.token;

    return await fetch(options.url, {
      body: JSON.stringify(feature),
      headers: headers,
      method: options.method || 'POST',
      mode: options.mode || 'cors'
    });
  }
}
