import { Component, Element, Prop
  } from '@stencil/core';

@Component({
  tag: 'gl-legend-item',
  styleUrl: 'gl-legend-item.scss'
})
export class GLLegendItem {
  map?: HTMLGlMapElement;

  @Element() el: HTMLElement;

  @Prop() itemType: string;
  @Prop() layers: Array<string>;
  @Prop() image: string;
  @Prop({connect: 'gl-map'}) lazyMap!: HTMLGlMapElement;
  @Prop() text: string;
  @Prop() visible: boolean;

  async componentWillLoad() {
    this.map = await this.lazyMap.componentOnReady();
  }

  toggleVisible() {
    let visible = !(this.visible || false);
    this.layers.forEach((layer) => {
      this.map.setLayoutProperty(layer, 'visibility',
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
      <ion-toggle slot="end" checked={this.visible}
        onIonChange={() => this.toggleVisible()}></ion-toggle>
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
