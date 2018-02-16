import { Component, Element } from '@stencil/core';
import { presentPopover } from '../utils';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-basemaps'
})
export class GLBasemaps {
  @Element() el: HTMLElement;

  render() {
    let title = _t('Change basemap');
    return (
      <ion-button onClick={() =>
          presentPopover({
            component: 'gl-basemap-switcher',
            ev: event
          })} title={title}>
        <ion-icon slot="icon-only" name='globe'></ion-icon>
      </ion-button>
    );
  }
}
