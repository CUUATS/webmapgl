/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */


declare global {
  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;
    componentOnReady(done: (ele?: this) => void): void;
  }
}



import {
  GLApp as GlApp
} from './components/gl-app/gl-app';

declare global {
  interface HTMLGlAppElement extends GlApp, HTMLStencilElement {
  }
  var HTMLGlAppElement: {
    prototype: HTMLGlAppElement;
    new (): HTMLGlAppElement;
  };
  interface HTMLElementTagNameMap {
    "gl-app": HTMLGlAppElement;
  }
  interface ElementTagNameMap {
    "gl-app": HTMLGlAppElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "gl-app": JSXElements.GlAppAttributes;
    }
  }
  namespace JSXElements {
    export interface GlAppAttributes extends HTMLAttributes {
      allowFullscreen?: boolean;
      legend?: boolean;
      mapTitle?: string;
    }
  }
}


import {
  GLBasemapSwitcher as GlBasemapSwitcher
} from './components/gl-basemap-switcher/gl-basemap-switcher';

declare global {
  interface HTMLGlBasemapSwitcherElement extends GlBasemapSwitcher, HTMLStencilElement {
  }
  var HTMLGlBasemapSwitcherElement: {
    prototype: HTMLGlBasemapSwitcherElement;
    new (): HTMLGlBasemapSwitcherElement;
  };
  interface HTMLElementTagNameMap {
    "gl-basemap-switcher": HTMLGlBasemapSwitcherElement;
  }
  interface ElementTagNameMap {
    "gl-basemap-switcher": HTMLGlBasemapSwitcherElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "gl-basemap-switcher": JSXElements.GlBasemapSwitcherAttributes;
    }
  }
  namespace JSXElements {
    export interface GlBasemapSwitcherAttributes extends HTMLAttributes {
      
    }
  }
}


import {
  GLBasemaps as GlBasemaps
} from './components/gl-basemaps/gl-basemaps';

declare global {
  interface HTMLGlBasemapsElement extends GlBasemaps, HTMLStencilElement {
  }
  var HTMLGlBasemapsElement: {
    prototype: HTMLGlBasemapsElement;
    new (): HTMLGlBasemapsElement;
  };
  interface HTMLElementTagNameMap {
    "gl-basemaps": HTMLGlBasemapsElement;
  }
  interface ElementTagNameMap {
    "gl-basemaps": HTMLGlBasemapsElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "gl-basemaps": JSXElements.GlBasemapsAttributes;
    }
  }
  namespace JSXElements {
    export interface GlBasemapsAttributes extends HTMLAttributes {
      
    }
  }
}


import {
  GLFullscreen as GlFullscreen
} from './components/gl-fullscreen/gl-fullscreen';

declare global {
  interface HTMLGlFullscreenElement extends GlFullscreen, HTMLStencilElement {
  }
  var HTMLGlFullscreenElement: {
    prototype: HTMLGlFullscreenElement;
    new (): HTMLGlFullscreenElement;
  };
  interface HTMLElementTagNameMap {
    "gl-fullscreen": HTMLGlFullscreenElement;
  }
  interface ElementTagNameMap {
    "gl-fullscreen": HTMLGlFullscreenElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "gl-fullscreen": JSXElements.GlFullscreenAttributes;
    }
  }
  namespace JSXElements {
    export interface GlFullscreenAttributes extends HTMLAttributes {
      
    }
  }
}


import {
  GLLegendItem as GlLegendItem
} from './components/gl-legend-item/gl-legend-item';

declare global {
  interface HTMLGlLegendItemElement extends GlLegendItem, HTMLStencilElement {
  }
  var HTMLGlLegendItemElement: {
    prototype: HTMLGlLegendItemElement;
    new (): HTMLGlLegendItemElement;
  };
  interface HTMLElementTagNameMap {
    "gl-legend-item": HTMLGlLegendItemElement;
  }
  interface ElementTagNameMap {
    "gl-legend-item": HTMLGlLegendItemElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "gl-legend-item": JSXElements.GlLegendItemAttributes;
    }
  }
  namespace JSXElements {
    export interface GlLegendItemAttributes extends HTMLAttributes {
      image?: string;
      itemType?: string;
      layers?: Array<string>;
      text?: string;
      toggle?: boolean;
    }
  }
}


import {
  GLLegend as GlLegend
} from './components/gl-legend/gl-legend';

declare global {
  interface HTMLGlLegendElement extends GlLegend, HTMLStencilElement {
  }
  var HTMLGlLegendElement: {
    prototype: HTMLGlLegendElement;
    new (): HTMLGlLegendElement;
  };
  interface HTMLElementTagNameMap {
    "gl-legend": HTMLGlLegendElement;
  }
  interface ElementTagNameMap {
    "gl-legend": HTMLGlLegendElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "gl-legend": JSXElements.GlLegendAttributes;
    }
  }
  namespace JSXElements {
    export interface GlLegendAttributes extends HTMLAttributes {
      
    }
  }
}


import {
  GLMap as GlMap
} from './components/gl-map/gl-map';

declare global {
  interface HTMLGlMapElement extends GlMap, HTMLStencilElement {
  }
  var HTMLGlMapElement: {
    prototype: HTMLGlMapElement;
    new (): HTMLGlMapElement;
  };
  interface HTMLElementTagNameMap {
    "gl-map": HTMLGlMapElement;
  }
  interface ElementTagNameMap {
    "gl-map": HTMLGlMapElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "gl-map": JSXElements.GlMapAttributes;
    }
  }
  namespace JSXElements {
    export interface GlMapAttributes extends HTMLAttributes {
      latitude?: number;
      longitude?: number;
      maxzoom?: number;
      minzoom?: number;
      zoom?: number;
    }
  }
}


import {
  GLStyle as GlStyle
} from './components/gl-style/gl-style';

declare global {
  interface HTMLGlStyleElement extends GlStyle, HTMLStencilElement {
  }
  var HTMLGlStyleElement: {
    prototype: HTMLGlStyleElement;
    new (): HTMLGlStyleElement;
  };
  interface HTMLElementTagNameMap {
    "gl-style": HTMLGlStyleElement;
  }
  interface ElementTagNameMap {
    "gl-style": HTMLGlStyleElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "gl-style": JSXElements.GlStyleAttributes;
    }
  }
  namespace JSXElements {
    export interface GlStyleAttributes extends HTMLAttributes {
      basemap?: boolean;
      enabled?: boolean;
      name?: string;
      thumbnail?: string;
      url?: string;
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }
