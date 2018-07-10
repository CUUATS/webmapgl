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

  interface HTMLElement {
    componentOnReady?: () => Promise<this | null>;
  }

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}

import '@ionic/core';
import 'ionicons';

import {
  DrawOptions,
} from './components/draw-controller/draw-controller';
import {
  Color,
} from '@ionic/core';
import {
  FormOptions,
} from './components/form-controller/form-controller';
import {
  ForwardGeocodeOptions,
  ReverseGeocodeOptions,
} from './components/geocode-controller/geocode-interface';
import {
  RemoteOptions,
} from './components/remote-controller/remote-controller';

declare global {

  namespace StencilComponents {
    interface GlApp {
      'label': string;
      'menu': boolean;
      'menuLabel': string;
    }
  }

  interface HTMLGlAppElement extends StencilComponents.GlApp, HTMLStencilElement {}

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
      'label'?: string;
      'menu'?: boolean;
      'menuLabel'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface GlBasemapSwitcher {

    }
  }

  interface HTMLGlBasemapSwitcherElement extends StencilComponents.GlBasemapSwitcher, HTMLStencilElement {}

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

  namespace StencilComponents {
    interface GlBasemaps {

    }
  }

  interface HTMLGlBasemapsElement extends StencilComponents.GlBasemaps, HTMLStencilElement {}

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

  namespace StencilComponents {
    interface GlClickController {
      'setClickable': (layer: string, clickable: boolean) => void;
    }
  }

  interface HTMLGlClickControllerElement extends StencilComponents.GlClickController, HTMLStencilElement {}

  var HTMLGlClickControllerElement: {
    prototype: HTMLGlClickControllerElement;
    new (): HTMLGlClickControllerElement;
  };
  interface HTMLElementTagNameMap {
    'gl-click-controller': HTMLGlClickControllerElement;
  }
  interface ElementTagNameMap {
    'gl-click-controller': HTMLGlClickControllerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-click-controller': JSXElements.GlClickControllerAttributes;
    }
  }
  namespace JSXElements {
    export interface GlClickControllerAttributes extends HTMLAttributes {
      'onGlFeatureClick'?: (event: CustomEvent) => void;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface GlDrawController {
      'enter': (options?: DrawOptions) => Promise<void>;
      'exit': () => Promise<void>;
      'getAll': () => any;
    }
  }

  interface HTMLGlDrawControllerElement extends StencilComponents.GlDrawController, HTMLStencilElement {}

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
      'onGlDrawCreate'?: (event: CustomEvent) => void;
      'onGlDrawDelete'?: (event: CustomEvent) => void;
      'onGlDrawEnter'?: (event: CustomEvent) => void;
      'onGlDrawExit'?: (event: CustomEvent) => void;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface GlDrawToolbar {
      'cancelText': string;
      'color': Color;
      'confirmText': string;
      'label': string;
    }
  }

  interface HTMLGlDrawToolbarElement extends StencilComponents.GlDrawToolbar, HTMLStencilElement {}

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
      'cancelText'?: string;
      'color'?: Color;
      'confirmText'?: string;
      'label'?: string;
      'onGlDrawCancel'?: (event: CustomEvent) => void;
      'onGlDrawConfirm'?: (event: CustomEvent) => void;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface GlDrawerToggle {
      'buttonTitle': string;
      'icon': string;
    }
  }

  interface HTMLGlDrawerToggleElement extends StencilComponents.GlDrawerToggle, HTMLStencilElement {}

  var HTMLGlDrawerToggleElement: {
    prototype: HTMLGlDrawerToggleElement;
    new (): HTMLGlDrawerToggleElement;
  };
  interface HTMLElementTagNameMap {
    'gl-drawer-toggle': HTMLGlDrawerToggleElement;
  }
  interface ElementTagNameMap {
    'gl-drawer-toggle': HTMLGlDrawerToggleElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-drawer-toggle': JSXElements.GlDrawerToggleAttributes;
    }
  }
  namespace JSXElements {
    export interface GlDrawerToggleAttributes extends HTMLAttributes {
      'buttonTitle'?: string;
      'icon'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface GlDrawer {
      'drawerTitle': string;
      'open': boolean;
      'toggle': () => void;
    }
  }

  interface HTMLGlDrawerElement extends StencilComponents.GlDrawer, HTMLStencilElement {}

  var HTMLGlDrawerElement: {
    prototype: HTMLGlDrawerElement;
    new (): HTMLGlDrawerElement;
  };
  interface HTMLElementTagNameMap {
    'gl-drawer': HTMLGlDrawerElement;
  }
  interface ElementTagNameMap {
    'gl-drawer': HTMLGlDrawerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-drawer': JSXElements.GlDrawerAttributes;
    }
  }
  namespace JSXElements {
    export interface GlDrawerAttributes extends HTMLAttributes {
      'drawerTitle'?: string;
      'open'?: boolean;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface GlFacet {
      'detail': boolean;
      'image': string;
      'label': string;
      'value': string;
      'widget': 'header' | 'item';
    }
  }

  interface HTMLGlFacetElement extends StencilComponents.GlFacet, HTMLStencilElement {}

  var HTMLGlFacetElement: {
    prototype: HTMLGlFacetElement;
    new (): HTMLGlFacetElement;
  };
  interface HTMLElementTagNameMap {
    'gl-facet': HTMLGlFacetElement;
  }
  interface ElementTagNameMap {
    'gl-facet': HTMLGlFacetElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-facet': JSXElements.GlFacetAttributes;
    }
  }
  namespace JSXElements {
    export interface GlFacetAttributes extends HTMLAttributes {
      'detail'?: boolean;
      'image'?: string;
      'label'?: string;
      'onGlFormFacet'?: (event: CustomEvent) => void;
      'value'?: string;
      'widget'?: 'header' | 'item';
    }
  }
}


