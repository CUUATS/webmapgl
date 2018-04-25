import { Component, Element, Listen, Prop, State } from '@stencil/core';
import { presentToast } from '../utils';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-attributes-form'
})
export class GLAttributesForm {
  @Element() el: HTMLElement;
  @Prop() feature: any;
  @Prop() behavior: any;
  @Prop() heading: string;
  @Prop() submitText: string = _t('Save');
  @Prop() cancelText: string = _t('Cancel');
  @Prop() successMessage: string = _t('Saved successfully.');
  @Prop() failureMessage: string = _t('An error occurred while saving.');
  @Prop() alertDuration = 3000;
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

  async submit() {
    let fields = this.el.querySelector('gl-form-fields');
    if (fields) {
      let values = fields.getValues();
      let props = this.feature.properties || {};
      for (let i in this.behavior.form.fields) {
        let field = this.behavior.form.fields[i];
        let value = values[i];
        if (value !== undefined) props[field.attribute] = value;
      }
      this.feature.properties = props;
      let remote = document.querySelector('gl-remote-controller');
      let res;
      try {
        res = await remote.send(this.behavior, this.feature);
      } catch(e) {
        this.alert(false);
      }
      if (res) this.alert(res.status === 200);
    }
    this.dismissModal();
  }

  alert(success: boolean) {
    let message = (success) ?
      this.behavior.successMessage || this.successMessage :
      this.behavior.failureMessage || this.failureMessage;

    return presentToast({
      message: message,
      duration: this.alertDuration
    });
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
