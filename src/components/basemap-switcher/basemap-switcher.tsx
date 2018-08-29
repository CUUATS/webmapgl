import { Component, Element } from '@stencil/core';
import { _t } from '../i18n/i18n';

@Component({
  tag: 'gl-basemap-switcher'
})
export class BasemapSwitcher {
  @Element() el: HTMLElement;

  getBasemapStyles() {
    return Array.from(document.querySelectorAll('gl-style'))
      .filter((style) => style.basemap);
  }

  setBasemap(url: string) {
    this.getBasemapStyles()
      .forEach((style) => style.enabled = style.url === url);
  }

  render() {
    const header = _t('webmapgl.basemap-switcher.header');
    let items = this.getBasemapStyles()
      .map((style) => (
        <ion-item text-wrap>
          {(style.thumbnail)  ?
            <ion-thumbnail slot="start">
              <img src={style.thumbnail} alt={style.name} />
            </ion-thumbnail> : null
          }
          <ion-label>{style.name}</ion-label>
          <ion-radio checked={style.enabled} value={style.url}></ion-radio>
        </ion-item>));
    return (
      <ion-content scrollX={false} scrollY={false}>
        <ion-list slot="fixed">
          <ion-radio-group
              onIonChange={(e: CustomEvent) => this.setBasemap(e.detail.value)}>
            <ion-list-header>{ header }</ion-list-header>
            {items}
          </ion-radio-group>
        </ion-list>
      </ion-content>
    );
  }
}
