import { Component, Element, Prop } from '@stencil/core';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-basemaps'
})
export class Basemaps {
  @Element() el: HTMLElement;

  @Prop({connect: 'ion-popover-controller'}) popoverCtrl!:
    HTMLIonPopoverControllerElement;

  private async openPopover(ev: UIEvent) {
    const options = {
      component: document.createElement('gl-basemap-switcher'),
      ev: ev
    };
    const popover = await this.popoverCtrl.create(options);
    await popover.present();
    return popover;
  }

  render() {
    let title = _t('Change basemap');
    return (
      <ion-button onClick={(e) => this.openPopover(e)} title={title}>
        <ion-icon slot="icon-only" name='globe'></ion-icon>
      </ion-button>
    );
  }
}
