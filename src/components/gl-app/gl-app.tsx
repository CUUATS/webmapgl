import { Component, Element, Prop, State } from '@stencil/core';
import { default as screenfull } from 'screenfull';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-app',
  styleUrl: 'gl-app.scss'
})
export class GLApp {
  @Element() el: HTMLElement;
  @State() fullscreen = false;
  @Prop() allowFullscreen = true;
  @Prop() mapTitle: string;

  toggleFullscreen() {
    this.fullscreen = !this.fullscreen;
    (this.fullscreen) ? screenfull.request() : screenfull.exit();
  }

  getFullscreenButton() {
    let title = (this.fullscreen) ?
      _t('Exit fullscreen mode') : _t('Enter fullscreen mode');
    if (this.allowFullscreen && screenfull.enabled) return (
      <ion-button onClick={this.toggleFullscreen.bind(this)} title={title}>
        <ion-icon slot="icon-only"
          name={(this.fullscreen) ? 'contract' : 'expand'}></ion-icon>
      </ion-button>
    );
  }

  render() {
    return (
      <ion-app>
        <ion-split-pane>
          <ion-menu>
            <ion-header>
              <ion-toolbar>
                <ion-title>{_t('Menu')}</ion-title>
              </ion-toolbar>
            </ion-header>
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
                  {this.getFullscreenButton()}
                </ion-buttons>
                <ion-title>{this.mapTitle}</ion-title>
              </ion-toolbar>
            </ion-header>
            <slot name="map" />
          </ion-page>
        </ion-split-pane>
      </ion-app>
    );
  }
}
