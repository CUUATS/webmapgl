import { Component, Element, Listen, Prop } from '@stencil/core';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-dev';


@Component({
  tag: 'gl-map',
  styleUrls: [
    '../../../node_modules/mapbox-gl/dist/mapbox-gl.css',
    'gl-map.scss'
  ]
})
export class GLMap {
  @Element() el: HTMLElement;
  @Prop() latitude: number;
  @Prop() longitude: number;
  @Prop() zoom = 10;
  @Prop() minzoom = 0;
  @Prop() maxzoom = 22;
  private _map: mapboxgl.Map;
  private _styleChangedTimeout: number;

  async componentDidLoad() {
    let style = await this.getStyle();
    this._map = new mapboxgl.Map({
      container: this.el,
      center: [this.longitude, this.latitude],
      zoom: this.zoom,
      minZoom: this.minzoom,
      maxZoom: this.maxzoom,
      style: style
    });
  }

  componentDidUpdate() {
    this.resizeMap();
  }

  async updateStyle() {
    if (!this._map) return;
    let style = await this.getStyle();
    this._map.setStyle(style);
  }

  @Listen('styleChanged')
  handleStyleChanged() {
    if (this._styleChangedTimeout) return;
    this._styleChangedTimeout = window.setTimeout(() => {
      this._styleChangedTimeout = null;
      this.updateStyle();
    }, 66);
  }

  resizeMap() {
    if (this._map) this._map.resize();
  }

  getStyle() {
    return Promise.all(Array.from(this.el.querySelectorAll('gl-style'))
      .map((styleEl) => styleEl.getStyleJSON()))
      .then((styles) => {
        let style = {
          version: 8,
          sources: {},
          layers: []
        };
        styles.forEach((s) => {
          if (s.layers) style.layers = s.layers.concat(style.layers);
          if (s.sources) for (let src in s.sources)
            if (s.sources.hasOwnProperty(src))
              style.sources[src] = s.sources[src];
          // TODO: Deal with multiple styles that each have their own glyphs
          // or sprites. See:
          // https://github.com/mapbox/mapbox-gl-js/issues/4086
          // https://github.com/mapbox/mapbox-gl-js/issues/4000
          if (s.glyphs) (style as any).glyphs = s.glyphs;
          if (s.sprite) (style as any).sprite = s.sprite;
        });
        return style;
      });
  }
}
