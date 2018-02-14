import { Component, State } from '@stencil/core';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-legend',
  styleUrl: 'gl-legend.scss'
})
export class GLLegend {
  @State() open = false;

  toggleOpen() {
    this.open = !this.open;
  }

  render() {
    let panelTitle = _t('Legend');
    let contentCls = 'panel-box panel-box-' +
      ((this.open) ? 'open' : 'closed');
    return (
      <li class="panel-item">
        <button class="panel-button size-sm"
          onClick={this.toggleOpen.bind(this)}
          title={panelTitle}><i class="icon ion-map"></i></button>
        <div class={contentCls}>
          <div class="panel-bar">
            <h2>{panelTitle}</h2>
          </div>
        </div>
      </li>
    );
  }
}
