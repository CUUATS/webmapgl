import { Component, Method, Prop } from '@stencil/core';
import mapboxgl from 'mapbox-gl';


@Component({
  styleUrl: 'gl-popup.scss',
  tag: 'gl-popup'
})
export class GLPopup {
  @Prop() closeKey = 27;
  private _map: mapboxgl.Map;
  private _popup: mapboxgl.Popup;

  async componentDidLoad() {
    let mapEl = document.querySelector('gl-map');
    await mapEl.componentOnReady();
    this._map = await mapEl.getMap();

    if (this.closeKey !== undefined)
      document.addEventListener('keyup', (e) => {
        if (e.keyCode === this.closeKey) this.removePopup();
      });
  }

  @Method()
  openPopup(content: string[], features: any[]) {
    var coordinates = features[0].geometry.coordinates.slice();
    this._popup = new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(content[0])
        .addTo(this._map);
  }

  @Method()
  isOpen() {
    return (this._popup) ? this._popup.isOpen() : false;
  }

  @Method()
  removePopup() {
    if (this._popup) this._popup.remove();
  }
}
