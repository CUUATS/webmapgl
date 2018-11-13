import { Component, Prop, Method } from '@stencil/core';
import { FormOptions } from './interface';


@Component({
  tag: 'gl-form-controller'
})
export class FormController {
  @Prop({connect: 'ion-modal-controller'}) modalCtrl!:
    HTMLIonModalControllerElement;

  @Method()
  async create(feature: any, options: FormOptions) {
    let form = document.createElement('gl-form');
    form.feature = feature;
    for (let optionName in options) form[optionName] = options[optionName];

    const modal = await this.modalCtrl.create({
      component: form
    });

    await modal.present();

    return await new Promise((resolve) => {
      form.addEventListener('glFormCancel', () => {
        modal.dismiss();
        resolve();
      });

      form.addEventListener('glFormSubmit', () => {
        modal.dismiss();
        resolve(feature);
      });
    });
  }
}
