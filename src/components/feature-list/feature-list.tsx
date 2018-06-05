import { Component, Prop, Watch } from '@stencil/core';


@Component({
  tag: 'gl-feature-list'
})
export class FeatureList {
  data: any;
  map?: HTMLGlMapElement;

  @Prop({connect: 'gl-map'}) lazyMap!: HTMLGlMapElement;

  @Prop() component: string;
  @Prop() componentOptions: any;
  @Prop() display: 'all' | 'visible' = 'visible';
  @Prop({mutable: true}) features: any[] = [];
  @Prop() item: boolean = true;
  @Prop() orderBy: string;
  @Prop() order: 'asc' | 'desc' | 'none' = 'asc';
  @Prop() source: string;

  async componentWillLoad() {
    this.map = await this.lazyMap.componentOnReady();
    await this.handleSource();
    this.map.on('moveend', () => this.filter());
  }

  @Watch('display')
  handleDisplay() {
    this.filter();
  }

  @Watch('source')
  async handleSource() {
    const style = await this.map.getStyle();
    const data = style.sources[this.source].data;

    if (typeof data === 'string') {
      let res = await fetch(data);
      this.data = await res.json();
    } else {
      this.data = data;
    }
  }

  async filter() {
    if (!this.data) return;

    let features;
    if (this.display === 'all') {
      features = this.data.features;
    } else {
      let bounds = (await this.map.getMap()).getBounds();
      features = this.data.features.filter((feature) => {
        let [lng, lat] = feature.geometry.coordinates;
        return lng >= bounds.getWest() && lng <= bounds.getEast() &&
          lat >= bounds.getSouth() && lat <= bounds.getNorth();
      });
    }

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
    let items = (this.features).map((feature) => {
      let component = <ComponentTag feature={feature}
        {...this.componentOptions}></ComponentTag>;
      return (this.item) ? <ion-item>{component}</ion-item> : component;
    });

    return (
      <ion-list>
        {items}
      </ion-list>
    );
  }
}
