import { Component, Element, Listen, Method, Prop, Watch } from '@stencil/core';
import { toArray } from '../utils';
declare const mapboxgl;


@Component({
  styleUrl: 'popup.scss',
  tag: 'gl-popup'
})
export class Popup {
  clickCtrl?: HTMLGlClickControllerElement;
  map?: any;
  popup?: any;

  @Element() el: HTMLGlPopupElement;

  @Prop() closeKey = 27;
  @Prop() component: string;
  @Prop() componentOptions: any;
  @Prop() layers: string[] | string;
  @Prop({connect: 'gl-click-controller'}) lazyClickCtrl!:
    HTMLGlClickControllerElement;
  @Prop({connect: 'gl-map'}) lazyMap!: HTMLGlMapElement;

  async componentWillLoad() {
    let mapEl = await this.lazyMap.componentOnReady();
    this.map = await mapEl.getMap();
    this.clickCtrl = await this.lazyClickCtrl.componentOnReady();
  }

  @Listen('body:glFeatureClick')
  handleFeatureClick(e: CustomEvent) {
    let layers = toArray(this.layers);
    let features = e.detail.features
      .filter((feature) => layers.indexOf(feature.layer.id) !== -1);
    if (features.length) this.openPopup(features);
  }

  @Listen('body:keyup')
  handleKeyup(e) {
    if (e.keyCode === this.closeKey) this.removePopup();
  }

  componentDidLoad() {
    this.handleLayers(this.layers);
  }

  @Method()
  async isOpen() {
    return (this.popup) ? this.popup.isOpen() : false;
  }

  @Method()
  async removePopup() {
    if (this.popup) this.popup.remove();
  }

  @Watch('layers')
  handleLayers(newLayers: string[] | string, oldLayers?: string[] | string) {
    newLayers = toArray(newLayers);
    oldLayers = toArray(oldLayers);

    // TODO: This logic may not work if there are multiple popups configured
    // with overlapping layers.
    for (let layer of oldLayers) this.clickCtrl.setClickable(layer, false);
    for (let layer of newLayers) this.clickCtrl.setClickable(layer, true);
  }

  openPopup(features: any[]) {
    // TODO: Handle non-point features.
    var coordinates = features[0].geometry.coordinates.slice();

    // TODO: Deal with multiple features in popup.
    let ComponentTag = this.component;
    let component = <ComponentTag features={features}
      {...this.componentOptions}></ComponentTag>;

    this.popup = new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setDOMContent(component)
        .addTo(this.map);
  }
}
