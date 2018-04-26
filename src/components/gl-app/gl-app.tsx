import '@ionic/core';
import { Component, Element, Listen, Prop } from '@stencil/core';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-app',
  styleUrl: 'gl-app.scss'
})
export class GLApp {
  @Element() el: HTMLElement;
  @Prop() basemap = true;
  @Prop() drawer = false;
  @Prop() fullscreen = true;
  @Prop() legend = true;
  @Prop() featureAdd = true;
  @Prop() featureEdit = true;
  @Prop() mapTitle: string;
  @Prop() popup = true;
  @Prop() popupType: 'none' | 'popup' | 'drawer' | 'manual' = 'popup';

  componentDidLoad() {
    this.el.querySelector('gl-map').resizeMap();
  }

  getMenu() {
    if (this.legend) return (
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
    );
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

  getBeforeMap() {
    let items = [];
    if (this.featureAdd) items.push(<gl-feature-add></gl-feature-add>);
    return items;
  }

  getDrawer() {
    if (this.drawer) return (<gl-drawer></gl-drawer>);
  }

  getFooter() {
    let items = [];
    if (this.featureAdd || this.featureEdit)
      items.push(<gl-draw-toolbar></gl-draw-toolbar>);
    if (items.length) return (
      <ion-footer>
        {items}
      </ion-footer>
    );
  }

  getControllers() {
    let controllers = [];
    if (this.basemap) controllers.push(
      <ion-popover-controller></ion-popover-controller>);
    if (this.popupType != 'none') controllers.push(
      <gl-popup-controller></gl-popup-controller>
    );
    if (this.popup) controllers.push(<gl-popup></gl-popup>);
    if (this.featureAdd || this.featureEdit) controllers.push(
      <ion-action-sheet-controller></ion-action-sheet-controller>,
      <ion-modal-controller></ion-modal-controller>,
      <ion-toast-controller></ion-toast-controller>,
      <gl-attributes-controller></gl-attributes-controller>,
      <gl-draw-controller></gl-draw-controller>,
      <gl-remote-controller></gl-remote-controller>);
    return controllers;
  }

  @Listen('openPopup')
  async dispatchPopup(e: CustomEvent) {
    let content = (e as any).detail.content;
    let features = (e as any).detail.features;

    if (this.popupType === 'popup' && this.popup) {
      let popup = document.querySelector('gl-popup');
      await popup.componentOnReady();
      popup.openPopup(content, features);
    } else if (this.popupType === 'drawer' && this.drawer) {
      let drawer = document.querySelector('gl-drawer');
      await drawer.componentOnReady();
      drawer.setContent(content, 'Feature Details');
      drawer.open = true;
    }
  }

  render() {
    return [
      <ion-app>
        <ion-split-pane>
          {this.getMenu()}
          <ion-page main>
            <ion-header>
              <ion-toolbar>
                <ion-buttons slot="start">{this.getStartButtons()}</ion-buttons>
                <ion-buttons slot="end">{this.getEndButtons()}</ion-buttons>
                <ion-title>{this.mapTitle}</ion-title>
              </ion-toolbar>
            </ion-header>
            <ion-content class="map-content">
              <div class="fixed-content" slot="fixed">
                <slot name="map" />
                {this.getBeforeMap()}
              </div>
            </ion-content>
            {this.getDrawer()}
            {this.getFooter()}
          </ion-page>
        </ion-split-pane>
      </ion-app>,
      ...this.getControllers()
    ];
  }
}
