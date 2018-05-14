import { Component, Method, Prop } from '@stencil/core';


export interface ModalFormOptions {
  label?: string;
  submitText?: string;
  cancelText?: string;
}

@Component({
  tag: 'gl-modal-form-controller'
})
export class ModalFormController {
  @Prop({connect: 'ion-modal-controller'}) modalCtrl!:
    HTMLIonModalControllerElement;

  @Method()
  async create(form: HTMLGlFormElement, options: ModalFormOptions = {}) {
    let modalForm = document.createElement('gl-modal-form');
    modalForm.form = form;

    if (options.label) modalForm.label = options.label;
    if (options.submitText) modalForm.submitText = options.submitText;
    if (options.cancelText) modalForm.cancelText = options.cancelText;
    const modal = await this.modalCtrl.create({
      component: modalForm
    });
    return modal;
  }
}
