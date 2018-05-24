import { Component, Element, Event, EventEmitter, Method, Prop, State
  } from '@stencil/core';


let _nextId = 0;

@Component({
  tag: 'gl-style'
})
export class Style {
  @Element() el: HTMLElement;
  @Event() glStyleElementAdded: EventEmitter;
  @Event() glStyleElementModified: EventEmitter;
  @Event() glStyleElementRemoved: EventEmitter;
  @Prop() basemap = false;
  @Prop() enabled = true;
  @Prop({mutable: true}) id: string;
  @Prop() name: string;
  @Prop() thumbnail: string;
  @Prop() token: string;
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
    this.glStyleElementAdded.emit(this);
  }

  componentDidUpdate() {
    this.glStyleElementModified.emit(this);
  }

  componentDidUnload() {
    this.glStyleElementRemoved.emit(this);
  }

  async fetchJSON() {
    let res = await fetch(this.url);
    this.json = await res.json();
    if (this.token && this.json.sources) {
      for (let srcName in this.json.sources) {
        let src = this.json.sources[srcName]
        if (src.data) src.data = src.data.replace(/\$\{TOKEN\}/g, this.token);
      }
    }
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
