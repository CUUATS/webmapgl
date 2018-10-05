import { Component, Element, Event, EventEmitter, Prop, Watch } from '@stencil/core';
import { toArray } from '../utils';


let _nextId = 0;

@Component({
  tag: 'gl-style'
})
export class Style {
  handlers = {
    'click': (e) => this.handleClick(e),
    'mouseenter': () => this.handleMouseenter(),
    'mouseleave': () => this.handleMouseleave()
  };

  @Element() el: HTMLElement;

  @Event() glFeatureClick: EventEmitter;
  @Event() glStyleElementAdded: EventEmitter;
  @Event() glStyleElementModified: EventEmitter;
  @Event() glStyleElementRemoved: EventEmitter;

  @Prop() basemap = false;
  @Prop() clickableLayers: string[] | string = [];
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
    this.fetchJSON();
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

  getMap() {
    return this.el.closest('gl-map').map;
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

  @Watch('clickableLayers')
  updateClickable(newLayers: string[] | string, oldLayers?: string[] | string) {
    const map = this.getMap();
    newLayers = toArray(newLayers);
    oldLayers = toArray(oldLayers);

    for (let layer of newLayers) {
      const layerIdx = oldLayers.indexOf(layer);
      if (layerIdx === -1) {
        map.on('click', layer, this.handlers.click);
        map.on('mouseenter', layer, this.handlers.mouseenter);
        map.on('mouseleave', layer, this.handlers.mouseleave);
      } else {
        oldLayers.splice(layerIdx, 1);
      }
    }

    for (let layer of oldLayers) {
      map.off('click', layer, this.handlers.click);
      map.off('mouseenter', layer, this.handlers.mouseenter);
      map.off('mouseleave', layer, this.handlers.mouseleave);
    }
  }

  handleClick(e) {
    this.glFeatureClick.emit(e);
  }

  handleMouseenter() {
    this.getMap().setCursor('pointer');
  }

  handleMouseleave() {
    this.getMap().setCursor('');
  }
}
