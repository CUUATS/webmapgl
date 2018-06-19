import { Component, Element, Prop } from '@stencil/core';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-drawer-toggle'
})
export class DrawerToggle {
  drawer?: HTMLGlDrawerElement;

  @Element() el: HTMLElement;

  @Prop({connect: 'gl-drawer'}) lazyDrawer!:
    HTMLGlDrawerElement;

  @Prop() icon = 'settings';
  @Prop() buttonTitle: string = _t('webmapgl.drawer-toggle.label');

  async componentWillLoad() {
    this.drawer = await this.lazyDrawer.componentOnReady();
  }

  toggleDrawer() {
    this.drawer.open = !this.drawer.open;
  }

  render() {
    return (
      <ion-button onClick={() => this.toggleDrawer()} title={this.buttonTitle}>
        <ion-icon slot="icon-only" name={this.icon}></ion-icon>
      </ion-button>
    );
  }
}
