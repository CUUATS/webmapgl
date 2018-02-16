import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'gl-legend',
  styleUrl: 'gl-legend.scss'
})
export class GLLegend {
  @Prop() legendTitle: string;

  async render() {
    return (
      <ion-card>
        <ion-card-header>
          Card Header
        </ion-card-header>
        <ion-card-content>
          Content!
        </ion-card-content>
      </ion-card>
    );
  }
}
