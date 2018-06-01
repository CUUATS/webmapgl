import { Component, Listen, Prop, State } from '@stencil/core';
import { _t } from '../i18n/i18n';
import { FormOptions } from '../form-controller/form-controller';


@Component({
  tag: 'gl-feature-add'
})
export class FeatureAdd {
  drawCtrl?: HTMLGlDrawControllerElement;
  map?: HTMLGlMapElement;
  remoteCtrl?: HTMLGlRemoteControllerElement;

  @Prop({connect: 'gl-draw-controller'}) lazyDrawCtrl!:
    HTMLGlDrawControllerElement;
  @Prop({connect: 'gl-map'}) lazyMap!: HTMLGlMapElement;
  @Prop({connect: 'gl-remote-controller'}) lazyRemoteCtrl!:
    HTMLGlRemoteControllerElement;
  @Prop({connect: 'gl-form-controller'}) formCtrl!:
    HTMLGlFormControllerElement;
  @Prop({connect: 'ion-toast-controller'}) toastCtrl!:
    HTMLIonToastControllerElement;

  @Prop() alertDuration = 3000;
  @Prop() formId: string = `gl-feature-add-form-${formId++}`;
  @Prop() icon = 'add';
  @Prop() failureMessage: string = _t('An error occurred while saving.');
  @Prop() layers: string | string[];
  @Prop() label: string = _t('Add a Feature');
  @Prop() method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' = 'POST';
  @Prop() requestMode: RequestMode;
  @Prop() successMessage: string = _t('Saved successfully.');
  @Prop() schema: string;
  @Prop() token: string;
  @Prop() toolbarLabel: string = _t('Choose a Location');
  @Prop() url: string;

  @State() disabled: boolean = false;
  @State() drawing: boolean = false;

  @Listen('body:glDrawCancel')
  async cancelDraw() {
    if (!this.drawing) return;
    this.removeConfirm();
    this.drawCtrl.exit();
    this.drawing = false;
  }

  @Listen('body:glDrawConfirm')
  async confirmDraw() {
    if (!this.drawing) return;
    let featureCollection = this.drawCtrl.getAll();
    this.removeConfirm();
    this.drawCtrl.exit();

    if (featureCollection.features.length) {
      let options: FormOptions = {};
      if (this.label) options.label = this.label;
      if (this.formId) options.formId = this.formId;
      let modal = await this.formCtrl.create(
        this.schema, featureCollection.features[0], options);
      await modal.present();
    }

    this.drawing = false;
  }

  @Listen('body:glDrawEnter')
  enterDraw() {
    this.disabled = true;
  }

  @Listen('body:glDrawExit')
  exitDraw() {
    this.disabled = false;
  }

  @Listen('body:glFormSubmit')
  async submitForm(e: CustomEvent) {
    this.disabled = false;
    if (e.detail.formId !== this.formId || !this.url) return;

    let res;
    try {
      res = await this.remoteCtrl.send({
        url: this.url,
        feature: e.detail.feature,
        token: this.token,
        method: this.method,
        mode: this.requestMode
      });
    } catch(e) {
      this.alert(false);
    }
    if (res) this.alert(res.status === 200);
  }

  async componentWillLoad() {
    this.drawCtrl = await this.lazyDrawCtrl.componentOnReady();
    this.map = await this.lazyMap.componentOnReady();
    this.remoteCtrl = await this.lazyRemoteCtrl.componentOnReady();
  }

  async alert(success: boolean) {
    if (this.alertDuration === 0) return;
    let message = (success) ? this.successMessage : this.failureMessage;
    let options = {
      message: message,
      duration: this.alertDuration
    };
    let toast = await this.toastCtrl.create(options);
    await toast.present();
    return toast;
  }

  removeConfirm() {
    document.querySelector('gl-draw-toolbar').remove();
    this.map.resizeMap();
  }

  async startDraw() {
    this.drawing = true;
    let confirm = document.createElement('gl-draw-toolbar');
    confirm.label = this.toolbarLabel;
    document.querySelector('ion-footer').appendChild(confirm);
    this.map.resizeMap();
    this.drawCtrl.enter();
  }

  render() {
    let items = [<div style={{display: 'none'}}><slot /></div>];
    if (!this.disabled) items.push(
      <ion-fab-button onClick={() => this.startDraw()}>
        <ion-icon name={this.icon}></ion-icon>
      </ion-fab-button>
    );
    return items;
  }
}

let formId = 0;
