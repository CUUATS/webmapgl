import { Component, Prop, Watch } from '@stencil/core';
import { compileTemplates } from '../utils';


@Component({
  tag: 'gl-feature-list'
})
export class FeatureList {
  map?: HTMLGlMapElement;

  @Prop({mutable: true}) features: any[];
  @Prop() queryMode: 'source' | 'rendered' | 'manual' = 'source';
  @Prop() styleId: string;
  @Prop() layers: string[] | string;
  @Prop({connect: 'gl-map'}) lazyMap!: HTMLGlMapElement;
  @Prop() orderBy: string;
  @Prop() order: 'asc' | 'desc' | 'none' = 'asc';
  @Prop() filter: any[];
  @Prop() templateId: string;

  private _template: any;

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

  getLayersArray() {
    let layers = (Array.isArray(this.layers)) ?
      this.layers : (this.layers || '').split(',');
    return layers.map((layer) => this.styleId + ':' + layer);
  }

  async getFeatures() {
    if (this.queryMode === 'manual') return;

    const layers = this.getLayersArray();
    const style = this.map.getStyleElementById(this.styleId);
    const json = await style.getJSON();
    let features = [];
    this._template = compileTemplates(
      json.metadata['webmapgl:resources'].template[this.templateId]);

    if (this.queryMode === 'source') {
      // TODO: Use the source data for geojson sources so that we can list
      // features outside the map extent.
      await Promise.all(json.layers.map(async (layer) => {
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
        layers: this.getLayersArray(),
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

  getListItems() {
    return (this.features || []).map((feature) => {
      return (
        <gl-feature-list-item feature={feature} template={this._template}>
        </gl-feature-list-item>
      );
    });
  }

  render() {
    this.sortFeatures();
    return (
      <ion-list>
        {this.getListItems()}
      </ion-list>
    );
  }
}
