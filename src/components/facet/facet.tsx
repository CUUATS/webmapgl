import { Component, Element, Prop } from '@stencil/core';
import { getThumbnail } from '../utils';


@Component({
  styleUrl: 'facet.scss',
  tag: 'gl-facet'
})
export class Facet {
  @Element() el: HTMLGlFacetElement;

  @Prop() facets: string;
  @Prop() image: string;
  @Prop() name: string;
  @Prop() visible: boolean = true;
  @Prop() widget: string;

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
