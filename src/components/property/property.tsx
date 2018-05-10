import { Component, Element, Prop } from '@stencil/core';


@Component({
  tag: 'gl-property'
})
export class Field {
  @Element() el: HTMLElement;
  @Prop() attribute: string;

  render() {
    const template = this.el.closest('gl-template');
    if (!template) return null;

    const value = template.getValue(this.attribute);
    if (value === undefined) return null;
    return value.toString();
  }
}
