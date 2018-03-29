import { Component, Prop } from '@stencil/core';
import { presentModal } from '../utils';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-attributes-controller'
})
export class GLAttributesController {
  @Prop() confirmComponent = 'gl-draw-toolbar';
  @Prop() formComponent = 'gl-attributes-form';

  componentDidLoad() {
    if (this.confirmComponent)
      document.querySelector(this.confirmComponent)
        .addEventListener('drawConfirm', (e) => {
          this.showForm((e as any).detail.features, (e as any).detail.behavior);
        });
  }

  showForm(collection: any, behavior: any) {
    if (collection.features.length === 0) return;
    // TODO: Handle multiple-feature scenarios
    let feature = collection.features[0];
    let form = document.createElement(this.formComponent);
    let title = (behavior.type === 'add-feature') ?
      _t('Add {feature}') : _t('Edit {feature}');
    title = title.replace('{feature}', behavior.title);
    (form as any).feature = feature;
    (form as any).facets = behavior.form.facets;
    (form as any).fields = behavior.form.fields;
    (form as any).heading = title;
    presentModal(form);
  }
}
