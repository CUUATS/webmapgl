import { Component, Prop } from '@stencil/core';
import { getThumbnail } from '../utils';


@Component({
  tag: 'gl-form-facets'
})
export class GLFormFacets {
  @Prop() facets: any[] = [];

  showFields(facetId: string) {
    document.querySelector('ion-nav').push('gl-form-fields', {facet: facetId});
  }

  render() {
    let items = this.facets.map((facet) => {
      return (
        <ion-item button={true} onClick={() => this.showFields(facet.id)}>
          {getThumbnail(facet)}
          {facet.label}
        </ion-item>
      );
    });
    return (
      <ion-list>
        {items}
      </ion-list>
    );
  }
}
