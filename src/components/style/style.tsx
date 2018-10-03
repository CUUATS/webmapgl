import { Component, Element, Event, EventEmitter, Prop } from '@stencil/core';


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
  @Prop({mutable: true}) json: any = {};

  componentWillLoad() {
    if (this.id === undefined) {
      this.id = 'style-' + _nextId.toString();
      _nextId += 1;
    }
    this.fetchJSON()
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
}