declare global {

  namespace StencilComponents {
    interface GlFeatureAdd {
      'alertDuration': number;
      'failureMessage': string;
      'formId': string;
      'icon': string;
      'label': string;
      'layers': string | string[];
      'method': 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
      'requestMode': RequestMode;
      'schema': string;
      'successMessage': string;
      'token': string;
      'toolbarLabel': string;
      'translateForm': boolean;
      'url': string;
    }
  }

  interface HTMLGlFeatureAddElement extends StencilComponents.GlFeatureAdd, HTMLStencilElement {}

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
      'alertDuration'?: number;
      'failureMessage'?: string;
      'formId'?: string;
      'icon'?: string;
      'label'?: string;
      'layers'?: string | string[];
      'method'?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
      'onGlFeatureAdd'?: (event: CustomEvent) => void;
      'requestMode'?: RequestMode;
      'schema'?: string;
      'successMessage'?: string;
      'token'?: string;
      'toolbarLabel'?: string;
      'translateForm'?: boolean;
      'url'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface GlFeatureButtons {
      'horizontal': 'start' | 'end' | 'center';
      'vertical': 'top' | 'bottom' | 'center';
    }
  }

  interface HTMLGlFeatureButtonsElement extends StencilComponents.GlFeatureButtons, HTMLStencilElement {}

  var HTMLGlFeatureButtonsElement: {
    prototype: HTMLGlFeatureButtonsElement;
    new (): HTMLGlFeatureButtonsElement;
  };
  interface HTMLElementTagNameMap {
    'gl-feature-buttons': HTMLGlFeatureButtonsElement;
  }
  interface ElementTagNameMap {
    'gl-feature-buttons': HTMLGlFeatureButtonsElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-feature-buttons': JSXElements.GlFeatureButtonsAttributes;
    }
  }
  namespace JSXElements {
    export interface GlFeatureButtonsAttributes extends HTMLAttributes {
      'horizontal'?: 'start' | 'end' | 'center';
      'vertical'?: 'top' | 'bottom' | 'center';
    }
  }
}


