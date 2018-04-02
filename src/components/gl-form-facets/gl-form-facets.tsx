import { Component, Prop } from '@stencil/core';
// import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-form-facets'
})
export class GLFormFacets {
  @Prop() facets: any[] = [];

  showFields(facetId: string) {
    document.querySelector('ion-nav').push('gl-form-fields', {facet: facetId});
  }

  getThumbnail(facet) {
    if (facet.image) return (
      <ion-thumbnail slot="start">
        <img src={facet.image} />
      </ion-thumbnail>
    );
  }

  render() {
    let items = this.facets.map((facet) => {
      return (
        <ion-item button={true} onClick={() => this.showFields(facet.id)}>
          {this.getThumbnail(facet)}
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
