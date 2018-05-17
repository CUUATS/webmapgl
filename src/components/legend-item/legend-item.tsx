import { Component, Element, Listen, Prop, State } from '@stencil/core';
import { toArray } from '../utils';

@Component({
  tag: 'gl-legend-item',
  styleUrl: 'legend-item.scss'
})
export class LegendItem {
  map?: HTMLGlMapElement;

  @Element() el: HTMLElement;

  @State() visible: boolean;

  @Prop() layers: string | string[];
  @Prop() image: string;
  @Prop({connect: 'gl-map'}) lazyMap!: HTMLGlMapElement;
  @Prop() toggle: boolean = false;
  @Prop() widget: 'divider' | 'item' = 'item';

  async componentWillLoad() {
    this.map = await this.lazyMap.componentOnReady();
    let style = await this.map.getStyle();
    this.update(style);
  }

  @Listen('body:glStyleUpdated')
  handleStyleUpdated(e: CustomEvent) {
    this.update(e.detail);
  }

  getVisible(json) {
    const layers = toArray(this.layers);
    if (!layers || !layers.length) return true;
    if (!json.layers || !json.layers.length) return false;
    for (let layer of json.layers) {
      if (layers.indexOf(layer.id) !== -1) {
        if (!layer.layout) return true;
        return layer.layout.visibility !== 'none';
      }
    }
  }

  toggleVisible() {
    let visible = !(this.visible || false);
    toArray(this.layers).forEach((layer) => {
      this.map.setLayoutProperty(layer, 'visibility',
        (visible) ? 'visible' : 'none');
    });
  }

  update(style) {
    this.visible = this.getVisible(style);
  }

  render() {
    let content = [];
    if (this.image) content.push(
      <ion-thumbnail slot="start">
        <img src={this.image} alt={this.el.textContent} />
      </ion-thumbnail>
    );
    content.push(
      <ion-label><slot /></ion-label>
    );
    if (this.toggle) content.push(
      <ion-toggle slot="end" checked={this.visible}
        onIonChange={() => this.toggleVisible()}></ion-toggle>
    );

    if (this.widget === 'divider') return (
      <ion-item-divider>{content}</ion-item-divider>
    );
    return (
      <ion-item>{content}</ion-item>
    );
  }
}