declare global {

  namespace StencilComponents {
    interface GlFeatureList {
      'component': string;
      'componentOptions': any;
      'display': 'all' | 'visible';
      'features': any[];
      'item': boolean;
      'order': 'asc' | 'desc' | 'none';
      'orderBy': string;
      'source': string;
    }
  }

  interface HTMLGlFeatureListElement extends StencilComponents.GlFeatureList, HTMLStencilElement {}

  var HTMLGlFeatureListElement: {
    prototype: HTMLGlFeatureListElement;
    new (): HTMLGlFeatureListElement;
  };
  interface HTMLElementTagNameMap {
    'gl-feature-list': HTMLGlFeatureListElement;
  }
  interface ElementTagNameMap {
    'gl-feature-list': HTMLGlFeatureListElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-feature-list': JSXElements.GlFeatureListAttributes;
    }
  }
  namespace JSXElements {
    export interface GlFeatureListAttributes extends HTMLAttributes {
      'component'?: string;
      'componentOptions'?: any;
      'display'?: 'all' | 'visible';
      'features'?: any[];
      'item'?: boolean;
      'order'?: 'asc' | 'desc' | 'none';
      'orderBy'?: string;
      'source'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface GlField {
      'attribute': string;
      'getValue': () => any;
      'image': string;
      'isValid': () => boolean;
      'label': string;
      'required': boolean;
      'type': any;
      'validate': () => string;
      'widget': string;
    }
  }

  interface HTMLGlFieldElement extends StencilComponents.GlField, HTMLStencilElement {}

  var HTMLGlFieldElement: {
    prototype: HTMLGlFieldElement;
    new (): HTMLGlFieldElement;
  };
  interface HTMLElementTagNameMap {
    'gl-field': HTMLGlFieldElement;
  }
  interface ElementTagNameMap {
    'gl-field': HTMLGlFieldElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-field': JSXElements.GlFieldAttributes;
    }
  }
  namespace JSXElements {
    export interface GlFieldAttributes extends HTMLAttributes {
      'attribute'?: string;
      'image'?: string;
      'label'?: string;
      'onGlFieldValueChanged'?: (event: CustomEvent) => void;
      'required'?: boolean;
      'type'?: any;
      'widget'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface GlFormController {
      'create': (schema: string, feature: any, options?: FormOptions) => Promise<HTMLIonModalElement>;
    }
  }

  interface HTMLGlFormControllerElement extends StencilComponents.GlFormController, HTMLStencilElement {}

  var HTMLGlFormControllerElement: {
    prototype: HTMLGlFormControllerElement;
    new (): HTMLGlFormControllerElement;
  };
  interface HTMLElementTagNameMap {
    'gl-form-controller': HTMLGlFormControllerElement;
  }
  interface ElementTagNameMap {
    'gl-form-controller': HTMLGlFormControllerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-form-controller': JSXElements.GlFormControllerAttributes;
    }
  }
  namespace JSXElements {
    export interface GlFormControllerAttributes extends HTMLAttributes {

    }
  }
}


