/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */

import '@stencil/core';

declare global {
  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {}
  }
  namespace JSXElements {}

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;
    componentOnReady(done: (ele?: this) => void): void;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}

import 'ionicons';
import '@ionic/core';

import {
  GLDrawOptions,
} from './components/gl-draw-controller/gl-draw-controller';
import {
  Element,
} from '@stencil/core';

declare global {
  interface HTMLGlAppElement extends HTMLStencilElement {
    'basemap': boolean;
    'featureAdd': boolean;
    'featureEdit': boolean;
    'fullscreen': boolean;
    'legend': boolean;
    'mapTitle': string;
    'popup': boolean;
  }
  var HTMLGlAppElement: {
    prototype: HTMLGlAppElement;
    new (): HTMLGlAppElement;
  };
  interface HTMLElementTagNameMap {
    'gl-app': HTMLGlAppElement;
  }
  interface ElementTagNameMap {
    'gl-app': HTMLGlAppElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-app': JSXElements.GlAppAttributes;
    }
  }
  namespace JSXElements {
    export interface GlAppAttributes extends HTMLAttributes {
      'basemap'?: boolean;
      'featureAdd'?: boolean;
      'featureEdit'?: boolean;
      'fullscreen'?: boolean;
      'legend'?: boolean;
      'mapTitle'?: string;
      'popup'?: boolean;
    }
  }
}


declare global {
  interface HTMLGlAttributesControllerElement extends HTMLStencilElement {
    'confirmComponent': string;
    'formComponent': string;
  }
  var HTMLGlAttributesControllerElement: {
    prototype: HTMLGlAttributesControllerElement;
    new (): HTMLGlAttributesControllerElement;
  };
  interface HTMLElementTagNameMap {
    'gl-attributes-controller': HTMLGlAttributesControllerElement;
  }
  interface ElementTagNameMap {
    'gl-attributes-controller': HTMLGlAttributesControllerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-attributes-controller': JSXElements.GlAttributesControllerAttributes;
    }
  }
  namespace JSXElements {
    export interface GlAttributesControllerAttributes extends HTMLAttributes {
      'confirmComponent'?: string;
      'formComponent'?: string;
    }
  }
}


declare global {
  interface HTMLGlAttributesFormElement extends HTMLStencilElement {
    'cancelText': any;
    'facets': any[];
    'feature': any;
    'fields': any[];
    'heading': any;
    'submitText': any;
  }
  var HTMLGlAttributesFormElement: {
    prototype: HTMLGlAttributesFormElement;
    new (): HTMLGlAttributesFormElement;
  };
  interface HTMLElementTagNameMap {
    'gl-attributes-form': HTMLGlAttributesFormElement;
  }
  interface ElementTagNameMap {
    'gl-attributes-form': HTMLGlAttributesFormElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-attributes-form': JSXElements.GlAttributesFormAttributes;
    }
  }
  namespace JSXElements {
    export interface GlAttributesFormAttributes extends HTMLAttributes {
      'cancelText'?: any;
      'facets'?: any[];
      'feature'?: any;
      'fields'?: any[];
      'heading'?: any;
      'submitText'?: any;
    }
  }
}


declare global {
  interface HTMLGlBasemapSwitcherElement extends HTMLStencilElement {

  }
  var HTMLGlBasemapSwitcherElement: {
    prototype: HTMLGlBasemapSwitcherElement;
    new (): HTMLGlBasemapSwitcherElement;
  };
  interface HTMLElementTagNameMap {
    'gl-basemap-switcher': HTMLGlBasemapSwitcherElement;
  }
  interface ElementTagNameMap {
    'gl-basemap-switcher': HTMLGlBasemapSwitcherElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-basemap-switcher': JSXElements.GlBasemapSwitcherAttributes;
    }
  }
  namespace JSXElements {
    export interface GlBasemapSwitcherAttributes extends HTMLAttributes {

    }
  }
}


