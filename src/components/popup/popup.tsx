import { Component, Element, Listen, Method, Prop, Watch } from '@stencil/core';
import mapboxgl from 'mapbox-gl';
import { toArray } from '../utils';


@Component({
  styleUrl: 'popup.scss',
  tag: 'gl-popup'
})
export class Popup {
  clickCtrl?: HTMLGlClickControllerElement;
  map?: mapboxgl.Map;
  popup?: mapboxgl.Popup;

  @Element() el: HTMLGlPopupElement;

  @Prop() closeKey = 27;
  @Prop() layers: string[] | string;
  @Prop({connect: 'gl-click-controller'}) lazyClickCtrl!:
    HTMLGlClickControllerElement;
  @Prop({connect: 'gl-map'}) lazyMap!: HTMLGlMapElement;
  @Prop() template: string = 'gl-popup';

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
  isOpen() {
    return (this.popup) ? this.popup.isOpen() : false;
  }

  @Method()
  removePopup() {
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
    let template = document.createElement('gl-template');
    let script = document.getElementById(this.template);

    if (script) {
      template.feature = features[0];
      template.innerHTML = script.innerHTML;
    }

    this.popup = new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setDOMContent(template)
        .addTo(this.map);
  }
}
