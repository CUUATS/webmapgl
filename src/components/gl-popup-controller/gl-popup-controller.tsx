import { Component, Event, EventEmitter } from '@stencil/core';
import { compileTemplates, eachStyleMetadata } from '../utils';


@Component({
  tag: 'gl-popup-controller'
})
export class GLPopupController {
  @Event() openPopup: EventEmitter;

  private _handlers = {
    'click': (e) => this.handleClick(e),
    'mouseenter': () => this.handleMouseenter(),
    'mouseleave': () => this.handleMouseleave()
  };
  private _layers : string[] = [];
  private _templates  = {};
  private _map: HTMLGlMapElement;

  renderTemplate(templateName: any, feature: any) {
    let templates = this._templates[feature.layer.id];
    return (templates) ? templates[templateName](feature.properties) : null;
  }

  async componentDidLoad() {
    this._map = document.querySelector('gl-map');
    await this._map.componentOnReady();
    this.update();
    this._map.addEventListener('styleUpdated', this.update.bind(this));
  }

  async update() {
    let layers = [];
    let templates = {};
    await eachStyleMetadata('behaviors', (meta, json) => {
      meta.forEach((item) => {
        if (item.type !== 'popup' || !item.layers) return;
        let template = compileTemplates(
          json.metadata['webmapgl:templates'][item.template]);
        item.layers.forEach((layerName) => {
          if (layers.indexOf(layerName) === -1) layers.push(layerName);
          templates[layerName] = template;
        });
      });
    });

    for (let newLayer of layers) {
      if (this._layers.indexOf(newLayer) !== -1) return;
      this.setHandlers(newLayer, true);
    }

    for (let oldLayer of this._layers) {
      if (layers.indexOf(oldLayer) !== -1) return;
      this.setHandlers(oldLayer, false);
    }

    this._layers = layers;
    this._templates = templates;
  }

  setHandlers(layer: string, add: boolean) {
    let action = (add) ? this._map.on : this._map.off;
    action('click', layer, this._handlers.click);
    action('mouseenter', layer, this._handlers.mouseenter);
    action('mouseleave', layer, this._handlers.mouseleave);
  }

  handleClick(e) {
    let features = e.features || [];
    let body = features.map((f) => this.renderTemplate('body', f));
    let title = features.map((f) => this.renderTemplate('title', f));
    this.openPopup.emit({
      body: body,
      title: title,
      features: features
    });
  }

  handleMouseenter() {
    this._map.setCursor('pointer');
  }

  handleMouseleave() {
    this._map.setCursor('');
  }
}
