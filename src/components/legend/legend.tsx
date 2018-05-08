import { Component, Element, Prop, State } from '@stencil/core';


@Component({
  tag: 'gl-legend',
  styleUrl: 'legend.scss'
})
export class Legend {
  map?: HTMLGlMapElement;

  @Element() el: HTMLElement;

  @Prop({connect: 'gl-map'}) lazyMap!: HTMLGlMapElement;

  @State() items = [];

  async componentWillLoad() {
    this.map = await this.lazyMap.componentOnReady();
    this.map.onStyle(this.update.bind(this));
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

  async update(style: any) {
    let items = [];
    for (let item of style.metadata['webmapgl:behaviors']) {
      if (item.type !== 'legend') continue;
      let visible = this.getLayersVisible(style, item.layers);
      if (item.toggle || visible) items.push({
        type: item.subtype,
        layers: item.layers || [],
        image: item.image || '',
        text: item.text || '',
        visible: (item.toggle) ? visible : undefined
      });
    }
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
