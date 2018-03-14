import { Component, Event, EventEmitter, Method } from '@stencil/core';
import MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw';

export interface GLDrawOptions {
  type?: 'point' | 'line' | 'polygon';
  multiple?: boolean;
  combine?: boolean;
  delete?: boolean;
  mode?: 'draw' | 'simple' | 'direct';
  styles?: any[];
}


@Component({
  styleUrls: [
    '../../../node_modules/@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css',
  ],
  tag: 'gl-draw-controller'
})
export class GLDrawController {
  @Event() drawCreate: EventEmitter;
  @Event() drawDelete: EventEmitter;
  @Event() drawEnter: EventEmitter;
  @Event() drawExit: EventEmitter;
  private _behavior: any;
  private _draw: MapboxDraw;
  private _defaultOptions: GLDrawOptions = {
    type: 'point',
    multiple: false,
    combine: false,
    delete: false,
    mode: 'draw'
  };

  async componentDidLoad() {
    let map = await this.getMap();
    map.on('draw.create', (e) => this.drawCreate.emit(e));
    map.on('draw.delete', (e) => this.drawDelete.emit(e));
  }

  async getMap() {
    let mapEl = document.querySelector('gl-map');
    await mapEl.componentOnReady();
    let map = await mapEl.getMap();
    return map;
  }

  getControlOptions(options?: GLDrawOptions) {
    let opts = {...this._defaultOptions, ...(options || {})};

    let mode = 'simple_select';
    if (opts.mode === 'direct') mode = 'direct_select';
    if (opts.mode === 'draw') {
      if (opts.type === 'point') mode = 'draw_point';
      if (opts.type === 'line') mode = 'draw_line_string';
      if (opts.type === 'polygon') mode = 'draw_polygon';
    }

    let result = {
      controls: {
        point: opts.multiple && opts.type === 'point',
        line_string: opts.multiple && opts.type === 'line',
        polygon: opts.multiple && opts.type === 'polygon',
        trash: opts.delete,
        combine_features: opts.multiple && opts.combine,
        uncombine_features: opts.multiple && opts.combine
      },
      defaultMode: mode
    };

    if (opts.styles) (result as any).styles = opts.styles;

    return result;
  }

  @Method()
  async enter(options?: GLDrawOptions, behavior?: any) {
    if (this._draw) return;
    this._behavior = behavior;
    this._draw = new MapboxDraw(this.getControlOptions(options));
    let map = await this.getMap();
    map.addControl(this._draw);
    this.drawEnter.emit();
  }

  @Method()
  async exit() {
    if (!this._draw) return;
    let map = await this.getMap();
    map.removeControl(this._draw);
    this._draw = null;
    this.drawExit.emit();
  }

  @Method()
  getAll() {
    if (!this._draw) return;
    return this._draw.getAll();
  }

  @Method()
  getBehavior() {
    return this._behavior;
  }
}
