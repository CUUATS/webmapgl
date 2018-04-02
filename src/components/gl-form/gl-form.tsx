import { Component, Element, Prop } from '@stencil/core';


@Component({
  tag: 'gl-form',
  styleUrl: 'gl-form.scss'
})
export class GLForm {
  @Element() el: HTMLElement;
  @Prop() facets: any[];
  @Prop() fields: any[];

  componentDidLoad() {
    this.el.querySelector('ion-nav').setRoot('gl-form-facets', {
      facets: this.facets
    });
  }

  render() {
    return (<ion-nav></ion-nav>);
  }
}
