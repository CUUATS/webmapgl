import { Component, Element, Listen, Prop, State } from '@stencil/core';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-attributes-form'
})
export class GLAttributesForm {
  @Element() el: HTMLElement;
  @Prop() feature: any;
  @Prop() behavior: any;
  @Prop() heading: string;
  @Prop() submitText = _t('Save');
  @Prop() cancelText = _t('Cancel');
  @State() canSubmit = false;

  componentDidLoad() {
    this.updateValidationStatus();
  }

  @Listen('fieldValueChanged')
  async updateValidationStatus() {
    let fields = this.el.querySelector('gl-form-fields');
    if (!fields) return;
    await fields.componentOnReady();
    this.canSubmit = fields.isValid();
  }

  async dismissModal() {
    let modalCtrl = document.querySelector('ion-modal-controller');
    await modalCtrl.componentOnReady();
    modalCtrl.dismiss();
  }

  cancel() {
    this.dismissModal();
  }

  submit() {
    let fields = this.el.querySelector('gl-form-fields');
    if (fields) {
      let values = fields.getValues();
      let props = this.feature.properties || {};
      for (let i in this.behavior.fields) {
        let field = this.behavior.fields[i];
        let value = values[i];
        if (value !== undefined) props[field.attribute] = value;
      }
      this.feature.properties = props;
      let remote = document.querySelector('gl-remote-controller');
      remote.send(this.behavior, this.feature);
    }
    this.dismissModal();
  }

  render() {
    let title = this.heading || (this.behavior.type === 'add-feature') ?
      _t('Add {feature}') : _t('Edit {feature}');
    title = title.replace('{feature}', this.behavior.title);

    return ([
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>{title}</ion-title>
          <ion-buttons slot="end">
            <ion-button onClick={() => this.cancel()}>
              <ion-icon slot="start" name="close"></ion-icon>
              {this.cancelText}
            </ion-button>
            <ion-button onClick={() => this.submit()}
                disabled={!this.canSubmit}>
              <ion-icon slot="start" name="checkmark"></ion-icon>
              {this.submitText}
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <gl-form fields={this.behavior.form.fields}
          facets={this.behavior.form.facets}></gl-form>
      </ion-content>
    ]);
  }
}
