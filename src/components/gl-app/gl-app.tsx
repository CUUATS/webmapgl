import '@ionic/core';
import { Component, Element, Prop } from '@stencil/core';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-app',
  styleUrl: 'gl-app.scss'
})
export class GLApp {
  @Element() el: HTMLElement;
  @Prop() basemap = true;
  @Prop() fullscreen = true;
  @Prop() legend = true;
  @Prop() featureAdd = true;
  @Prop() mapTitle: string;
  @Prop() popup = true;

  componentDidLoad() {
    this.el.querySelector('gl-map').resizeMap();
  }

  getStartButtons() {
    let buttons = [];
    if (this.legend) buttons.push(
      <ion-menu-toggle>
        <ion-button>
          <ion-icon slot="icon-only" name="menu"></ion-icon>
        </ion-button>
      </ion-menu-toggle>
    );
    return buttons;
  }

  getEndButtons() {
    let buttons = [];
    if (this.basemap) buttons.push(<gl-basemaps></gl-basemaps>);
    if (this.fullscreen) buttons.push(<gl-fullscreen></gl-fullscreen>);
    return buttons;
  }

  getControllers() {
    let controllers = [];
    if (this.basemap) controllers.push(
      <ion-popover-controller></ion-popover-controller>);
    if (this.popup) controllers.push(
      <gl-popup-controller></gl-popup-controller>,
      <gl-popup></gl-popup>
    );
    return controllers;
  }

  render() {
    return [
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
                <ion-buttons slot="start">{this.getStartButtons()}</ion-buttons>
                <ion-buttons slot="end">{this.getEndButtons()}</ion-buttons>
                <ion-title>{this.mapTitle}</ion-title>
              </ion-toolbar>
            </ion-header>
            <slot name="map" />
          </ion-page>
        </ion-split-pane>
      </ion-app>,
      ...this.getControllers()
    ];
  }
}
