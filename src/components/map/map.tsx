import { Component, Element, Event, EventEmitter, Listen, Method, Prop, Watch }
  from '@stencil/core';
declare const mapboxgl;
declare const MapboxDraw;


@Component({
  tag: 'gl-map',
  styleUrl: 'map.scss'
})
export class Map {
  @Element() el: HTMLElement;

  @Event() glDrawCreate: EventEmitter;
  @Event() glDrawDelete: EventEmitter;
  @Event() glDrawEnter: EventEmitter;
  @Event() glDrawExit: EventEmitter;
  @Event() glStyleUpdated: EventEmitter;

  @Prop() draw: any;
  @Prop() drawOptions?: any;
  @Prop() drawing: boolean = false;
  @Prop() id: string;
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
    this.map.on('draw.create', (e) => this.glDrawCreate.emit({
      mapId: this.id,
      features: e.features
    }));
    this.map.on('draw.delete', (e) => this.glDrawDelete.emit({
      mapId: this.id,
      features: e.features
    }));
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

  @Watch('drawing')
  async updateDrawing() {
    if (this.drawing) {
      this.draw = new MapboxDraw(this.drawOptions);
      this.map.addControl(this.draw);
      this.glDrawEnter.emit({
        mapId: this.id
      });
    } else {
      this.map.removeControl(this.draw);
      this.draw = null;
      this.glDrawExit.emit({
        mapId: this.id
      });
    }
  }

  @Method()
  resizeMap() {
    if (this._resizeMapTimeout) return;
    this._resizeMapTimeout = window.setTimeout(async () => {
      this._resizeMapTimeout = null;
      if (this.map) this.map.resize();
    }, 66);
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
