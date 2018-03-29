import { Component, Prop } from '@stencil/core';
// import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-form-facets'
})
export class GLFormFacets {
  @Prop() facets: any[] = [];

  componentDidLoad() {
    console.log('facets', this.facets);
  }

  showFields(facetId: string) {
    document.querySelector('ion-nav').push('gl-form-fields', {facet: facetId});
  }

  render() {
    let items = this.facets.map((facet) => {
      return (
        <ion-item tappable={true} onClick={() => this.showFields(facet.id)}>
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
