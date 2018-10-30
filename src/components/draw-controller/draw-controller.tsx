import { Component, Method } from '@stencil/core';
import { DrawOptions } from './interface';
import { getMap } from '../utils';


@Component({
  tag: 'gl-draw-controller'
})
export class DrawController {
  defaultOptions: DrawOptions = {
    type: 'point',
    multiple: false,
    combine: false,
    delete: false,
    mode: 'draw'
  };

  @Method()
  async create(featureCollection: any, options: DrawOptions) {
    let map = getMap(options.mapId);
    if (!map) throw 'Draw action map not found';

    let toolbar = document.querySelector('gl-draw-toolbar');
    if (toolbar && options.toolbarLabel) toolbar.label = options.toolbarLabel;

    map.drawOptions = this.getControlOptions(options);
    map.drawing = true;
    if (featureCollection) map.draw.set(featureCollection);

    return await new Promise((resolve) => {
      let cancel = () => {
        map.drawing = false;
        resolve();
        toolbar.removeEventListener('glDrawCancel', cancel);
      };
      toolbar.addEventListener('glDrawCancel', cancel);

      let confirm = () => {
        let featureCollection = map.draw.getAll();
        map.drawing = false;
        resolve(featureCollection);
        toolbar.removeEventListener('glDrawConfirm', confirm);
      };
      toolbar.addEventListener('glDrawConfirm', confirm);
    });
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
}
