import { Component, Element, Listen, Method, Prop } from '@stencil/core';
import { toArray } from '../utils';
declare const mapboxgl;


@Component({
  styleUrl: 'popup.scss',
  tag: 'gl-popup'
})
export class Popup {
  popup?: any;

  @Element() el: HTMLGlPopupElement;

  @Prop() closeKey = 27;
  @Prop() component: string;
  @Prop() componentOptions: any;
  @Prop() layers: string[] | string;

  @Listen('body:glFeatureClick')
  handleFeatureClick(e: CustomEvent) {
    let style = this.el.closest('gl-style');
    let layers = toArray(this.layers).map((layer) => `${style.id}:${layer}`);
    let features = e.detail.features
      .filter((feature) => layers.indexOf(feature.layer.id) !== -1);
    if (features.length) this.openPopup(features);
  }

  @Listen('body:keyup')
  handleKeyup(e) {
    if (e.keyCode === this.closeKey) this.removePopup();
  }

  @Method()
  async isOpen() {
    return (this.popup) ? this.popup.isOpen() : false;
  }

  @Method()
  async removePopup() {
    if (this.popup) this.popup.remove();
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
        .addTo(this.el.closest('gl-map').map);
  }
}
