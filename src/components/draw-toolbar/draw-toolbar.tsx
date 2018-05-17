import { Component, Event, EventEmitter, Prop, State } from '@stencil/core';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-draw-toolbar'
})
export class DrawToolbar {
  @Event() glDrawCancel: EventEmitter;
  @Event() glDrawConfirm: EventEmitter;

  @Prop() cancelText: string = _t('Cancel');
  @Prop() color = 'primary';
  @Prop() confirmText: string = _t('Continue');
  @Prop() label: string = _t('Add a Feature');

  @State() featureCount = 0;
  @State() disabled = false;

  componentWillLoad() {
    document.addEventListener('glDrawEnter', () => {
      this.featureCount = 0;
      this.disabled = false;
    });
    document.addEventListener('glDrawExit', () => this.disabled = true);
    document.addEventListener('glDrawCreate', () => this.featureCount += 1);
    document.addEventListener('glDrawDelete', () => this.featureCount -= 1);
  }

  cancel() {
    this.glDrawCancel.emit();
  }

  async confirm() {
    this.glDrawConfirm.emit();
  }

  render() {
    return (
      <ion-toolbar color={this.color}>
        <ion-title>{this.label}</ion-title>
        <ion-buttons slot="end">
          <ion-button onClick={() => this.cancel()} disabled={this.disabled}>
            <ion-icon slot="start" name="close"></ion-icon>
            {this.cancelText}
          </ion-button>
          <ion-button onClick={() => this.confirm()}
              disabled={this.disabled || this.featureCount === 0}>
            <ion-icon slot="start" name="checkmark"></ion-icon>
            {this.confirmText}
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    );
  }
}
