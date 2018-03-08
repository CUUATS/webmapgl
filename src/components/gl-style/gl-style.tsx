import { Component, Element, Event, EventEmitter, Method, Prop, State
  } from '@stencil/core';


let _nextId = 0;

@Component({
  tag: 'gl-style'
})
export class GLStyle {
  @Element() el: HTMLElement;
  @Event() styleElementAdded: EventEmitter;
  @Event() styleElementModified: EventEmitter;
  @Event() styleElementRemoved: EventEmitter;
  @Prop() basemap = false;
  @Prop() enabled = true;
  @Prop({mutable: true}) id: string;
  @Prop() name: string;
  @Prop() thumbnail: string;
  @Prop() url: string;
  @State() json: any;
  private _jsonPromise: Promise<any>;

  componentWillLoad() {
    if (this.id === undefined) {
      this.id = 'style-' + _nextId.toString();
      _nextId += 1;
    }
  }

  componentDidLoad() {
    this.styleElementAdded.emit(this);
  }

  componentDidUpdate() {
    this.styleElementModified.emit(this);
  }

  componentDidUnload() {
    this.styleElementRemoved.emit(this);
  }

  _prefix(value: string) {
    return `${this.id}:${value}`;
  }

  addPrefix(json: any) {
    if (!json) return;

    if (json.layers)
      for (let layer of json.layers) {
        layer.id = this._prefix(layer.id);
        if (layer.source) layer.source = this._prefix(layer.source);
      }

    if (json.sources) {
      let sources = {};
      for (let sourceName in json.sources)
        sources[this._prefix(sourceName)] = json.sources[sourceName];
      json.sources = sources;
    }

    if (json.metadata) {
      for (let key in json.metadata) {
        if (key.slice(0, 9) !== 'webmapgl:') continue;
        let items = json.metadata[key];
        if (!(items instanceof Array)) continue;
        for (let item of items)
          if (item.layers) item.layers =
            item.layers.map((l) => this._prefix(l));
      }
    }

    return json;
  }

  async fetchJSON() {
    let res = await fetch(this.url);
    let json = await res.json();
    this.json = this.addPrefix(json);
  }

  @Method()
  async getJSON() {
    if (!this.enabled) return {};
    if (this.json) return this.json;
    if (this._jsonPromise) return this._jsonPromise;

    this._jsonPromise = new Promise((resolve) => {
      this.fetchJSON()
        .then(() => resolve(this.json))
        .catch(() => {
          this.json = {};
          resolve(this.json);
        });
    });
    return this._jsonPromise;
  }

  @Method()
  setJSON(json: any) {
    this.json = {...json};
  }
}
