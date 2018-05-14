import { Component, Element, Listen, Prop, State, Watch } from '@stencil/core';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-modal-form'
})
export class ModalForm {
  modalCtrl?: HTMLIonModalControllerElement;

  @Element() el: HTMLElement;

  @Prop() feature: any;
  @Prop() form: HTMLGlFormElement;
  @Prop() label: string;
  @Prop() submitText: string = _t('Save');
  @Prop() cancelText: string = _t('Cancel');
  @Prop({connect: 'ion-modal-controller'}) lazyModalCtrl!:
    HTMLIonModalControllerElement;

  @State() canSubmit = false;

  async componentWillLoad() {
    this.modalCtrl = await this.lazyModalCtrl.componentOnReady();
  }

  componentDidLoad() {
    this.handleForm();
  }

  @Listen('glFieldValueChanged')
  async updateValidationStatus() {
    let form = await this.form.componentOnReady();
    this.canSubmit = (form) ? form.validate().length === 0 : false;
  }

  addForm() {
    let oldForm = this.el.querySelector('gl-form');
    if (oldForm) oldForm.remove();
    this.el.querySelector('ion-content .scroll-inner').appendChild(this.form);
  }

  @Watch('form')
  handleForm() {
    this.addForm();
    this.updateValidationStatus();
  }

  cancel() {
    this.form.cancel();
    this.modalCtrl.dismiss();
  }

  async submit() {
    this.form.submit();
    this.modalCtrl.dismiss();
  }

  render() {
    return ([
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>{this.label}</ion-title>
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
      </ion-content>
    ]);
  }
}
