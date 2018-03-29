import { Component, Prop } from '@stencil/core';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-attributes-form'
})
export class GLAttributesForm {
  @Prop() feature: any;
  @Prop() fields: any[];
  @Prop() facets: any[];
  @Prop() heading = _t('Edit Feature');
  @Prop() submitText = _t('Save');
  @Prop() cancelText = _t('Cancel');

  async dismissModal() {
    let modalCtrl = document.querySelector('ion-modal-controller');
    await modalCtrl.componentOnReady();
    modalCtrl.dismiss();
  }

  cancel() {
    this.dismissModal();
  }

  submit() {
    this.dismissModal();
  }

  render() {
    return ([
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>{this.heading}</ion-title>
          <ion-buttons slot="end">
            <ion-button onClick={() => this.cancel()}>
              <ion-icon slot="start" name="close"></ion-icon>
              {this.cancelText}
            </ion-button>
            <ion-button onClick={() => this.submit()}>
              <ion-icon slot="start" name="checkmark"></ion-icon>
              {this.submitText}
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <gl-form fields={this.fields} facets={this.facets}></gl-form>
      </ion-content>
    ]);
  }
}
