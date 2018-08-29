import { Component, Event, EventEmitter, Method, Prop } from '@stencil/core';
import { DrawOptions } from './interface';
declare const MapboxDraw;


@Component({
  tag: 'gl-draw-controller'
})
export class DrawController {
  draw: any;
  defaultOptions: DrawOptions = {
    type: 'point',
    multiple: false,
    combine: false,
    delete: false,
    mode: 'draw'
  };
  map?: any;

  @Event() glDrawCreate: EventEmitter;
  @Event() glDrawDelete: EventEmitter;
  @Event() glDrawEnter: EventEmitter;
  @Event() glDrawExit: EventEmitter;

  @Prop({connect: 'gl-map'}) lazyMap!: HTMLGlMapElement;

  async componentWillLoad() {
    let mapEl = await this.lazyMap.componentOnReady();
    this.map = await mapEl.getMap();
    this.map.on('draw.create', (e) => this.glDrawCreate.emit(e));
    this.map.on('draw.delete', (e) => this.glDrawDelete.emit(e));
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
    this.glDrawEnter.emit();
  }

  @Method()
  async exit() {
    if (!this.draw) return;
    this.map.removeControl(this.draw);
    this.draw = null;
    this.glDrawExit.emit();
  }

  @Method()
  getAll() {
    if (!this.draw) return;
    return this.draw.getAll();
  }
}
