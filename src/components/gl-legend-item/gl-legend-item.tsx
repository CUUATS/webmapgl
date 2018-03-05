import { Component, Element, Prop
  } from '@stencil/core';

@Component({
  tag: 'gl-legend-item',
  styleUrl: 'gl-legend-item.scss'
})
export class GLLegendItem {
  @Element() el: HTMLElement;
  @Prop() itemType: string;
  @Prop() layers: Array<string>;
  @Prop() image: string;
  @Prop() text: string;
  @Prop() visible: boolean;

  componentDidLoad() {
    let toggle = this.el.querySelector('ion-toggle');
    if (toggle)
      toggle.addEventListener('ionChange', () => this.toggleVisible());
  }

  toggleVisible() {
    let visible = !(this.visible || false);
    let map = document.querySelector('gl-map');
    this.layers.forEach((layer) => {
      map.setLayoutProperty(layer, 'visibility',
        (visible) ? 'visible' : 'none');
    })
  }

  renderContent() {
    let content = [];
    if (this.image) content.push(
      <ion-thumbnail slot="start">
        <img src={this.image} alt={this.text} />
      </ion-thumbnail>
    );
    if (this.text) content.push(
      <ion-label>{this.text}</ion-label>
    );
    if (this.visible !== undefined) content.push(
      <ion-toggle slot="end" checked={this.visible}></ion-toggle>
    );
    return content;
  }

  render() {
    if (this.itemType === 'divider') return (
      <ion-item-divider>{this.renderContent()}</ion-item-divider>
    );
    return (
      <ion-item>{this.renderContent()}</ion-item>
    );
  }
}
