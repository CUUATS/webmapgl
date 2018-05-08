import { Component, Element, Event, EventEmitter, Listen, Method, Prop }
  from '@stencil/core';
import mapboxgl from 'mapbox-gl';
import { Hold } from '../utils';


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
  private _map: mapboxgl.Map;
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
      this.styleUpdated.emit(this._style);
    }, 66);
  }

  @Listen('styleElementAdded')
  async handleStyleAdded() {
    await this.mapReady();
    this.updateStyle();
  }

  @Listen('styleElementModified')
  async handleStyleModified() {
    await this.mapReady();
    this.updateStyle();
  }

  @Listen('styleElementRemoved')
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

  @Method()
  async onStyle(fn: Function) {
    let style = await this.getStyle();
    fn(style);
    this.el.addEventListener('styleUpdated', (e) => fn((e as any).detail));
  }

  @Method()
  onBehavior(bType: string, fn: Function) {
    return this.onStyle((style) => {
      let behaviors = style.metadata['webmapgl:behaviors']
        .filter((behavior) => behavior.type === bType);
      fn(behaviors);
    });
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

  getStyleBehaviors(styleId: string, json: any) {
    if (!json.metadata) return [];

    let results = [];
    const behaviors = json.metadata['webmapgl:behaviors'];
    const resources = json.metadata['webmapgl:resources'];

    for (let item of behaviors) {
      let result = {...item};
      for (let key in item) {
        if (['layers', 'sources'].indexOf(key) !== -1)
          result[key] = item[key].map((l) => this.prefix(styleId, l));

        if (resources && key.slice(0, 9) === 'resource:') {
          let baseKey = key.slice(9);
          let library = resources[baseKey];
          let libraryKey = item[key];
          if (!library || !library[libraryKey])
            throw(`Resource does not exist: ${library}['${libraryKey}']`);
          result[baseKey] = library[libraryKey];
        }
      }
      results.push(result);
    }

    return results;
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
        let bKey = 'webmapgl:behaviors';
        let style = {
          version: 8,
          metadata: {},
          sources: {},
          layers: []
        };
        style.metadata[bKey] = [];
        styles.forEach(({id, json}) => {
          Array.prototype.push.apply(
            style.metadata[bKey], this.getStyleBehaviors(id, json));

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
