import { Component, State } from '@stencil/core';
import screenfull from 'screenfull';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-fullscreen'
})
export class Fullscreen {
  @State() fullscreen = false;

  componentDidLoad() {
    screenfull.on('change', () => this.fullscreen = screenfull.isFullscreen);
  }

  toggleFullscreen() {
    (screenfull.isFullscreen) ? screenfull.exit() : screenfull.request();
  }

  render() {
    let title = (this.fullscreen) ?
      _t('Exit fullscreen mode') : _t('Enter fullscreen mode');
    if (screenfull.enabled) return (
      <ion-button onClick={this.toggleFullscreen.bind(this)} title={title}>
        <ion-icon slot="icon-only"
          name={(this.fullscreen) ? 'contract' : 'expand'}></ion-icon>
      </ion-button>
    );
  }
}
