import { Component, Element, Prop, State } from '@stencil/core';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-dev';


@Component({
  tag: 'gl-map',
  styleUrls: [
    '../../../node_modules/mapbox-gl/dist/mapbox-gl.css',
    'gl-map.scss'
  ]
})
export class GLMap {
  @Element() el: HTMLElement;
  @Prop() latitude: number;
  @Prop() longitude: number;
  @Prop() zoom = 10;
  @Prop() minzoom = 0;
  @Prop() maxzoom = 22;
  @State() menuOpen = false;
  private _map: mapboxgl.Map;

  componentDidLoad() {
    this.getStyle()
      .then((style) => {
        if (this._map) {
          this._map.setStyle(style);
        } else {
          let container = this.el.querySelector('.map');
          this._map = new mapboxgl.Map({
            container: container,
            center: [this.longitude, this.latitude],
            zoom: this.zoom,
            minZoom: this.minzoom,
            maxZoom: this.maxzoom,
            style: style
          });
        }
      });
  }

  getStyle() {
    return Promise.all(Array.from(this.el.childNodes)
      .filter((child) => child.nodeName === 'GL-STYLE')
      .map((child) => {
        let url = (child as any).url;
        return fetch(url)
          .then((res) => res.json())
          .catch((err) => {
            console.log('Error fetching source ' + url + ': ' + err);
            return {};
          });
      }))
      .then((styles) => {
        let style = {
          version: 8,
          sources: {},
          layers: []
        };
        styles.forEach((s) => {
          if (s.layers) style.layers = s.layers.concat(style.layers);
          if (s.sources) for (let src in s.sources)
            if (s.sources.hasOwnProperty(src))
              style.sources[src] = s.sources[src];
          // TODO: Deal with multiple styles that each have their own glyphs
          // or sprites. See:
          // https://github.com/mapbox/mapbox-gl-js/issues/4086
          // https://github.com/mapbox/mapbox-gl-js/issues/4000
          if (s.glyphs) (style as any).glyphs = s.glyphs;
          if (s.sprite) (style as any).sprite = s.sprite;
        });
        return style;
      });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  render() {
    return ([
      <div class="panel">
        <button class="menu-toggle" onClick={this.toggleMenu.bind(this)}>
          &#9776;<span class="sr-only">Menu</span>
        </button>
        <slot name="panel" />
      </div>,
      <div class={ 'menu menu-' + ((this.menuOpen) ? 'open' : 'closed') }>
        <ul>
          <slot name="menu-start" />
          <slot name="menu-end" />
        </ul>
      </div>,
      <div class="map"></div>
    ]);
  }
}
