import { Component, Prop, Watch } from '@stencil/core';
import { compileTemplates } from '../utils';


@Component({
  tag: 'gl-feature-list'
})
export class GLFeatureList {
  @Prop({mutable: true}) features: any[];
  @Prop() queryMode: 'source' | 'rendered' | 'manual' = 'source';
  @Prop() styleId: string;
  @Prop() layers: string[] | string;
  @Prop() orderBy: string;
  @Prop() order: 'asc' | 'desc' | 'none' = 'asc';
  @Prop() filter: any[];
  @Prop() templateId: string;
  private _template: any;

  async componentWillLoad() {
    let map = document.querySelector('gl-map');
    await map.componentOnReady();
    // TODO: Use a timeout to limit the frequency of updates.
    map.on('render', () => this.getFeatures());
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

    const map = document.querySelector('gl-map');
    const layers = this.getLayersArray();
    await map.componentOnReady();
    const style = map.getStyleElementById(this.styleId);
    const json = await style.getJSON();
    let features = [];
    this._template = compileTemplates(
      json.metadata['webmapgl:templates'][this.templateId]);

    if (this.queryMode === 'source') {
      // TODO: Use the source data for geojson sources so that we can list
      // features outside the map extent.
      await Promise.all(json.layers.map(async (layer) => {
        if (layers.indexOf(layer.id) === -1) return;
        let layerFeatures = await map.querySourceFeatures(layer.source, {
          sourceLayer: layer['source-layer'] || null,
          filter: this.filter || layer.filter || null
        });
        Array.prototype.push.apply(features, layerFeatures);
      }));
    } else {
      features = await map.queryRenderedFeatures(undefined, {
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
