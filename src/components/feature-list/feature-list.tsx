import { Component, Prop, Watch } from '@stencil/core';
import { toArray } from '../utils';


@Component({
  tag: 'gl-feature-list'
})
export class FeatureList {
  map?: HTMLGlMapElement;

  @Prop({mutable: true}) features: any[];
  @Prop() queryMode: 'source' | 'rendered' | 'manual' = 'source';
  @Prop() layers: string[] | string;
  @Prop({connect: 'gl-map'}) lazyMap!: HTMLGlMapElement;
  @Prop() orderBy: string;
  @Prop() order: 'asc' | 'desc' | 'none' = 'asc';
  @Prop() filter: any[];
  @Prop() template: string;

  async componentWillLoad() {
    this.map = await this.lazyMap.componentOnReady();
    // TODO: Use a timeout to limit the frequency of updates.
    this.map.on('render', () => this.getFeatures());
  }

  @Watch('filter')
  handleFilter() {
    this.getFeatures();
  }

  @Watch('queryMode')
  handleQueryMode() {
    this.getFeatures();
  }

  deduplicate(allFeatures: any[]) {
    let ids = []; // TODO: Use Set.
    return allFeatures.filter((feature) => {
      if (feature.id === undefined) return true;
      if (ids.indexOf(feature.id) === -1) {
        ids.push(feature.id);
        return true;
      } else {
        return false;
      }
    });
  }

  async getFeatures() {
    if (this.queryMode === 'manual') return;

    const layers = toArray(this.layers);
    const style = await this.map.getStyle();
    let features = [];

    if (this.queryMode === 'source') {
      // TODO: Use the source data for geojson sources so that we can list
      // features outside the map extent.
      await Promise.all(style.layers.map(async (layer) => {
        if (layers.indexOf(layer.id) === -1) return;
        let layerFeatures = await this.map.querySourceFeatures(layer.source, {
          sourceLayer: layer['source-layer'] || null,
          filter: this.filter || layer.filter || null
        });
        layerFeatures.forEach((feature) => feature.layer = layer.id);
        Array.prototype.push.apply(features, layerFeatures);
      }));
    } else {
      features = await this.map.queryRenderedFeatures(undefined, {
        layers: layers,
        filter: this.filter
      });
    }
    this.features = this.deduplicate(features);
  }

  sortFeatures() {
    if (this.order === 'none' || !this.orderBy || !this.features) return;
    this.features.sort((aFeature, bFeature) => {
      const a = aFeature.properties[this.orderBy];
      const b = bFeature.properties[this.orderBy];
      if (a < b) return (this.order === 'asc') ? -1 : 1;
      if (a > b) return (this.order === 'asc') ? 1 : -1;
      return 0;
    });
  }

  render() {
    this.sortFeatures();

    let script: HTMLElement = document.getElementById(this.template);
    if (!script) return;

    let items = (this.features || []).map((feature) => {
      return (
        <ion-item>
          <gl-template feature={feature} innerHTML={script.innerHTML}>
          </gl-template>
        </ion-item>
      );
    });

    return (
      <ion-list>
        {items}
      </ion-list>
    );
  }
}