declare global {

  namespace StencilComponents {
    interface GlFormPage {
      'backText': string;
      'cancelText': string;
      'facets': any[];
      'fields': any[];
      'formFacet': string;
      'label': string;
      'root': boolean;
      'submitText': string;
    }
  }

  interface HTMLGlFormPageElement extends StencilComponents.GlFormPage, HTMLStencilElement {}

  var HTMLGlFormPageElement: {
    prototype: HTMLGlFormPageElement;
    new (): HTMLGlFormPageElement;
  };
  interface HTMLElementTagNameMap {
    'gl-form-page': HTMLGlFormPageElement;
  }
  interface ElementTagNameMap {
    'gl-form-page': HTMLGlFormPageElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-form-page': JSXElements.GlFormPageAttributes;
    }
  }
  namespace JSXElements {
    export interface GlFormPageAttributes extends HTMLAttributes {
      'backText'?: string;
      'cancelText'?: string;
      'facets'?: any[];
      'fields'?: any[];
      'formFacet'?: string;
      'label'?: string;
      'root'?: boolean;
      'submitText'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface GlForm {
      'cancel': () => void;
      'cancelText': string;
      'feature': any;
      'formId': string;
      'getValue': (attribute: string) => any;
      'label': string;
      'schema': string;
      'submit': () => void;
      'submitText': string;
      'translate': boolean;
    }
  }

  interface HTMLGlFormElement extends StencilComponents.GlForm, HTMLStencilElement {}

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
      'cancelText'?: string;
      'feature'?: any;
      'formId'?: string;
      'label'?: string;
      'onGlFormCancel'?: (event: CustomEvent) => void;
      'onGlFormFeatureChanged'?: (event: CustomEvent) => void;
      'onGlFormSubmit'?: (event: CustomEvent) => void;
      'schema'?: string;
      'submitText'?: string;
      'translate'?: boolean;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface GlFullscreen {

    }
  }

  interface HTMLGlFullscreenElement extends StencilComponents.GlFullscreen, HTMLStencilElement {}

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

  namespace StencilComponents {
    interface GlGeocodeController {
      'defaultClient': string;
      'forward': (options: ForwardGeocodeOptions, clientOptions?: any) => Promise<void>;
      'reverse': (options: ReverseGeocodeOptions, clientOptions?: any) => Promise<void>;
    }
  }

  interface HTMLGlGeocodeControllerElement extends StencilComponents.GlGeocodeController, HTMLStencilElement {}

  var HTMLGlGeocodeControllerElement: {
    prototype: HTMLGlGeocodeControllerElement;
    new (): HTMLGlGeocodeControllerElement;
  };
  interface HTMLElementTagNameMap {
    'gl-geocode-controller': HTMLGlGeocodeControllerElement;
  }
  interface ElementTagNameMap {
    'gl-geocode-controller': HTMLGlGeocodeControllerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-geocode-controller': JSXElements.GlGeocodeControllerAttributes;
    }
  }
  namespace JSXElements {
    export interface GlGeocodeControllerAttributes extends HTMLAttributes {
      'defaultClient'?: string;
      'onGlForwardGeocode'?: (event: CustomEvent) => void;
      'onGlReverseGeocode'?: (event: CustomEvent) => void;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface GlLegendItem {
      'image': string;
      'layers': string | string[];
      'toggle': boolean;
      'widget': 'divider' | 'item';
    }
  }

  interface HTMLGlLegendItemElement extends StencilComponents.GlLegendItem, HTMLStencilElement {}

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
      'layers'?: string | string[];
      'toggle'?: boolean;
      'widget'?: 'divider' | 'item';
    }
  }
}


