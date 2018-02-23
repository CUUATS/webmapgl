import { Component, Element, State } from '@stencil/core';


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

  async updateItems() {
    let items = [];
    await Promise.all(
      Array.from(document.querySelectorAll('gl-style'))
        .map(async (style) => {
          await style.componentOnReady();
          let json = await style.getJSON();

          let metadata = json.metadata;
          if (!metadata) return;

          let spec = metadata['webmapgl:legend'];
          if (!spec || !spec.items) return;

          items.push(...spec.items);
        })
    );
    this.items = items;
  }

  render() {
    return (
      <ion-item-group>
        <slot name="start" />
        {this.items.map((item) =>
          <gl-legend-item item-type={item.type} layers={item.layers || []}
             image={item.image || ''} text={item.text || ''}
             toggle={item.toggle || false}></gl-legend-item>
        )}
        <slot name="end" />
      </ion-item-group>
    );
  }
}
