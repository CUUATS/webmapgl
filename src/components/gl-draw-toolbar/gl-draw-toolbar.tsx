import { Component, Event, EventEmitter, Prop, State } from '@stencil/core';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-draw-toolbar'
})
export class GLDrawToolbar {
  @Event() drawCancel: EventEmitter;
  @Event() drawConfirm: EventEmitter;
  @Prop() cancelText = _t('Cancel');
  @Prop() color = 'primary';
  @Prop() confirmText = _t('Continue');
  @Prop() label = _t('Add a Feature');
  @State() featureCount = 0;
  @State() visible = false;

  componentDidLoad() {
    let drawCtrl = document.querySelector('gl-draw-controller');
    drawCtrl.addEventListener('drawEnter', () => {
      this.featureCount = 0;
      this.visible = true;
    });
    drawCtrl.addEventListener('drawExit', () => this.visible = false);
    drawCtrl.addEventListener('drawCreate', () => this.featureCount += 1);
    drawCtrl.addEventListener('drawDelete', () => this.featureCount -= 1);
  }

  cancel() {
    this.drawCancel.emit();
  }

  confirm() {
    this.drawConfirm.emit();
  }

  render() {
    if (this.visible) return (
      <ion-toolbar color={this.color}>
        <ion-buttons slot="start">
          <ion-button onClick={() => this.cancel()}>
            <ion-icon slot="start" name="close"></ion-icon>
            {this.cancelText}
          </ion-button>
        </ion-buttons>
        <ion-title>{this.label}</ion-title>
        <ion-buttons slot="end">
          <ion-button onClick={() => this.confirm()}
              disabled={this.featureCount === 0}>
            <ion-icon slot="start" name="checkmark"></ion-icon>
            {this.confirmText}
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    );
  }
}
