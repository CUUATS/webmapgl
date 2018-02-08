import { Component, Element, Prop } from '@stencil/core';


@Component({
  tag: 'wmgl-style'
})
export class WMGLStyle {
  @Element() el: HTMLElement;
  @Prop() url: string;
}
