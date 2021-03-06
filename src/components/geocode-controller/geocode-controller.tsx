import { Component, Event, EventEmitter, Method, Prop } from '@stencil/core';
import { ForwardGeocodeOptions, ReverseGeocodeOptions }
  from './geocode-interface';
import { NominatimClient } from './nominatim';

@Component({
  tag: 'gl-geocode-controller'
})
export class GeocodeController {
  static clients = {};

  @Prop() defaultClient: string = 'nominatim';

  @Event() glForwardGeocode: EventEmitter;
  @Event() glReverseGeocode: EventEmitter;

  @Method()
  async forward(options: ForwardGeocodeOptions, clientOptions?: any) {
    let client = this.getClient(options.client);
    let res = await client.forward(options, clientOptions);
    this.glForwardGeocode.emit({
      options: options,
      response: res
    });
    return res;
  }

  @Method()
  async reverse(options: ReverseGeocodeOptions, clientOptions?: any) {
    let client = this.getClient(options.client);
    let res = await client.reverse(options, clientOptions);
    this.glReverseGeocode.emit({
      options: options,
      response: res
    });
    return res;
  }

  getClient(id?: string) {
    return GeocodeController.clients[id || this.defaultClient];
  }

  static addClient(id: string, service: any) {
    GeocodeController.clients[id] = service;
  }
}

GeocodeController.addClient('nominatim', new NominatimClient());
