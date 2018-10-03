import { Component, Element, Event, EventEmitter, Listen, Method, Prop }
  from '@stencil/core';
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
  @Prop({mutable: true}) map: any;
  private _resizeMapTimeout: number;
  private _style: any;
  private _updateStyleTimeout: number;

  async componentWillLoad() {
    this._style = this.loadStyle();
    this.map = new mapboxgl.Map({
      container: this.el,
      center: [this.longitude, this.latitude],
      zoom: this.zoom,
      minZoom: this.minzoom,
      maxZoom: this.maxzoom,
      style: this._style
    });
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
      this.map.setStyle(this._style);
      this.glStyleUpdated.emit(this._style);
    }, 66);
  }

  @Listen('glStyleElementAdded')
  async handleStyleAdded() {
    this.updateStyle();
  }

  @Listen('glStyleElementModified')
  async handleStyleModified() {
    this.updateStyle();
  }

  @Listen('glStyleElementRemoved')
  async handleStyleRemoved() {
    this.updateStyle();
  }

  @Method()
  resizeMap() {
    if (this._resizeMapTimeout) return;
    this._resizeMapTimeout = window.setTimeout(async () => {
      this._resizeMapTimeout = null;
      if (this.map) this.map.resize();
    }, 66);
  }

  @Method()
  async easeTo(options: any) {
    this.map.easeTo(options);
  }

  @Method()
  async fitBounds(bounds: any, options: any) {
    return this.map.fitBounds(bounds, options);
  }

  @Method()
  async flyTo(options: any) {
    this.map.flyTo(options);
  }

  @Method()
  async getCenter() {
    return this.map.getCenter();
  }

  @Method()
  async getLayoutProperty(layerName: string, propName: string) {
    let {layer} = await this.getLayerInfo(layerName);
    if (layer) return (layer.layer || {})[propName];
  }

  @Method()
  async getPaintProperty(layerName: string, propName: string) {
    let {layer} = await this.getLayerInfo(layerName);
    if (layer) return (layer.paint || {})[propName];
  }

  @Method()
  async getStyle() {
    return this._style;
  }

  @Method()
  async getStyleElementById(id: string): Promise<HTMLGlStyleElement> {
    let styles = document.querySelectorAll('gl-style');
    for (let i = 0; i < styles.length; i++) {
      let style = styles[i];
      if (style.id === id) return style;
    }
  }

  @Method()
  async getZoom() {
    return this.map.getZoom();
  }

  @Method()
  async queryRenderedFeatures(geometry? , options?) {
    return this.map.queryRenderedFeatures(geometry, options);
  }

  @Method()
  async querySourceFeatures(sourceId: string, options?: any) {
    return this.map.querySourceFeatures(sourceId, options);
  }

  @Method()
  async setLayoutProperty(layerName: string, propName: string, propValue: any) {
    let {layer} = await this.getLayerInfo(layerName);
    if (layer) {
      layer.layout = layer.layout || {};
      layer.layout[propName] = propValue;
      // style.setJSON(styleJson);
    }
  }

  @Method()
  async setPaintProperty(layerName: string, propName: string, propValue: any) {
    let {layer} = await this.getLayerInfo(layerName);
    if (layer) {
      layer.paint = layer.paint || {};
      layer.paint[propName] = propValue;
      // style.setJSON(styleJson);
    }
  }

  @Method()
  async setCenter(center: any, eventData: any) {
    return this.map.setCenter(center, eventData);
  }

  @Method()
  async setCursor(cursor: string) {
    this.map.getCanvas().style.cursor = cursor;
  }

  on(eventName: string, layerNameOrHandler: string, handler: Function): void;
  on(eventName: string, layerNameOrHandler: Function): void;

  @Method()
  async on(eventName: string, layerNameOrHandler: string | Function,
      handler?: Function) {
    (handler) ?
      this.map.on(eventName, layerNameOrHandler, handler) :
      this.map.on(eventName, layerNameOrHandler);
  }

  @Method()
  async off(eventName: string, layerName: string, handler: Function) {
    this.map.off(eventName, layerName, handler);
  }

  async getLayerInfo(layerName: string) {
    let layerParts = layerName.split(':', 2);
    let style = await this.getStyleElementById(layerParts[0]);
    let json = (style as HTMLGlStyleElement).json;
    for (let layer of json.layers) {
      if (layer.id === layerParts[1]) {
        return {
          layer: layer,
          style: style,
          styleJson: json
        };
      }
    }
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
    let style = {
      version: 8,
      metadata: {},
      sources: {},
      layers: []
    };

    Array.from(this.el.querySelectorAll('gl-style')).forEach((styleEl) => {
      if (!styleEl.enabled) return;

      let id = styleEl.id;
      let json = styleEl.json;

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
  }

  prefix(styleId: string, value: string) {
    return `${styleId}:${value}`;
  }
}
