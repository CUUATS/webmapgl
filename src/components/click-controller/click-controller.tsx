import { Component, Event, EventEmitter, Method, Prop } from '@stencil/core';


@Component({
  tag: 'gl-click-controller'
})
export class ClickController {
  clickableLayers: string[] = [];
  handlers = {
    'click': (e) => this.handleClick(e),
    'mouseenter': () => this.handleMouseenter(),
    'mouseleave': () => this.handleMouseleave()
  };
  map?: HTMLGlMapElement;

  @Event() glFeatureClick: EventEmitter;

  @Prop({connect: 'gl-map'}) lazyMap!: HTMLGlMapElement;

  @Method()
  setClickable(layer: string, clickable: boolean) {
    const layerIdx = this.clickableLayers.indexOf(layer);
    if ((layerIdx !== -1) === clickable) return;
    (clickable) ? this.clickableLayers.push(layer) :
      this.clickableLayers.splice(layerIdx, 1);

    let action = (clickable) ? this.map.on : this.map.off;
    action('click', layer, this.handlers.click);
    action('mouseenter', layer, this.handlers.mouseenter);
    action('mouseleave', layer, this.handlers.mouseleave);
  }

  async componentWillLoad() {
    this.map = await this.lazyMap.componentOnReady();
  }

  handleClick(e) {
    this.glFeatureClick.emit(e);
  }

  handleMouseenter() {
    this.map.setCursor('pointer');
  }

  handleMouseleave() {
    this.map.setCursor('');
  }
}
