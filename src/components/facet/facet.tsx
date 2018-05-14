import { Component, Element, Listen, Prop, State } from '@stencil/core';
import { getThumbnail, toArray } from '../utils';


@Component({
  styleUrl: 'facet.scss',
  tag: 'gl-facet'
})
export class Facet {
  @Element() el: HTMLGlFacetElement;

  @State() visible: boolean = true;

  @Prop() facets: string;
  @Prop() image: string;
  @Prop() name: string;
  @Prop() widget: string;

  componentDidLoad() {
    this.handleFormFacet();
  }

  @Listen('body:glFormFacet')
  handleFormFacet(e?: CustomEvent) {
    let form = this.el.closest('gl-form');
    if (e && form.formId !== e.detail.form.formId) return;

    let facets = toArray(this.facets);
    if (!facets.length && !form.facet) {
      this.visible = true;
    } else if (facets.indexOf(form.facet) !== -1) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  setFacet() {
    let form = this.el.closest('gl-form');
    if (form) form.facet = this.name;
  }

  hostData() {
    return {
      class: {
        'gl-visible': this.visible
      }
    };
  }

  render() {
    if (this.visible) return (
        <ion-item button={true} onClick={() => this.setFacet()}>
          {getThumbnail(this)}
          <slot />
        </ion-item>
      );
  }
}
