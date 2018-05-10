import { Component, Element } from '@stencil/core';


@Component({
  tag: 'gl-legend',
})
export class Legend {
  @Element() el: HTMLElement;

  render() {
    return (
      <ion-item-group>
        <slot name="start" />
        <slot />
        <slot name="end" />
      </ion-item-group>
    );
  }
}
