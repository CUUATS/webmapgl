import { Component, Element, Prop } from '@stencil/core';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-drawer-toggle'
})
export class DrawerToggle {
  @Element() el: HTMLElement;
  @Prop() icon = 'settings';
  @Prop() buttonTitle: string = _t('Toggle drawer');

  async toggleDrawer() {
    let drawer = document.querySelector('gl-drawer');
    await drawer.componentOnReady();
    drawer.open = !drawer.open;
  }

  render() {
    return (
      <ion-button onClick={() => this.toggleDrawer()} title={this.buttonTitle}>
        <ion-icon slot="icon-only" name={this.icon}></ion-icon>
      </ion-button>
    );
  }
}
