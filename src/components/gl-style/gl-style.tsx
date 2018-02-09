import { Component, Element, Prop } from '@stencil/core';


@Component({
  tag: 'gl-style'
})
export class GLStyle {
  @Element() el: HTMLElement;
  @Prop() url: string;
}
