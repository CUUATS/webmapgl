import { Component, Element, Prop } from '@stencil/core';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-app',
  styleUrl: 'app.scss'
})
export class App {
  @Element() el: HTMLElement;
  @Prop() label: string;
  @Prop() menu: boolean = true;
  @Prop() menuLabel: string = _t('webmapgl.app.menulabel');

  componentDidLoad() {
    this.el.querySelector('gl-map').resizeMap();
  }

  getMenu() {
    if (this.menu) return (
      <ion-menu>
        <ion-header>
          <ion-toolbar>
            <ion-title>{this.menuLabel}</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <div class="gl-menu-content">
            <slot name="menu" />
          </div>
        </ion-content>
      </ion-menu>
    );
  }

  getMenuButton() {
    if (this.menu) return (
      <ion-menu-toggle>
        <ion-button>
          <ion-icon slot="icon-only" name="menu"></ion-icon>
        </ion-button>
      </ion-menu-toggle>
    );
  }

  render() {
    return [
      <ion-app>
        <ion-split-pane>
          {this.getMenu()}
          <div class="pane-main" main>
            <ion-header>
              <ion-toolbar>
                <ion-buttons slot="start">
                  {this.getMenuButton()}
                  <slot name="start-buttons" />
                </ion-buttons>
                <ion-buttons slot="end">
                  <slot name="end-buttons" />
                </ion-buttons>
                <ion-title>{this.label}</ion-title>
              </ion-toolbar>
            </ion-header>
            <ion-content scrollX={false} scrollY={false} class="map-content">
              <div class="fixed-content" slot="fixed">
                <slot />
              </div>
            </ion-content>
            <slot name="after-content" />
            <ion-footer><slot name="footer" /></ion-footer>
          </div>
        </ion-split-pane>
      </ion-app>
    ];
  }
}
