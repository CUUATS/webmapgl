import { Component, Event, EventEmitter, Method, Prop } from '@stencil/core';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw';

export interface DrawOptions {
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
export class DrawController {
  draw: MapboxDraw;
  defaultOptions: DrawOptions = {
    type: 'point',
    multiple: false,
    combine: false,
    delete: false,
    mode: 'draw'
  };
  map?: mapboxgl.Map;

  @Event() drawCreate: EventEmitter;
  @Event() drawDelete: EventEmitter;
  @Event() drawEnter: EventEmitter;
  @Event() drawExit: EventEmitter;

  @Prop({connect: 'gl-map'}) lazyMap!: HTMLGlMapElement;

  async componentWillLoad() {
    let mapEl = await this.lazyMap.componentOnReady();
    this.map = await mapEl.getMap();
    this.map.on('draw.create', (e) => this.drawCreate.emit(e));
    this.map.on('draw.delete', (e) => this.drawDelete.emit(e));
  }

  getControlOptions(options?: DrawOptions) {
    let opts = {...this.defaultOptions, ...(options || {})};

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
  async enter(options?: DrawOptions) {
    if (this.draw) return;
    this.draw = new MapboxDraw(this.getControlOptions(options));
    this.map.addControl(this.draw);
    this.drawEnter.emit();
  }

  @Method()
  async exit() {
    if (!this.draw) return;
    this.map.removeControl(this.draw);
    this.draw = null;
    this.drawExit.emit();
  }

  @Method()
  getAll() {
    if (!this.draw) return;
    return this.draw.getAll();
  }
}
