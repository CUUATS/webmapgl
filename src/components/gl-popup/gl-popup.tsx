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

    let controller = document.querySelector('gl-popup-controller');
    if (controller)
      controller.addEventListener('openPopup', (e) =>
        this.openPopup((e as any).detail.content, (e as any).detail.features));

    if (this.closeKey !== undefined)
      document.addEventListener('keyup', (e) => {
        if (e.keyCode === this.closeKey) this.remove();
      });
  }

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
  remove() {
    if (this._popup) this._popup.remove();
  }
}