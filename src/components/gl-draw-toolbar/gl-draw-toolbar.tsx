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
  @State() complete = false;
  @State() visible = false;

  componentDidLoad() {
    let drawCtrl = document.querySelector('gl-draw-controller');
    drawCtrl.addEventListener('drawEnter', () => {
      this.complete = false;
      this.visible = true;
    });
    drawCtrl.addEventListener('drawExit', () => this.visible = false);
    drawCtrl.addEventListener('drawStart', () => this.complete = false);
    drawCtrl.addEventListener('drawEnd', () => this.complete = true);
  }

  cancel() {
    this.drawCancel.emit();
  }

  confirm() {
    this.drawConfirm.emit();
  }

  getButtons() {
    let buttons = [
      <ion-buttons slot="start">
        <ion-button onClick={() => this.cancel()}>
          <ion-icon slot="start" name="close"></ion-icon>
          {this.cancelText}
        </ion-button>
      </ion-buttons>
    ];
    if (this.complete) {
      buttons.push(
        <ion-buttons slot="end">
          <ion-button onClick={() => this.confirm()}>
            <ion-icon slot="start" name="checkmark"></ion-icon>
            {this.confirmText}
          </ion-button>
        </ion-buttons>
      );
    }
    return buttons;
  }

  render() {
    if (this.visible) return (
      <ion-toolbar color={this.color}>
        <ion-title>{this.label}</ion-title>
        {this.getButtons()}
      </ion-toolbar>
    );
  }
}
