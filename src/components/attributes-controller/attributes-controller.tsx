import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'gl-attributes-controller'
})
export class AttributesController {
  @Prop() confirmComponent = 'gl-draw-toolbar';
  @Prop() formComponent = 'gl-attributes-form';
  @Prop({connect: 'ion-modal-controller'}) modalCtrl!:
    HTMLIonModalControllerElement;

  componentDidLoad() {
    if (this.confirmComponent)
      document.querySelector(this.confirmComponent)
        .addEventListener('drawConfirm', (e) => {
          this.showForm((e as any).detail.features, (e as any).detail.behavior);
        });
  }

  async openModal(form) {
    const modal = await this.modalCtrl.create({
      component: form
    });
    await modal.present();
    return modal;
  }

  showForm(collection: any, behavior: any) {
    if (collection.features.length === 0) return;
    // TODO: Handle multiple-feature scenarios
    let feature = collection.features[0];
    let form = document.createElement(this.formComponent);
    (form as any).feature = feature;
    (form as any).behavior = behavior;
    this.openModal(form);
  }
}
