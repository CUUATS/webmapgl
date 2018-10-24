import { Component, Element, Listen, Prop, State, Watch } from '@stencil/core';
import { toArray } from '../utils';

@Component({
  tag: 'gl-legend-item',
  styleUrl: 'legend-item.css'
})
export class LegendItem {
  @Element() el: HTMLElement;

  @State() visible: boolean;

  @Prop() layers: string | string[];
  @Prop() image: string;
  @Prop() toggle: boolean = false;
  @Prop() styleId: string;
  @Prop() widget: 'divider' | 'item' = 'item';

  async componentWillLoad() {
    this.handleStyleId();
  }

  @Watch('styleId')
  async handleStyleId() {
    this.update(this.getStyle().json);
  }

  @Listen('body:glStyleElementModified')
  handleStyleUpdated(e: CustomEvent) {
    if (e.detail.id === this.styleId) this.update(e.detail.json);
  }

  getStyle() : HTMLGlStyleElement {
    return document.querySelector(`gl-style#${this.styleId}`);
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

  setVisible(visible) {
    if (this.visible === visible) return;

    let layers = toArray(this.layers);
    let styleEl = this.getStyle();

    let json = {...styleEl.json};
    json.layers = (json.layers || []).map((layer) => {
      if (layers.indexOf(layer.id) !== -1) {
        layer.layout = layer.layout || {};
        layer.layout.visibility = (visible) ? 'visible' : 'none';
      }
      return layer;
    });
    styleEl.json = json;
  }

  update(json) {
    if (json) this.visible = this.getVisible(json);
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
        onIonChange={(e) => this.setVisible(e.detail.checked)}></ion-toggle>
    );

    if (this.widget === 'divider') return (
      <ion-item-divider>{content}</ion-item-divider>
    );
    return (
      <ion-item>{content}</ion-item>
    );
  }
}