declare global {
  interface HTMLGlBasemapsElement extends HTMLStencilElement {

  }
  var HTMLGlBasemapsElement: {
    prototype: HTMLGlBasemapsElement;
    new (): HTMLGlBasemapsElement;
  };
  interface HTMLElementTagNameMap {
    'gl-basemaps': HTMLGlBasemapsElement;
  }
  interface ElementTagNameMap {
    'gl-basemaps': HTMLGlBasemapsElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-basemaps': JSXElements.GlBasemapsAttributes;
    }
  }
  namespace JSXElements {
    export interface GlBasemapsAttributes extends HTMLAttributes {

    }
  }
}


declare global {
  interface HTMLGlDrawControllerElement extends HTMLStencilElement {
    'enter': (options?: GLDrawOptions, behavior?: any) => Promise<void>;
    'exit': () => Promise<void>;
    'getAll': () => any;
    'getBehavior': () => any;
  }
  var HTMLGlDrawControllerElement: {
    prototype: HTMLGlDrawControllerElement;
    new (): HTMLGlDrawControllerElement;
  };
  interface HTMLElementTagNameMap {
    'gl-draw-controller': HTMLGlDrawControllerElement;
  }
  interface ElementTagNameMap {
    'gl-draw-controller': HTMLGlDrawControllerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-draw-controller': JSXElements.GlDrawControllerAttributes;
    }
  }
  namespace JSXElements {
    export interface GlDrawControllerAttributes extends HTMLAttributes {
      'onDrawCreate'?: (event: CustomEvent) => void;
      'onDrawDelete'?: (event: CustomEvent) => void;
      'onDrawEnter'?: (event: CustomEvent) => void;
      'onDrawExit'?: (event: CustomEvent) => void;
    }
  }
}


declare global {
  interface HTMLGlDrawToolbarElement extends HTMLStencilElement {
    'cancelText': any;
    'color': string;
    'confirmText': any;
    'label': any;
  }
  var HTMLGlDrawToolbarElement: {
    prototype: HTMLGlDrawToolbarElement;
    new (): HTMLGlDrawToolbarElement;
  };
  interface HTMLElementTagNameMap {
    'gl-draw-toolbar': HTMLGlDrawToolbarElement;
  }
  interface ElementTagNameMap {
    'gl-draw-toolbar': HTMLGlDrawToolbarElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-draw-toolbar': JSXElements.GlDrawToolbarAttributes;
    }
  }
  namespace JSXElements {
    export interface GlDrawToolbarAttributes extends HTMLAttributes {
      'cancelText'?: any;
      'color'?: string;
      'confirmText'?: any;
      'label'?: any;
      'onDrawCancel'?: (event: CustomEvent) => void;
      'onDrawConfirm'?: (event: CustomEvent) => void;
    }
  }
}


declare global {
  interface HTMLGlFeatureAddElement extends HTMLStencilElement {
    'horizontal': 'left' | 'center' | 'right';
    'icon': string;
    'vertical': 'bottom' | 'center' | 'top';
  }
  var HTMLGlFeatureAddElement: {
    prototype: HTMLGlFeatureAddElement;
    new (): HTMLGlFeatureAddElement;
  };
  interface HTMLElementTagNameMap {
    'gl-feature-add': HTMLGlFeatureAddElement;
  }
  interface ElementTagNameMap {
    'gl-feature-add': HTMLGlFeatureAddElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-feature-add': JSXElements.GlFeatureAddAttributes;
    }
  }
  namespace JSXElements {
    export interface GlFeatureAddAttributes extends HTMLAttributes {
      'horizontal'?: 'left' | 'center' | 'right';
      'icon'?: string;
      'vertical'?: 'bottom' | 'center' | 'top';
    }
  }
}


declare global {
  interface HTMLGlFormFacetsElement extends HTMLStencilElement {
    'facets': any[];
  }
  var HTMLGlFormFacetsElement: {
    prototype: HTMLGlFormFacetsElement;
    new (): HTMLGlFormFacetsElement;
  };
  interface HTMLElementTagNameMap {
    'gl-form-facets': HTMLGlFormFacetsElement;
  }
  interface ElementTagNameMap {
    'gl-form-facets': HTMLGlFormFacetsElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-form-facets': JSXElements.GlFormFacetsAttributes;
    }
  }
  namespace JSXElements {
    export interface GlFormFacetsAttributes extends HTMLAttributes {
      'facets'?: any[];
    }
  }
}


