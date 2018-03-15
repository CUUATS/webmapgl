import { Component, Prop } from '@stencil/core';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-attributes-form'
})
export class GLAttributesForm {
  @Prop() feature: any;
  @Prop() fields: any[];
  @Prop() heading = _t('Edit Feature');
  @Prop() submitText = _t('Save');
  @Prop() cancelText = _t('Cancel');

  getWidget(field) {
    if (field.widget) return field.widget;
    if (field.type === 'boolean') return 'toggle';
    if (field.choices) return 'radio';
    return 'input';
  }

  getFields() {
    let items = [];
    for (let field of this.fields) {
      let widget = this.getWidget(field);
      if (widget === 'radio') {
        items.push(...this.getRadioField(field));
      } else if (widget === 'select') {
        items.push(this.getSelectField(field));
      } else {
        items.push(this.getInputField(field));
      }
    }
    return items;
  }

  getRadioField(field) {
    let items = field.choices.map((choice) => {
      return (
        <ion-item>
          <ion-label>{choice.label}</ion-label>
          <ion-radio value={choice.value}></ion-radio>
        </ion-item>
      );
    });
    return ([
      <ion-list-header>{field.label}</ion-list-header>,
      <ion-radio-group>
        {items}
      </ion-radio-group>
    ]);
  }

  getSelectField(field) {
    let options = field.choices.map((choice) => {
      return (
        <ion-select-option value={choice.value}>
          {choice.label}
        </ion-select-option>
      );
    });
    return (
      <ion-item>
        <ion-label>{field.label}</ion-label>,
        <ion-select>
          {options}
        </ion-select>
      </ion-item>
    );
  }

  getInputField(field) {
    return (
      <ion-item>
        <ion-label floating>{field.label}</ion-label>
        <ion-input type="text"></ion-input>
      </ion-item>
    );
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
        <ion-list>
          {this.getFields()}
        </ion-list>
      </ion-content>
    ]);
  }
}
