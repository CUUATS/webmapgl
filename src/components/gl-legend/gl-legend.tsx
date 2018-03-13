import { Component, Element, State } from '@stencil/core';
import { eachStyleMetadata } from '../utils';


@Component({
  tag: 'gl-legend',
  styleUrl: 'gl-legend.scss'
})
export class GLLegend {
  @Element() el: HTMLElement;
  @State() items = [];

  componentDidLoad() {
    this.updateItems();
    document.querySelector('gl-map')
      .addEventListener('styleUpdated', this.updateItems.bind(this));
  }

  getLayersVisible(json, layers) {
    if (!layers || !layers.length) return true;
    if (!json.layers || !json.layers.length) return false;
    for (let layer of json.layers) {
      if (layers.indexOf(layer.id) !== -1) {
        if (!layer.layout) return true;
        return layer.layout.visibility !== 'none';
      }
    }
  }

  async updateItems() {
    let items = [];
    await eachStyleMetadata('legenditems', (meta, json) => {
      meta.forEach((item) => {
        let visible = this.getLayersVisible(json, item.layers);
        if (item.toggle || visible) items.push({
          type: item.type,
          layers: item.layers || [],
          image: item.image || '',
          text: item.text || '',
          visible: (item.toggle) ? visible : undefined
        });
      });
    });
    this.items = items;
  }

  render() {
    return (
      <ion-item-group>
        <slot name="start" />
        {this.items.map((item) =>
          <gl-legend-item item-type={item.type} layers={item.layers}
             image={item.image} text={item.text}
             visible={item.visible}></gl-legend-item>
        )}
        <slot name="end" />
      </ion-item-group>
    );
  }
}