declare global {
  interface HTMLGlFormFieldsElement extends HTMLStencilElement {
    'facet': string;
    'getValidationMessages': () => any[];
    'getValues': () => any[];
    'isValid': () => boolean;
  }
  var HTMLGlFormFieldsElement: {
    prototype: HTMLGlFormFieldsElement;
    new (): HTMLGlFormFieldsElement;
  };
  interface HTMLElementTagNameMap {
    'gl-form-fields': HTMLGlFormFieldsElement;
  }
  interface ElementTagNameMap {
    'gl-form-fields': HTMLGlFormFieldsElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-form-fields': JSXElements.GlFormFieldsAttributes;
    }
  }
  namespace JSXElements {
    export interface GlFormFieldsAttributes extends HTMLAttributes {
      'facet'?: string;
      'onFieldValueChanged'?: (event: CustomEvent) => void;
    }
  }
}


declare global {
  interface HTMLGlFormElement extends HTMLStencilElement {
    'facets': any[];
    'fields': any[];
  }
  var HTMLGlFormElement: {
    prototype: HTMLGlFormElement;
    new (): HTMLGlFormElement;
  };
  interface HTMLElementTagNameMap {
    'gl-form': HTMLGlFormElement;
  }
  interface ElementTagNameMap {
    'gl-form': HTMLGlFormElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-form': JSXElements.GlFormAttributes;
    }
  }
  namespace JSXElements {
    export interface GlFormAttributes extends HTMLAttributes {
      'facets'?: any[];
      'fields'?: any[];
    }
  }
}


declare global {
  interface HTMLGlFullscreenElement extends HTMLStencilElement {

  }
  var HTMLGlFullscreenElement: {
    prototype: HTMLGlFullscreenElement;
    new (): HTMLGlFullscreenElement;
  };
  interface HTMLElementTagNameMap {
    'gl-fullscreen': HTMLGlFullscreenElement;
  }
  interface ElementTagNameMap {
    'gl-fullscreen': HTMLGlFullscreenElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-fullscreen': JSXElements.GlFullscreenAttributes;
    }
  }
  namespace JSXElements {
    export interface GlFullscreenAttributes extends HTMLAttributes {

    }
  }
}


declare global {
  interface HTMLGlLegendItemElement extends HTMLStencilElement {
    'image': string;
    'itemType': string;
    'layers': Array<string>;
    'text': string;
    'visible': boolean;
  }
  var HTMLGlLegendItemElement: {
    prototype: HTMLGlLegendItemElement;
    new (): HTMLGlLegendItemElement;
  };
  interface HTMLElementTagNameMap {
    'gl-legend-item': HTMLGlLegendItemElement;
  }
  interface ElementTagNameMap {
    'gl-legend-item': HTMLGlLegendItemElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-legend-item': JSXElements.GlLegendItemAttributes;
    }
  }
  namespace JSXElements {
    export interface GlLegendItemAttributes extends HTMLAttributes {
      'image'?: string;
      'itemType'?: string;
      'layers'?: Array<string>;
      'text'?: string;
      'visible'?: boolean;
    }
  }
}


declare global {
  interface HTMLGlLegendElement extends HTMLStencilElement {

  }
  var HTMLGlLegendElement: {
    prototype: HTMLGlLegendElement;
    new (): HTMLGlLegendElement;
  };
  interface HTMLElementTagNameMap {
    'gl-legend': HTMLGlLegendElement;
  }
  interface ElementTagNameMap {
    'gl-legend': HTMLGlLegendElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-legend': JSXElements.GlLegendAttributes;
    }
  }
  namespace JSXElements {
    export interface GlLegendAttributes extends HTMLAttributes {

    }
  }
}


