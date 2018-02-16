import { Component, Element, Event, EventEmitter, Method, Prop
  } from '@stencil/core';


@Component({
  tag: 'gl-style'
})
export class GLStyle {
  @Element() el: HTMLElement;
  @Event() styleChanged: EventEmitter;
  @Prop() basemap = false;
  @Prop() enabled = true;
  @Prop() name: string;
  @Prop() thumbnail: string;
  @Prop() url: string;
  private _cache: any;

  componentDidUpdate() {
    this.styleChanged.emit(this);
  }

  @Method()
  getStyleJSON() {
    if (!this.enabled) return Promise.resolve({});
    if (this._cache) return Promise.resolve(this._cache);
    return fetch(this.url)
      .then((res) => {
        this._cache = res.json();
        return this._cache;
      })
      .catch((err) => {
        console.log('Error fetching style ' + this.url + ': ' + err);
        return {};
      });
  }
}
