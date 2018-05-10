import { Component, Method, Prop } from '@stencil/core';


@Component({
  styleUrl: 'template.scss',
  tag: 'gl-template'
})
export class Template {
  @Prop() feature: any;

  @Method()
  getValue(attribute: string) {
    if (!this.feature || !this.feature.properties) return;
    return this.feature.properties[attribute];
  }

  render() {
    if (this.feature) return (
      <slot />
    );
  }
}
