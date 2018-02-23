import '@ionic/core';
import { Component, Element, Prop } from '@stencil/core';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-app',
  styleUrl: 'gl-app.scss'
})
export class GLApp {
  @Element() el: HTMLElement;
  @Prop() allowFullscreen = true;
  @Prop() legend = true;
  @Prop() mapTitle: string;

  render() {
    return (
      <ion-app>
        <ion-split-pane>
          <ion-menu>
            <ion-header>
              <ion-toolbar>
                <ion-title>{_t('Legend')}</ion-title>
              </ion-toolbar>
            </ion-header>
            <ion-content>
              <gl-legend></gl-legend>
            </ion-content>
          </ion-menu>
          <ion-page main>
            <ion-header>
              <ion-toolbar>
                <ion-buttons slot="start">
                  <ion-menu-toggle>
                    <ion-button>
                      <ion-icon slot="icon-only" name="menu"></ion-icon>
                    </ion-button>
                  </ion-menu-toggle>
                </ion-buttons>
                <ion-buttons slot="end">
                  <gl-basemaps></gl-basemaps>
                  {(this.allowFullscreen) ?
                    <gl-fullscreen></gl-fullscreen> : null}
                </ion-buttons>
                <ion-title>{this.mapTitle}</ion-title>
              </ion-toolbar>
            </ion-header>
            <slot name="map" />
            <ion-popover-controller></ion-popover-controller>
          </ion-page>
        </ion-split-pane>
      </ion-app>
    );
  }
}