declare global {

  namespace StencilComponents {
    interface GlLegend {

    }
  }

  interface HTMLGlLegendElement extends StencilComponents.GlLegend, HTMLStencilElement {}

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

  namespace StencilComponents {
    interface GlLikeButton {
      'attribute': string;
      'disabled': boolean;
      'feature': any;
      'iconNo': string;
      'iconYes': string;
      'method': 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
      'requestMode': RequestMode;
      'token': string;
      'url': string;
    }
  }

  interface HTMLGlLikeButtonElement extends StencilComponents.GlLikeButton, HTMLStencilElement {}

  var HTMLGlLikeButtonElement: {
    prototype: HTMLGlLikeButtonElement;
    new (): HTMLGlLikeButtonElement;
  };
  interface HTMLElementTagNameMap {
    'gl-like-button': HTMLGlLikeButtonElement;
  }
  interface ElementTagNameMap {
    'gl-like-button': HTMLGlLikeButtonElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-like-button': JSXElements.GlLikeButtonAttributes;
    }
  }
  namespace JSXElements {
    export interface GlLikeButtonAttributes extends HTMLAttributes {
      'attribute'?: string;
      'disabled'?: boolean;
      'feature'?: any;
      'iconNo'?: string;
      'iconYes'?: string;
      'method'?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
      'onGlLike'?: (event: CustomEvent) => void;
      'requestMode'?: RequestMode;
      'token'?: string;
      'url'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface GlLikeController {
      'clientId': string;
      'getLiked': (feature: any) => boolean;
      'keyPrefix': string;
      'like': (feature: any) => void;
      'unlike': (feature: any) => void;
    }
  }

  interface HTMLGlLikeControllerElement extends StencilComponents.GlLikeController, HTMLStencilElement {}

  var HTMLGlLikeControllerElement: {
    prototype: HTMLGlLikeControllerElement;
    new (): HTMLGlLikeControllerElement;
  };
  interface HTMLElementTagNameMap {
    'gl-like-controller': HTMLGlLikeControllerElement;
  }
  interface ElementTagNameMap {
    'gl-like-controller': HTMLGlLikeControllerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-like-controller': JSXElements.GlLikeControllerAttributes;
    }
  }
  namespace JSXElements {
    export interface GlLikeControllerAttributes extends HTMLAttributes {
      'clientId'?: string;
      'keyPrefix'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface GlMap {
      'easeTo': (options: any) => Promise<void>;
      'flyTo': (options: any) => Promise<void>;
      'getMap': () => Promise<any>;
      'getMaxZoom': () => Promise<any>;
      'getMinZoom': () => Promise<any>;
      'getStyle': () => Promise<any>;
      'getStyleElementById': (id: string) => any;
      'getZoom': () => Promise<any>;
      'latitude': number;
      'longitude': number;
      'mapReady': () => Promise<void>;
      'maxzoom': number;
      'minzoom': number;
      'off': (eventName: string, layerName: string, handler: Function) => Promise<void>;
      'on': (eventName: string, layerNameOrHandler: string | Function, handler?: Function) => Promise<void>;
      'queryRenderedFeatures': (geometry?: any, options?: any) => Promise<any>;
      'querySourceFeatures': (sourceId: string, options?: any) => Promise<any>;
      'resizeMap': () => void;
      'setCursor': (cursor: string) => Promise<void>;
      'setLayoutProperty': (layerName: string, propName: string, propValue: any) => Promise<void>;
      'zoom': number;
    }
  }

  interface HTMLGlMapElement extends StencilComponents.GlMap, HTMLStencilElement {}

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
      'onGlStyleUpdated'?: (event: CustomEvent) => void;
      'zoom'?: number;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface GlOption {
      'image': string;
      'label': string;
      'value': any;
    }
  }

  interface HTMLGlOptionElement extends StencilComponents.GlOption, HTMLStencilElement {}

  var HTMLGlOptionElement: {
    prototype: HTMLGlOptionElement;
    new (): HTMLGlOptionElement;
  };
  interface HTMLElementTagNameMap {
    'gl-option': HTMLGlOptionElement;
  }
  interface ElementTagNameMap {
    'gl-option': HTMLGlOptionElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-option': JSXElements.GlOptionAttributes;
    }
  }
  namespace JSXElements {
    export interface GlOptionAttributes extends HTMLAttributes {
      'image'?: string;
      'label'?: string;
      'onGlOptionChanged'?: (event: CustomEvent) => void;
      'value'?: any;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface GlPopup {
      'closeKey': number;
      'component': string;
      'componentOptions': any;
      'isOpen': () => any;
      'layers': string[] | string;
      'removePopup': () => void;
    }
  }

  interface HTMLGlPopupElement extends StencilComponents.GlPopup, HTMLStencilElement {}

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
      'component'?: string;
      'componentOptions'?: any;
      'layers'?: string[] | string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface GlRemoteController {
      'send': (options: RemoteOptions) => Promise<Response>;
    }
  }

  interface HTMLGlRemoteControllerElement extends StencilComponents.GlRemoteController, HTMLStencilElement {}

  var HTMLGlRemoteControllerElement: {
    prototype: HTMLGlRemoteControllerElement;
    new (): HTMLGlRemoteControllerElement;
  };
  interface HTMLElementTagNameMap {
    'gl-remote-controller': HTMLGlRemoteControllerElement;
  }
  interface ElementTagNameMap {
    'gl-remote-controller': HTMLGlRemoteControllerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'gl-remote-controller': JSXElements.GlRemoteControllerAttributes;
    }
  }
  namespace JSXElements {
    export interface GlRemoteControllerAttributes extends HTMLAttributes {

    }
  }
}


declare global {

  namespace StencilComponents {
    interface GlStyle {
      'basemap': boolean;
      'enabled': boolean;
      'getJSON': () => Promise<any>;
      'id': string;
      'name': string;
      'setJSON': (json: any) => void;
      'thumbnail': string;
      'token': string;
      'url': string;
    }
  }

  interface HTMLGlStyleElement extends StencilComponents.GlStyle, HTMLStencilElement {}

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
      'onGlStyleElementAdded'?: (event: CustomEvent) => void;
      'onGlStyleElementModified'?: (event: CustomEvent) => void;
      'onGlStyleElementRemoved'?: (event: CustomEvent) => void;
      'thumbnail'?: string;
      'token'?: string;
      'url'?: string;
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }

export declare function defineCustomElements(window: any): void;