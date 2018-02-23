import { Component, Element, Event, EventEmitter, Method, Prop, State
  } from '@stencil/core';


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
  @Prop() name: string;
  @Prop() thumbnail: string;
  @Prop() url: string;
  @State() json: any;
  private _jsonPromise: Promise<any>;

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
    console.log('Fetching style JSON', this.url);
    let res = await fetch(this.url);
    this.json = res.json();
  }

  @Method()
  async getJSON() {
    if (!this.enabled) return {};
    if (this.json) return this.json;
    if (this._jsonPromise) return this._jsonPromise;

    this._jsonPromise = new Promise((resolve, reject) => {
      this.fetchJSON()
        .then(() => resolve(this.json))
        .catch((err) => reject(err));
    });
    return this._jsonPromise;
  }
}