declare global {
  interface HTMLGlMapElement extends HTMLStencilElement {
    'getMap': () => Promise<any>;
    'getStyle': () => Promise<{ version: number; sources: {}; layers: any[]; }>;
    'getStyleElementById': (id: string) => Element;
    'latitude': number;
    'longitude': number;
    'mapReady': () => Promise<void>;
    'maxzoom': number;
    'minzoom': number;
    'off': (eventName: string, layerName: string, handler: Function) => Promise<void>;
    'on': (eventName: string, layerName: string, handler: Function) => Promise<void>;
    'resizeMap': () => void;
    'setCursor': (cursor: string) => Promise<void>;
    'setLayoutProperty': (layerName: string, propName: string, propValue: any) => Promise<void>;
    'zoom': number;
  }
  var HTMLGlMapElement: {
    prototype: HTMLGlMapElement;
    new (): HTMLGlMapElement;
  };
  interface HTMLElementTagNameMap {
    'gl-map': HTMLGlMapElement;
  }
  interface ElementTagNameMap {
    'gl-map': HTMLGlMapElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-map': JSXElements.GlMapAttributes;
    }
  }
  namespace JSXElements {
    export interface GlMapAttributes extends HTMLAttributes {
      'latitude'?: number;
      'longitude'?: number;
      'maxzoom'?: number;
      'minzoom'?: number;
      'onStyleUpdated'?: (event: CustomEvent) => void;
      'zoom'?: number;
    }
  }
}


declare global {
  interface HTMLGlPopupControllerElement extends HTMLStencilElement {

  }
  var HTMLGlPopupControllerElement: {
    prototype: HTMLGlPopupControllerElement;
    new (): HTMLGlPopupControllerElement;
  };
  interface HTMLElementTagNameMap {
    'gl-popup-controller': HTMLGlPopupControllerElement;
  }
  interface ElementTagNameMap {
    'gl-popup-controller': HTMLGlPopupControllerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-popup-controller': JSXElements.GlPopupControllerAttributes;
    }
  }
  namespace JSXElements {
    export interface GlPopupControllerAttributes extends HTMLAttributes {
      'onOpenPopup'?: (event: CustomEvent) => void;
    }
  }
}


declare global {
  interface HTMLGlPopupElement extends HTMLStencilElement {
    'closeKey': number;
    'isOpen': () => any;
    'removePopup': () => void;
  }
  var HTMLGlPopupElement: {
    prototype: HTMLGlPopupElement;
    new (): HTMLGlPopupElement;
  };
  interface HTMLElementTagNameMap {
    'gl-popup': HTMLGlPopupElement;
  }
  interface ElementTagNameMap {
    'gl-popup': HTMLGlPopupElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-popup': JSXElements.GlPopupAttributes;
    }
  }
  namespace JSXElements {
    export interface GlPopupAttributes extends HTMLAttributes {
      'closeKey'?: number;
    }
  }
}


declare global {
  interface HTMLGlStyleElement extends HTMLStencilElement {
    'basemap': boolean;
    'enabled': boolean;
    'getJSON': () => Promise<any>;
    'id': string;
    'name': string;
    'setJSON': (json: any) => void;
    'thumbnail': string;
    'url': string;
  }
  var HTMLGlStyleElement: {
    prototype: HTMLGlStyleElement;
    new (): HTMLGlStyleElement;
  };
  interface HTMLElementTagNameMap {
    'gl-style': HTMLGlStyleElement;
  }
  interface ElementTagNameMap {
    'gl-style': HTMLGlStyleElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-style': JSXElements.GlStyleAttributes;
    }
  }
  namespace JSXElements {
    export interface GlStyleAttributes extends HTMLAttributes {
      'basemap'?: boolean;
      'enabled'?: boolean;
      'id'?: string;
      'name'?: string;
      'onStyleElementAdded'?: (event: CustomEvent) => void;
      'onStyleElementModified'?: (event: CustomEvent) => void;
      'onStyleElementRemoved'?: (event: CustomEvent) => void;
      'thumbnail'?: string;
      'url'?: string;
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }
