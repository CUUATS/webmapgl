import { Component, Element } from '@stencil/core';
import { _t } from '../i18n/i18n';

@Component({
  tag: 'gl-basemap-switcher'
})
export class GLBasemapSwitcher {
  @Element() el: HTMLElement;

  componentDidLoad() {
    this.el.querySelector('ion-radio-group')
      .addEventListener('ionChange', (e) =>
        this.setBasemap((e as any).detail.value));
  }

  getBasemapStyles() {
    return Array.from(document.querySelectorAll('gl-style'))
      .filter((style) => style.basemap);
  }

  setBasemap(url: string) {
    this.getBasemapStyles()
      .forEach((style) => style.enabled = style.url === url);
  }

  render() {
    let items = this.getBasemapStyles()
      .map((style) => (
        <ion-item>
          {(style.thumbnail)  ?
            <ion-thumbnail slot="start">
              <img src={style.thumbnail} alt={style.name} />
            </ion-thumbnail> : null
          }
          <ion-label>{style.name}</ion-label>
          <ion-radio checked={style.enabled} value={style.url}></ion-radio>
        </ion-item>));
    return (
      <ion-content>
        <ion-list slot="fixed">
          <ion-radio-group>
            <ion-list-header>{_t('Select a Basemap')}</ion-list-header>
            {items}
          </ion-radio-group>
        </ion-list>
      </ion-content>
    );
  }
}
