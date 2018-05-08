import { Component, Event, EventEmitter, Prop } from '@stencil/core';
import { compileTemplates } from '../utils';


@Component({
  tag: 'gl-popup-controller'
})
export class GLPopupController {
  map?: HTMLGlMapElement;

  @Event() openPopup: EventEmitter;
  @Prop({connect: 'gl-map'}) lazyMap!: HTMLGlMapElement;

  private _handlers = {
    'click': (e) => this.handleClick(e),
    'mouseenter': () => this.handleMouseenter(),
    'mouseleave': () => this.handleMouseleave()
  };
  private _layers : string[] = [];
  private _templates  = {};

  renderTemplate(templateName: any, feature: any) {
    let templates = this._templates[feature.layer.id];
    return (templates) ? templates[templateName](feature.properties) : null;
  }

  async componentWillLoad() {
    this.map = await this.lazyMap.componentOnReady();
    this.map.onBehavior('popup', this.update.bind(this));
  }

  async update(behaviors) {
    let layers = [];
    let templates = {};

    behaviors.forEach((item) => {
      let template = compileTemplates(item.template);
      item.layers.forEach((layerName) => {
        if (layers.indexOf(layerName) === -1) layers.push(layerName);
        templates[layerName] = template;
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
    let action = (add) ? this.map.on : this.map.off;
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
    this.map.setCursor('pointer');
  }

  handleMouseleave() {
    this.map.setCursor('');
  }
}
