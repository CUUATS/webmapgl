import { Component, Listen, Prop, State, Watch } from '@stencil/core';
import { _t } from '../i18n/i18n';
import { getMap } from '../utils';


@Component({
  tag: 'gl-feature-list'
})
export class FeatureList {
  data: any;

  @State() limit: number;

  @Prop() batchSize: number = 20;
  @Prop() component: string;
  @Prop() componentOptions: any;
  @Prop() display: 'all' | 'visible' = 'visible';
  @Prop({mutable: true}) features: any[] = [];
  @Prop() item: boolean = true;
  @Prop() loadingSpinner: string = 'bubbles';
  @Prop() loadingText: string = _t('webmapgl.feature-list.loading');
  @Prop() mapId: string;
  @Prop() orderBy: string;
  @Prop() order: 'asc' | 'desc' | 'none' = 'asc';
  @Prop() styleId: string;
  @Prop() sourceId: string;

  async componentWillLoad() {
    await this.handleSourceId();
    const map = this.getMap();
    if (map) map.on('moveend', () => this.filter());
  }

  @Listen('ionInfinite')
  handleInfiniteScroll(e) {
    this.limit += this.batchSize;
    e.target.complete();
  }

  @Watch('display')
  handleDisplay() {
    this.filter();
  }

  @Watch('sourceId')
  async handleSourceId() {
    const style : HTMLGlStyleElement =
      document.querySelector(`#${this.styleId}`);
    if (!style) return;
    const data = style.json.sources[this.sourceId].data;

    if (typeof data === 'string') {
      let res = await fetch(data);
      this.data = await res.json();
    } else {
      this.data = data;
    }
  }

  getMap() {
    return getMap(this.mapId).map;
  }

  async filter() {
    if (!this.data) return;

    let features;
    if (this.display === 'all') {
      features = this.data.features;
    } else {
      let bounds = this.getMap().getBounds();
      features = this.data.features.filter((feature) => {
        let [lng, lat] = feature.geometry.coordinates;
        return lng >= bounds.getWest() && lng <= bounds.getEast() &&
          lat >= bounds.getSouth() && lat <= bounds.getNorth();
      });
    }

    this.limit = this.batchSize;
    this.features = this.sort(features);
  }

  sort(features: any[]) {
    if (this.order === 'none' || !this.orderBy) return features;

    features.sort((aFeature, bFeature) => {
      const a = aFeature.properties[this.orderBy];
      const b = bFeature.properties[this.orderBy];
      if (a < b) return (this.order === 'asc') ? -1 : 1;
      if (a > b) return (this.order === 'asc') ? 1 : -1;
      return 0;
    });

    return features;
  }

  render() {
    let ComponentTag = this.component;
    let features = (this.limit) ?
      this.features.slice(0, this.limit) : this.features;
    let hasMore = features.length < this.features.length;

    let items = features.map((feature) => {
      let component = <ComponentTag feature={feature}
        {...this.componentOptions}></ComponentTag>;
      return (this.item) ? <ion-item>{component}</ion-item> : component;
    });

    return ([
      <ion-list>
        <slot name="start" />
        {items}
        <slot name="end" />
      </ion-list>,
      <ion-infinite-scroll disabled={!hasMore}>
        <ion-infinite-scroll-content
          loading-spinner={this.loadingSpinner}
          loading-text={this.loadingText}>
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    ]);
  }
}
