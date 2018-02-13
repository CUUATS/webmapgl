import { Component, Element, State, Event, EventEmitter } from '@stencil/core';
import { addMapEventHandler } from '../utils';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-fullscreen'
})
export class GLFullscreen {
  @Element() el: HTMLElement;
  @State() fullscreen = false;
  @Event() setFullscreen: EventEmitter;

  componentDidLoad() {
    addMapEventHandler(this.el, 'fullscreenSet', (e) => {
      this.fullscreen = e.detail;
    });
  }

  toggleFullscreen() {
    this.setFullscreen.emit(!this.fullscreen);
  }

  render() {
    let text = (this.fullscreen) ?
      _t('Exit fullscreen mode') : _t('Enter fullscreen mode');
    let iconCls = 'ion-arrow-' + ((this.fullscreen) ? 'shrink' : 'expand');
    return (
      <li class="menu-item">
        <button onClick={this.toggleFullscreen.bind(this)}
          title={text}><i class={'icon ' + iconCls}></i><span
          class="size-sm">{text}</span></button>
      </li>
    );
  }
}
