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

  async fetchJSON() {
    let res = await fetch(this.url);
    this.json = await res.json();
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
