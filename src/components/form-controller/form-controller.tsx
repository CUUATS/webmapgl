import { Component, Method, Prop } from '@stencil/core';


export interface FormOptions {
  label?: string;
  formId?: string;
  submitText?: string;
  cancelText?: string;
}


@Component({
  tag: 'gl-form-controller'
})
export class FormController {
  @Prop({connect: 'ion-modal-controller'}) modalCtrl!:
    HTMLIonModalControllerElement;

  @Method()
  async create(schema: string, feature: any, options: FormOptions = {}) {
    let form = document.createElement('gl-form');
    form.schema = schema;
    form.feature = feature;
    if (options.label) form.label = options.label;
    if (options.formId) form.formId = options.formId;
    if (options.submitText) form.submitText = options.submitText;
    if (options.cancelText) form.cancelText = options.cancelText;

    const modal = await this.modalCtrl.create({
      component: form
    });

    form.addEventListener('glFormCancel', () => modal.dismiss());
    form.addEventListener('glFormSubmit', () => modal.dismiss());

    return modal;
  }
}
