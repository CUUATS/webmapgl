import { Component, Event, EventEmitter, Listen, Prop, State }
  from '@stencil/core';
import { Color } from '@ionic/core';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-draw-toolbar'
})
export class DrawToolbar {
  @Event() glDrawCancel: EventEmitter;
  @Event() glDrawConfirm: EventEmitter;

  @State() featureCount = 0;
  @State() disabled = false;

  @Prop() cancelText: string = _t('Cancel');
  @Prop() color: Color = 'primary';
  @Prop() confirmText: string = _t('Continue');
  @Prop() label: string = _t('Add a Feature');

  @Listen('body:glDrawEnter')
  handleDrawEnter() {
    this.featureCount = 0;
    this.disabled = false;
  }

  @Listen('body:glDrawExit')
  handleDrawExit() {
    this.disabled = true;
  }

  @Listen('body:glDrawCreate')
  handleDrawCreate() {
    this.featureCount += 1;
  }

  @Listen('body:glDrawDelete')
  handleDrawDelete() {
    this.featureCount -= 1;
  }

  cancel() {
    this.glDrawCancel.emit();
  }

  async confirm() {
    this.glDrawConfirm.emit();
  }

  render() {
    let small = screen.width <= 640;
    let canCancel = !this.disabled;
    let canConfirm = !this.disabled && this.featureCount > 0;
    return (
      <ion-toolbar color={this.color}>
        <ion-title>{this.label}</ion-title>
        <ion-buttons slot="end">
          <ion-button onClick={() => { if (canCancel) this.cancel(); }}
              disabled={!canCancel}>
            <ion-icon slot={(small) ? 'icon-only' : 'start'} name="close">
            </ion-icon>
            {(small) ? null : this.cancelText}
          </ion-button>
          <ion-button onClick={() => {if (canConfirm) this.confirm(); }}
              disabled={!canConfirm}>
            <ion-icon slot={(small) ? 'icon-only' : 'start'} name="checkmark">
            </ion-icon>
            {(small) ? null : this.confirmText}
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    );
  }
}
