import { Component, Element, Event, EventEmitter, Listen, Prop }
  from '@stencil/core';
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
  @Event() styleUpdated: EventEmitter;
  @Prop() latitude: number;
  @Prop() longitude: number;
  @Prop() zoom = 10;
  @Prop() minzoom = 0;
  @Prop() maxzoom = 22;
  private _loaded = false;
  private _map: mapboxgl.Map;
  private _updateStyleTimeout: number;

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
    this._loaded = true;
  }

  componentDidUpdate() {
    this.resizeMap();
  }

  async updateStyle() {
    if (this._updateStyleTimeout) return;
    this._updateStyleTimeout = window.setTimeout(async () => {
      this._updateStyleTimeout = null;
      let style = await this.getStyle();
      this._map.setStyle(style);
      this.styleUpdated.emit(style);
    }, 66);
  }

  @Listen('styleElementAdded')
  handleStyleAdded() {
    if (!this._loaded) return;
    this.updateStyle();
  }

  @Listen('styleElementModified')
  handleStyleModified() {
    if (!this._loaded) return;
    this.updateStyle();
  }

  @Listen('styleElementRemoved')
  handleStyleRemoved() {
    if (!this._loaded) return;
    this.updateStyle();
  }

  resizeMap() {
    if (this._map) this._map.resize();
  }

  getStyle() {
    return Promise.all(Array.from(this.el.querySelectorAll('gl-style'))
      .map((styleEl) => styleEl.getJSON()))
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
