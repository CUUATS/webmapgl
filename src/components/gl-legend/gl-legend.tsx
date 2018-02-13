import { Component } from '@stencil/core';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-legend',
  styleUrl: 'gl-legend.scss'
})
export class GLLegend {
  render() {
    return (<h2>{ _t('Legend') }</h2>);
  }
}
