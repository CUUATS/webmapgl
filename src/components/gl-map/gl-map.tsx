import { Component, Element, Event, EventEmitter, Listen, Method, Prop,
  State } from '@stencil/core';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-dev';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-map',
  styleUrls: [
    '../../../node_modules/mapbox-gl/dist/mapbox-gl.css',
    'gl-map.scss'
  ]
})
export class GLMap {
  @Element() el: HTMLElement;
  @Event() fullscreenSet: EventEmitter;
  @Event() panelOpenSet: EventEmitter;
  @Prop() latitude: number;
  @Prop() longitude: number;
  @Prop() zoom = 10;
  @Prop() minzoom = 0;
  @Prop() maxzoom = 22;
  @State() menuOpen = false;
  @State() panelOpen = true;
  private _map: mapboxgl.Map;
  private _resizeTimeout: number;
  private _size: string;

  componentDidLoad() {
    this.initResize();
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

  componentDidUpdate() {
    this.resizeMap();
  }

  addClass(cls: string) {
    if (!this.el.classList.contains(cls)) this.el.classList.add(cls);
  }

  removeClass(cls: string) {
    if (this.el.classList.contains(cls)) this.el.classList.remove(cls);
  }

  resizeMap() {
    if (this._map) this._map.resize();
  }

  initResize() {
    this.setSizeClass();
    window.addEventListener('resize', () => {
      if (this._resizeTimeout) return;
      this._resizeTimeout = window.setTimeout(() => {
        this._resizeTimeout = null;
        this.setSizeClass();
      }, 66);
    });
  }

  getSize() {
    let width = this.el.getBoundingClientRect().width;
    return (width >= 768) ? 'lg' : 'sm';
  }

  setSizeClass() {
    let size = this.getSize();
    if (size === this._size) return;
    let prefix = 'gl-map-size-';
    this.removeClass(prefix + this._size);
    this.addClass(prefix + size);
    this._size = size;
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

  @Method()
  setFullscreen(fullscreen: boolean) {
    let cls = 'gl-map-fullscreen';
    (fullscreen) ? this.addClass(cls) : this.removeClass(cls);
    this.menuOpen = false;
    this.setSizeClass();
    this.resizeMap();
    this.fullscreenSet.emit(fullscreen);
  }

  @Method()
  setPanelOpen(open: boolean) {
    this.panelOpen = open;
    this.panelOpenSet.emit(this.panelOpen);
  }

  @Listen('setFullscreen')
  setFullscreenHandler(e: CustomEvent) {
    this.setFullscreen(e.detail);
  }

  @Listen('setPanelOpen')
  setPanelOpenHandler(e: CustomEvent) {
    this.setPanelOpen(e.detail);
  }

  render() {
    let menu = _t('Menu');
    return ([
      <div class={ 'menu menu-' + ((this.menuOpen) ? 'open' : 'closed') }>
        <ul class="menu-items">
          <slot name="menu" />
        </ul>
      </div>,
      <div class={ 'panel panel-' + ((this.panelOpen) ? 'open' : 'closed') }>
        <button class="panel-button menu-toggle" title={menu}
          onClick={this.toggleMenu.bind(this)}><i class="icon ion-navicon"
          ></i></button>
        <slot name="panel-top" />
        <ul class="panel-items">
          <slot name="panel" />
        </ul>
      </div>,
      <div class="map"></div>
    ]);
  }
}
