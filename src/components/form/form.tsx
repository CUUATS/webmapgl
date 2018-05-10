import { Component, Element, Method, Prop } from '@stencil/core';


@Component({
  tag: 'gl-form',
  styleUrl: 'form.scss'
})
export class Form {
  @Element() el: HTMLElement;
  @Prop() feature: any;
  @Prop() facet: string;

  @Method()
  getFeatureValue(attribute: string) {
    if (!this.feature || !this.feature.properties) return;
    return this.feature.properties[attribute];
  }

  render() {
    return (this.feature) ? <slot /> : null;
  }
}
