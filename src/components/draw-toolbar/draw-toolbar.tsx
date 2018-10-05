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

  @State() visible = false;
  @State() featureCount = 0;

  @Prop() cancelText: string = _t('webmapgl.draw-toolbar.cancel');
  @Prop() color: Color = 'primary';
  @Prop() confirmText: string = _t('webmapgl.draw-toolbar.confirm');
  @Prop() label: string = _t('webmapgl.draw-toolbar.label');
  @Prop() mapId: string;
  @Prop() maxFeatures: number = 1;
  @Prop() minFeatures: number = 1;

  @Listen('body:glDrawEnter')
  handleDrawEnter(e: CustomEvent) {
    if (e.detail.mapId != this.mapId) return;
    this.featureCount = 0;
    this.visible = true;
  }

  @Listen('body:glDrawExit')
  handleDrawExit(e: CustomEvent) {
    if (e.detail.mapId != this.mapId) return;
    this.visible = false;
  }

  @Listen('body:glDrawCreate')
  handleDrawCreate(e: CustomEvent) {
    if (e.detail.mapId != this.mapId) return;
    this.featureCount += 1;
  }

  @Listen('body:glDrawDelete')
  handleDrawDelete(e: CustomEvent) {
    if (e.detail.mapId != this.mapId) return;
    this.featureCount -= 1;
  }

  cancel() {
    this.glDrawCancel.emit({
      mapId: this.mapId
    });
  }

  confirm() {
    this.glDrawConfirm.emit({
      mapId: this.mapId
    });
  }

  render() {
    if (!this.visible) return;
    let small = screen.width <= 640;
    let canConfirm = this.featureCount >= this.minFeatures &&
      this.featureCount <= this.maxFeatures;
    return (
      <ion-toolbar color={this.color}>
        <ion-title>{this.label}</ion-title>
        <ion-buttons slot="end">
          <ion-button onClick={() => { this.cancel() }}>
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
