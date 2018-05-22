import { Component, Element, Event, EventEmitter, Listen, Method, Prop }
  from '@stencil/core';
import { Hold } from '../utils';
declare const mapboxgl;


@Component({
  tag: 'gl-map',
  styleUrl: 'map.scss'
})
export class Map {
  @Element() el: HTMLElement;
  @Event() glStyleUpdated: EventEmitter;
  @Prop() latitude: number;
  @Prop() longitude: number;
  @Prop() zoom = 10;
  @Prop() minzoom = 0;
  @Prop() maxzoom = 22;
  private _map: any;
  private _ready = new Hold();
  private _resizeMapTimeout: number;
  private _style: any;
  private _updateStyleTimeout: number;

  async componentDidLoad() {
    this._style = await this.loadStyle();
    this._map = new mapboxgl.Map({
      container: this.el,
      center: [this.longitude, this.latitude],
      zoom: this.zoom,
      minZoom: this.minzoom,
      maxZoom: this.maxzoom,
      style: this._style
    });
    this._ready.release();
    window.addEventListener('resize', this.resizeMap.bind(this));
  }

  componentDidUpdate() {
    this.resizeMap();
  }

  async updateStyle() {
    if (this._updateStyleTimeout) return;
    this._updateStyleTimeout = window.setTimeout(async () => {
      this._updateStyleTimeout = null;
      this._style = await this.loadStyle();
      this._map.setStyle(this._style);
      this.glStyleUpdated.emit(this._style);
    }, 66);
  }

  @Listen('glStyleElementAdded')
  async handleStyleAdded() {
    await this.mapReady();
    this.updateStyle();
  }

  @Listen('glStyleElementModified')
  async handleStyleModified() {
    await this.mapReady();
    this.updateStyle();
  }

  @Listen('glStyleElementRemoved')
  async handleStyleRemoved() {
    await this.mapReady();
    this.updateStyle();
  }

  @Method()
  resizeMap() {
    if (this._resizeMapTimeout) return;
    this._resizeMapTimeout = window.setTimeout(async () => {
      this._resizeMapTimeout = null;
      if (this._map) this._map.resize();
    }, 66);
  }


  @Method()
  mapReady() {
    return this._ready.promise;
  }

  @Method()
  async getMap() {
    await this.mapReady();
    return this._map;
  }

  @Method()
  async getStyle() {
    await this.mapReady();
    return this._style;
  }

  @Method()
  getStyleElementById(id: string): HTMLGlStyleElement {
    let styles = document.querySelectorAll('gl-style');
    for (let i = 0; i < styles.length; i++) {
      let style = styles[i];
      if (style.id === id) return style;
    }
  }

  @Method()
  async queryRenderedFeatures(geometry? , options?) {
    await this.mapReady();
    return this._map.queryRenderedFeatures(geometry, options);
  }

  @Method()
  async querySourceFeatures(sourceId: string, options?: any) {
    await this.mapReady();
    return this._map.querySourceFeatures(sourceId, options);
  }

  @Method()
  async setLayoutProperty(layerName: string, propName: string, propValue: any) {
    let layerParts = layerName.split(':', 2);
    let style = this.getStyleElementById(layerParts[0]);
    let json = await (style as HTMLGlStyleElement).getJSON();
    for (let layer of json.layers) {
      if (layer.id === layerParts[1]) {
        layer.layout = layer.layer || {};
        layer.layout[propName] = propValue;
        style.setJSON(json);
        return;
      }
    }
  }

  @Method()
  async setCursor(cursor: string) {
    await this.mapReady();
    this._map.getCanvas().style.cursor = cursor;
  }

  on(eventName: string, layerNameOrHandler: string, handler: Function): void;
  on(eventName: string, layerNameOrHandler: Function): void;

  @Method()
  async on(eventName: string, layerNameOrHandler: string | Function,
      handler?: Function) {
    await this.mapReady();
    (handler) ?
      this._map.on(eventName, layerNameOrHandler, handler) :
      this._map.on(eventName, layerNameOrHandler);
  }

  @Method()
  async off(eventName: string, layerName: string, handler: Function) {
    await this.mapReady();
    this._map.off(eventName, layerName, handler);
  }

  getStyleLayers(styleId: string, json: any) {
    if (!json.layers) return [];
    let results = [];
    for (let layer of json.layers) {
      let result = {
        ...layer,
        id: this.prefix(styleId, layer.id)
      };
      if (layer.source) result.source = this.prefix(styleId, layer.source);
      results.push(result);
    }
    return results;
  }

  getStyleSources(styleId: string, json: any) {
    if (!json.sources) return [];
    let sources = {};
    for (let sourceName in json.sources)
      sources[this.prefix(styleId, sourceName)] = json.sources[sourceName];
    return sources;
  }

  loadStyle() {
    return Promise.all(Array.from(this.el.querySelectorAll('gl-style'))
      .map(async (styleEl) => {
        await styleEl.componentOnReady();
        let json = await styleEl.getJSON();
        return {
          id: styleEl.id,
          json: json
        };
      }))
      .then((styles) => {
        let style = {
          version: 8,
          metadata: {},
          sources: {},
          layers: []
        };
        styles.forEach(({id, json}) => {
          style.layers = this.getStyleLayers(id, json).concat(style.layers);
          style.sources = {
            ...style.sources,
            ...this.getStyleSources(id, json)
          };

          // TODO: Deal with multiple styles that each have their own glyphs
          // or sprites. See:
          // https://github.com/mapbox/mapbox-gl-js/issues/4086
          // https://github.com/mapbox/mapbox-gl-js/issues/4000
          if (json.glyphs) (style as any).glyphs = json.glyphs;
          if (json.sprite) (style as any).sprite = json.sprite;
        });
        return style;
      });
  }

  prefix(styleId: string, value: string) {
    return `${styleId}:${value}`;
  }
}
