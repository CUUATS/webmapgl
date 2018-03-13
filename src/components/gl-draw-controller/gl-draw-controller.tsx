import { Component, Event, EventEmitter, Method } from '@stencil/core';
import MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw';


@Component({
  styleUrls: [
    '../../../node_modules/@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css',
  ],
  tag: 'gl-draw-controller'
})
export class GLDrawController {
  @Event() drawEnd: EventEmitter;
  @Event() drawEnter: EventEmitter;
  @Event() drawExit: EventEmitter;
  @Event() drawStart: EventEmitter;
  private _active = false;
  private _draw = new MapboxDraw();

  async getMap() {
    let mapEl = document.querySelector('gl-map');
    await mapEl.componentOnReady();
    let map = await mapEl.getMap();
    return map;
  }

  @Method()
  async enter() {
    if (this._active) return;
    let map = await this.getMap();
    map.addControl(this._draw);
    this._active = true;
    this.drawEnter.emit();
  }

  @Method()
  async exit() {
    if (!this._active) return;
    let map = await this.getMap();
    map.removeControl(this._draw);
    this._active = false;
    this.drawExit.emit();
  }
}
