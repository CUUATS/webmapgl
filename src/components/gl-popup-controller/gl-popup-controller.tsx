import { Component, Event, EventEmitter } from '@stencil/core';
import { default as dot } from 'dot';
import { eachStyleMetadata } from '../utils';


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
  private _bodyTemplates  = {};
  private _titleTemplates  = {};
  private _map: HTMLGlMapElement;

  makeTemplate(templateStr: string) {
    if (!templateStr) return;
    return dot.template(
      templateStr, {...dot.templateSettings, varname: 'properties'});
  }

  renderTemplate(library: any, feature: any) {
    let template = library[feature.layer.id];
    return (template) ? template(feature.properties) : null;
  }

  async componentDidLoad() {
    this._map = document.querySelector('gl-map');
    await this._map.componentOnReady();
    this.update();
    this._map.addEventListener('styleUpdated', this.update.bind(this));
  }

  async update() {
    let layers = [];
    let bodyTemplates = {};
    let titleTemplates = {};
    await eachStyleMetadata('behaviors', (meta, json) => {
      meta.forEach((item) => {
        if (item.type !== 'popup' || !item.layers) return;
        let template = json.metadata['webmapgl:templates'][item.template];
        let bodyTemplate = this.makeTemplate(template.body);
        let titleTemplate = this.makeTemplate(template.title);
        item.layers.forEach((layerName) => {
          if (layers.indexOf(layerName) === -1) layers.push(layerName);
          bodyTemplates[layerName] = bodyTemplate;
          titleTemplates[layerName] = titleTemplate;
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
    this._bodyTemplates = bodyTemplates;
    this._titleTemplates = titleTemplates;
  }

  setHandlers(layer: string, add: boolean) {
    let action = (add) ? this._map.on : this._map.off;
    action('click', layer, this._handlers.click);
    action('mouseenter', layer, this._handlers.mouseenter);
    action('mouseleave', layer, this._handlers.mouseleave);
  }

  handleClick(e) {
    let features = e.features || [];
    let body = features.map(
      (f) => this.renderTemplate(this._bodyTemplates, f));
    let title = features.map(
      (f) => this.renderTemplate(this._titleTemplates, f));
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
