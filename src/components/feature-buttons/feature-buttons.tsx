import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'gl-feature-buttons'
})
export class FeatureButtons {
  @Prop() horizontal: 'start' | 'end' | 'center' = 'end';
  @Prop() vertical: 'top' | 'bottom' | 'center' = 'bottom';

  render() {
    return (
      <ion-fab horizontal={this.horizontal} vertical={this.vertical}>
        <slot />
      </ion-fab>
    );
  }
}
