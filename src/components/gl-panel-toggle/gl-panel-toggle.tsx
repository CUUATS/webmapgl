import { Component, Element, State, Event, EventEmitter } from '@stencil/core';
import { addMapEventHandler } from '../utils';


@Component({
  tag: 'gl-panel-toggle'
})
export class GLPanelToggle {
  @Element() el: HTMLElement;
  @State() panelOpen = true;
  @Event() setPanelOpen: EventEmitter;

  componentDidLoad() {
    addMapEventHandler(this.el, 'panelOpenSet', (e) => {
      this.panelOpen = e.detail;
    });
  }

  togglePanel() {
    this.setPanelOpen.emit(!this.panelOpen);
  }

  render() {
    let text = (this.panelOpen) ? 'Hide info panel' : 'Show info panel';
    let icon = '../assets/icons/chevron-' +
      ((this.panelOpen) ? 'left' : 'right') + '.svg';
    return (
      <li class="menu-item menu-item-desktop">
        <button onClick={this.togglePanel.bind(this)}
          title={text}><img src={icon} alt={text} height="14" /></button>
      </li>
    );
  }
}
