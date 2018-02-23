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
  @Prop() toggle = false;

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
    if (this.toggle) content.push(
      <ion-toggle slot="end" checked={true}></ion-toggle>
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
