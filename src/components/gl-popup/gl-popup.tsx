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
  openPopup(title: string[], body: string[], features: any[]) {
    // TODO: Handle non-point features.
    var coordinates = features[0].geometry.coordinates.slice();

    // TODO: Deal with multiple features in popup.
    let html = (title && title[0]) ?
      '<h2 class="gl-popup-title">' + title[0] + '</h2>' : '';
    if (body && body[0]) html += body[0];

    this._popup = new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(html)
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
