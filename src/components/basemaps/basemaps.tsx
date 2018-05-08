import { Component, Element } from '@stencil/core';
import { presentPopover } from '../utils';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-basemaps'
})
export class Basemaps {
  @Element() el: HTMLElement;

  render() {
    let title = _t('Change basemap');
    return (
      <ion-button onClick={(e) =>
          presentPopover({
            component: 'gl-basemap-switcher',
            ev: e
          })} title={title}>
        <ion-icon slot="icon-only" name='globe'></ion-icon>
      </ion-button>
    );
  }
}
