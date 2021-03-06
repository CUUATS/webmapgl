/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';

import '@ionic/core';
import 'ionicons';
import {
  DrawOptions,
} from './components/draw-controller/interface';
import {
  Color,
} from '@ionic/core';
import {
  FormOptions,
} from './components/form-controller/interface';
import {
  ForwardGeocodeOptions,
  ReverseGeocodeOptions,
} from './components/geocode-controller/geocode-interface';
import {
  RemoteOptions,
} from './components/remote-controller/interface';


export namespace Components {

  interface GlApp {
    'label': string;
    'menu': boolean;
    'menuLabel': string;
  }
  interface GlAppAttributes extends StencilHTMLAttributes {
    'label'?: string;
    'menu'?: boolean;
    'menuLabel'?: string;
  }

  interface GlBasemapSwitcher {}
  interface GlBasemapSwitcherAttributes extends StencilHTMLAttributes {}

  interface GlBasemaps {}
  interface GlBasemapsAttributes extends StencilHTMLAttributes {}

  interface GlClickController {
    'setClickable': (layer: string, clickable: boolean) => void;
  }
  interface GlClickControllerAttributes extends StencilHTMLAttributes {
    'onGlFeatureClick'?: (event: CustomEvent) => void;
  }

  interface GlDrawController {
    'enter': (options?: DrawOptions) => Promise<void>;
    'exit': () => Promise<void>;
    'getAll': () => Promise<any>;
  }
  interface GlDrawControllerAttributes extends StencilHTMLAttributes {
    'onGlDrawCreate'?: (event: CustomEvent) => void;
    'onGlDrawDelete'?: (event: CustomEvent) => void;
    'onGlDrawEnter'?: (event: CustomEvent) => void;
    'onGlDrawExit'?: (event: CustomEvent) => void;
  }

  interface GlDrawToolbar {
    'cancelText': string;
    'color': Color;
    'confirmText': string;
    'label': string;
  }
  interface GlDrawToolbarAttributes extends StencilHTMLAttributes {
    'cancelText'?: string;
    'color'?: Color;
    'confirmText'?: string;
    'label'?: string;
    'onGlDrawCancel'?: (event: CustomEvent) => void;
    'onGlDrawConfirm'?: (event: CustomEvent) => void;
  }

  interface GlDrawerToggle {
    'buttonTitle': string;
    'icon': string;
  }
  interface GlDrawerToggleAttributes extends StencilHTMLAttributes {
    'buttonTitle'?: string;
    'icon'?: string;
  }

  interface GlDrawer {
    'drawerTitle': string;
    'open': boolean;
    'toggle': () => void;
  }
  interface GlDrawerAttributes extends StencilHTMLAttributes {
    'drawerTitle'?: string;
    'open'?: boolean;
  }

  interface GlFacet {
    'detail': boolean;
    'image': string;
    'label': string;
    'value': string;
    'widget': 'header' | 'item';
  }
  interface GlFacetAttributes extends StencilHTMLAttributes {
    'detail'?: boolean;
    'image'?: string;
    'label'?: string;
    'onGlFormFacet'?: (event: CustomEvent) => void;
    'value'?: string;
    'widget'?: 'header' | 'item';
  }

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
  interface GlFeatureAddAttributes extends StencilHTMLAttributes {
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

  interface GlFeatureButtons {
    'horizontal': 'start' | 'end' | 'center';
    'vertical': 'top' | 'bottom' | 'center';
  }
  interface GlFeatureButtonsAttributes extends StencilHTMLAttributes {
    'horizontal'?: 'start' | 'end' | 'center';
    'vertical'?: 'top' | 'bottom' | 'center';
  }

  interface GlFeatureList {
    'batchSize': number;
    'component': string;
    'componentOptions': any;
    'display': 'all' | 'visible';
    'features': any[];
    'item': boolean;
    'loadingSpinner': string;
    'loadingText': string;
    'order': 'asc' | 'desc' | 'none';
    'orderBy': string;
    'source': string;
  }
  interface GlFeatureListAttributes extends StencilHTMLAttributes {
    'batchSize'?: number;
    'component'?: string;
    'componentOptions'?: any;
    'display'?: 'all' | 'visible';
    'features'?: any[];
    'item'?: boolean;
    'loadingSpinner'?: string;
    'loadingText'?: string;
    'order'?: 'asc' | 'desc' | 'none';
    'orderBy'?: string;
    'source'?: string;
  }

  interface GlField {
    'attribute': string;
    'getValue': () => Promise<any>;
    'image': string;
    'isValid': () => Promise<boolean>;
    'label': string;
    'required': boolean;
    'type': any;
    'validate': () => Promise<string>;
    'widget': string;
  }
  interface GlFieldAttributes extends StencilHTMLAttributes {
    'attribute'?: string;
    'image'?: string;
    'label'?: string;
    'onGlFieldValueChanged'?: (event: CustomEvent) => void;
    'required'?: boolean;
    'type'?: any;
    'widget'?: string;
  }

  interface GlFormController {
    'create': (schema: string, feature: any, options?: FormOptions) => Promise<HTMLIonModalElement>;
  }
  interface GlFormControllerAttributes extends StencilHTMLAttributes {}

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
  interface GlFormPageAttributes extends StencilHTMLAttributes {
    'backText'?: string;
    'cancelText'?: string;
    'facets'?: any[];
    'fields'?: any[];
    'formFacet'?: string;
    'label'?: string;
    'root'?: boolean;
    'submitText'?: string;
  }

  interface GlForm {
    'cancel': () => Promise<void>;
    'cancelText': string;
    'feature': any;
    'formId': string;
    'label': string;
    'schema': string;
    'submit': () => Promise<void>;
    'submitText': string;
    'translate': boolean;
  }
  interface GlFormAttributes extends StencilHTMLAttributes {
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

  interface GlFullscreen {}
  interface GlFullscreenAttributes extends StencilHTMLAttributes {}

  interface GlGeocodeController {
    'defaultClient': string;
    'forward': (options: ForwardGeocodeOptions, clientOptions?: any) => Promise<any>;
    'reverse': (options: ReverseGeocodeOptions, clientOptions?: any) => Promise<any>;
  }
  interface GlGeocodeControllerAttributes extends StencilHTMLAttributes {
    'defaultClient'?: string;
    'onGlForwardGeocode'?: (event: CustomEvent) => void;
    'onGlReverseGeocode'?: (event: CustomEvent) => void;
  }

  interface GlLegendItem {
    'image': string;
    'layers': string | string[];
    'toggle': boolean;
    'widget': 'divider' | 'item';
  }
  interface GlLegendItemAttributes extends StencilHTMLAttributes {
    'image'?: string;
    'layers'?: string | string[];
    'toggle'?: boolean;
    'widget'?: 'divider' | 'item';
  }

  interface GlLegend {}
  interface GlLegendAttributes extends StencilHTMLAttributes {}

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
  interface GlLikeButtonAttributes extends StencilHTMLAttributes {
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

  interface GlLikeController {
    'clientId': string;
    'getLiked': (feature: any) => Promise<boolean>;
    'keyPrefix': string;
    'like': (feature: any) => Promise<void>;
    'unlike': (feature: any) => Promise<void>;
  }
  interface GlLikeControllerAttributes extends StencilHTMLAttributes {
    'clientId'?: string;
    'keyPrefix'?: string;
  }

  interface GlMap {
    'easeTo': (options: any) => Promise<void>;
    'fitBounds': (bounds: any, options: any) => Promise<any>;
    'flyTo': (options: any) => Promise<void>;
    'getCenter': () => Promise<any>;
    'getLayoutProperty': (layerName: string, propName: string) => Promise<any>;
    'getMap': () => Promise<any>;
    'getMaxZoom': () => Promise<any>;
    'getMinZoom': () => Promise<any>;
    'getPaintProperty': (layerName: string, propName: string) => Promise<any>;
    'getStyle': () => Promise<any>;
    'getStyleElementById': (id: string) => Promise<any>;
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
    'setCenter': (center: any, eventData: any) => Promise<any>;
    'setCursor': (cursor: string) => Promise<void>;
    'setLayoutProperty': (layerName: string, propName: string, propValue: any) => Promise<void>;
    'setPaintProperty': (layerName: string, propName: string, propValue: any) => Promise<void>;
    'zoom': number;
  }
  interface GlMapAttributes extends StencilHTMLAttributes {
    'latitude'?: number;
    'longitude'?: number;
    'maxzoom'?: number;
    'minzoom'?: number;
    'onGlStyleUpdated'?: (event: CustomEvent) => void;
    'zoom'?: number;
  }

  interface GlOption {
    'image': string;
    'label': string;
    'value': any;
  }
  interface GlOptionAttributes extends StencilHTMLAttributes {
    'image'?: string;
    'label'?: string;
    'onGlOptionChanged'?: (event: CustomEvent) => void;
    'value'?: any;
  }

  interface GlPopup {
    'closeKey': number;
    'component': string;
    'componentOptions': any;
    'isOpen': () => Promise<any>;
    'layers': string[] | string;
    'removePopup': () => Promise<void>;
  }
  interface GlPopupAttributes extends StencilHTMLAttributes {
    'closeKey'?: number;
    'component'?: string;
    'componentOptions'?: any;
    'layers'?: string[] | string;
  }

  interface GlRemoteController {
    'send': (options: RemoteOptions) => Promise<Response>;
  }
  interface GlRemoteControllerAttributes extends StencilHTMLAttributes {}

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
  interface GlStyleAttributes extends StencilHTMLAttributes {
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

declare global {
  interface StencilElementInterfaces {
    'GlApp': Components.GlApp;
    'GlBasemapSwitcher': Components.GlBasemapSwitcher;
    'GlBasemaps': Components.GlBasemaps;
    'GlClickController': Components.GlClickController;
    'GlDrawController': Components.GlDrawController;
    'GlDrawToolbar': Components.GlDrawToolbar;
    'GlDrawerToggle': Components.GlDrawerToggle;
    'GlDrawer': Components.GlDrawer;
    'GlFacet': Components.GlFacet;
    'GlFeatureAdd': Components.GlFeatureAdd;
    'GlFeatureButtons': Components.GlFeatureButtons;
    'GlFeatureList': Components.GlFeatureList;
    'GlField': Components.GlField;
    'GlFormController': Components.GlFormController;
    'GlFormPage': Components.GlFormPage;
    'GlForm': Components.GlForm;
    'GlFullscreen': Components.GlFullscreen;
    'GlGeocodeController': Components.GlGeocodeController;
    'GlLegendItem': Components.GlLegendItem;
    'GlLegend': Components.GlLegend;
    'GlLikeButton': Components.GlLikeButton;
    'GlLikeController': Components.GlLikeController;
    'GlMap': Components.GlMap;
    'GlOption': Components.GlOption;
    'GlPopup': Components.GlPopup;
    'GlRemoteController': Components.GlRemoteController;
    'GlStyle': Components.GlStyle;
  }

  interface StencilIntrinsicElements {
    'gl-app': Components.GlAppAttributes;
    'gl-basemap-switcher': Components.GlBasemapSwitcherAttributes;
    'gl-basemaps': Components.GlBasemapsAttributes;
    'gl-click-controller': Components.GlClickControllerAttributes;
    'gl-draw-controller': Components.GlDrawControllerAttributes;
    'gl-draw-toolbar': Components.GlDrawToolbarAttributes;
    'gl-drawer-toggle': Components.GlDrawerToggleAttributes;
    'gl-drawer': Components.GlDrawerAttributes;
    'gl-facet': Components.GlFacetAttributes;
    'gl-feature-add': Components.GlFeatureAddAttributes;
    'gl-feature-buttons': Components.GlFeatureButtonsAttributes;
    'gl-feature-list': Components.GlFeatureListAttributes;
    'gl-field': Components.GlFieldAttributes;
    'gl-form-controller': Components.GlFormControllerAttributes;
    'gl-form-page': Components.GlFormPageAttributes;
    'gl-form': Components.GlFormAttributes;
    'gl-fullscreen': Components.GlFullscreenAttributes;
    'gl-geocode-controller': Components.GlGeocodeControllerAttributes;
    'gl-legend-item': Components.GlLegendItemAttributes;
    'gl-legend': Components.GlLegendAttributes;
    'gl-like-button': Components.GlLikeButtonAttributes;
    'gl-like-controller': Components.GlLikeControllerAttributes;
    'gl-map': Components.GlMapAttributes;
    'gl-option': Components.GlOptionAttributes;
    'gl-popup': Components.GlPopupAttributes;
    'gl-remote-controller': Components.GlRemoteControllerAttributes;
    'gl-style': Components.GlStyleAttributes;
  }


  interface HTMLGlAppElement extends Components.GlApp, HTMLStencilElement {}
  var HTMLGlAppElement: {
    prototype: HTMLGlAppElement;
    new (): HTMLGlAppElement;
  };

  interface HTMLGlBasemapSwitcherElement extends Components.GlBasemapSwitcher, HTMLStencilElement {}
  var HTMLGlBasemapSwitcherElement: {
    prototype: HTMLGlBasemapSwitcherElement;
    new (): HTMLGlBasemapSwitcherElement;
  };

  interface HTMLGlBasemapsElement extends Components.GlBasemaps, HTMLStencilElement {}
  var HTMLGlBasemapsElement: {
    prototype: HTMLGlBasemapsElement;
    new (): HTMLGlBasemapsElement;
  };

  interface HTMLGlClickControllerElement extends Components.GlClickController, HTMLStencilElement {}
  var HTMLGlClickControllerElement: {
    prototype: HTMLGlClickControllerElement;
    new (): HTMLGlClickControllerElement;
  };

  interface HTMLGlDrawControllerElement extends Components.GlDrawController, HTMLStencilElement {}
  var HTMLGlDrawControllerElement: {
    prototype: HTMLGlDrawControllerElement;
    new (): HTMLGlDrawControllerElement;
  };

  interface HTMLGlDrawToolbarElement extends Components.GlDrawToolbar, HTMLStencilElement {}
  var HTMLGlDrawToolbarElement: {
    prototype: HTMLGlDrawToolbarElement;
    new (): HTMLGlDrawToolbarElement;
  };

  interface HTMLGlDrawerToggleElement extends Components.GlDrawerToggle, HTMLStencilElement {}
  var HTMLGlDrawerToggleElement: {
    prototype: HTMLGlDrawerToggleElement;
    new (): HTMLGlDrawerToggleElement;
  };

  interface HTMLGlDrawerElement extends Components.GlDrawer, HTMLStencilElement {}
  var HTMLGlDrawerElement: {
    prototype: HTMLGlDrawerElement;
    new (): HTMLGlDrawerElement;
  };

  interface HTMLGlFacetElement extends Components.GlFacet, HTMLStencilElement {}
  var HTMLGlFacetElement: {
    prototype: HTMLGlFacetElement;
    new (): HTMLGlFacetElement;
  };

  interface HTMLGlFeatureAddElement extends Components.GlFeatureAdd, HTMLStencilElement {}
  var HTMLGlFeatureAddElement: {
    prototype: HTMLGlFeatureAddElement;
    new (): HTMLGlFeatureAddElement;
  };

  interface HTMLGlFeatureButtonsElement extends Components.GlFeatureButtons, HTMLStencilElement {}
  var HTMLGlFeatureButtonsElement: {
    prototype: HTMLGlFeatureButtonsElement;
    new (): HTMLGlFeatureButtonsElement;
  };

  interface HTMLGlFeatureListElement extends Components.GlFeatureList, HTMLStencilElement {}
  var HTMLGlFeatureListElement: {
    prototype: HTMLGlFeatureListElement;
    new (): HTMLGlFeatureListElement;
  };

  interface HTMLGlFieldElement extends Components.GlField, HTMLStencilElement {}
  var HTMLGlFieldElement: {
    prototype: HTMLGlFieldElement;
    new (): HTMLGlFieldElement;
  };

  interface HTMLGlFormControllerElement extends Components.GlFormController, HTMLStencilElement {}
  var HTMLGlFormControllerElement: {
    prototype: HTMLGlFormControllerElement;
    new (): HTMLGlFormControllerElement;
  };

  interface HTMLGlFormPageElement extends Components.GlFormPage, HTMLStencilElement {}
  var HTMLGlFormPageElement: {
    prototype: HTMLGlFormPageElement;
    new (): HTMLGlFormPageElement;
  };

  interface HTMLGlFormElement extends Components.GlForm, HTMLStencilElement {}
  var HTMLGlFormElement: {
    prototype: HTMLGlFormElement;
    new (): HTMLGlFormElement;
  };

  interface HTMLGlFullscreenElement extends Components.GlFullscreen, HTMLStencilElement {}
  var HTMLGlFullscreenElement: {
    prototype: HTMLGlFullscreenElement;
    new (): HTMLGlFullscreenElement;
  };

  interface HTMLGlGeocodeControllerElement extends Components.GlGeocodeController, HTMLStencilElement {}
  var HTMLGlGeocodeControllerElement: {
    prototype: HTMLGlGeocodeControllerElement;
    new (): HTMLGlGeocodeControllerElement;
  };

  interface HTMLGlLegendItemElement extends Components.GlLegendItem, HTMLStencilElement {}
  var HTMLGlLegendItemElement: {
    prototype: HTMLGlLegendItemElement;
    new (): HTMLGlLegendItemElement;
  };

  interface HTMLGlLegendElement extends Components.GlLegend, HTMLStencilElement {}
  var HTMLGlLegendElement: {
    prototype: HTMLGlLegendElement;
    new (): HTMLGlLegendElement;
  };

  interface HTMLGlLikeButtonElement extends Components.GlLikeButton, HTMLStencilElement {}
  var HTMLGlLikeButtonElement: {
    prototype: HTMLGlLikeButtonElement;
    new (): HTMLGlLikeButtonElement;
  };

  interface HTMLGlLikeControllerElement extends Components.GlLikeController, HTMLStencilElement {}
  var HTMLGlLikeControllerElement: {
    prototype: HTMLGlLikeControllerElement;
    new (): HTMLGlLikeControllerElement;
  };

  interface HTMLGlMapElement extends Components.GlMap, HTMLStencilElement {}
  var HTMLGlMapElement: {
    prototype: HTMLGlMapElement;
    new (): HTMLGlMapElement;
  };

  interface HTMLGlOptionElement extends Components.GlOption, HTMLStencilElement {}
  var HTMLGlOptionElement: {
    prototype: HTMLGlOptionElement;
    new (): HTMLGlOptionElement;
  };

  interface HTMLGlPopupElement extends Components.GlPopup, HTMLStencilElement {}
  var HTMLGlPopupElement: {
    prototype: HTMLGlPopupElement;
    new (): HTMLGlPopupElement;
  };

  interface HTMLGlRemoteControllerElement extends Components.GlRemoteController, HTMLStencilElement {}
  var HTMLGlRemoteControllerElement: {
    prototype: HTMLGlRemoteControllerElement;
    new (): HTMLGlRemoteControllerElement;
  };

  interface HTMLGlStyleElement extends Components.GlStyle, HTMLStencilElement {}
  var HTMLGlStyleElement: {
    prototype: HTMLGlStyleElement;
    new (): HTMLGlStyleElement;
  };

  interface HTMLElementTagNameMap {
    'gl-app': HTMLGlAppElement
    'gl-basemap-switcher': HTMLGlBasemapSwitcherElement
    'gl-basemaps': HTMLGlBasemapsElement
    'gl-click-controller': HTMLGlClickControllerElement
    'gl-draw-controller': HTMLGlDrawControllerElement
    'gl-draw-toolbar': HTMLGlDrawToolbarElement
    'gl-drawer-toggle': HTMLGlDrawerToggleElement
    'gl-drawer': HTMLGlDrawerElement
    'gl-facet': HTMLGlFacetElement
    'gl-feature-add': HTMLGlFeatureAddElement
    'gl-feature-buttons': HTMLGlFeatureButtonsElement
    'gl-feature-list': HTMLGlFeatureListElement
    'gl-field': HTMLGlFieldElement
    'gl-form-controller': HTMLGlFormControllerElement
    'gl-form-page': HTMLGlFormPageElement
    'gl-form': HTMLGlFormElement
    'gl-fullscreen': HTMLGlFullscreenElement
    'gl-geocode-controller': HTMLGlGeocodeControllerElement
    'gl-legend-item': HTMLGlLegendItemElement
    'gl-legend': HTMLGlLegendElement
    'gl-like-button': HTMLGlLikeButtonElement
    'gl-like-controller': HTMLGlLikeControllerElement
    'gl-map': HTMLGlMapElement
    'gl-option': HTMLGlOptionElement
    'gl-popup': HTMLGlPopupElement
    'gl-remote-controller': HTMLGlRemoteControllerElement
    'gl-style': HTMLGlStyleElement
  }

  interface ElementTagNameMap {
    'gl-app': HTMLGlAppElement;
    'gl-basemap-switcher': HTMLGlBasemapSwitcherElement;
    'gl-basemaps': HTMLGlBasemapsElement;
    'gl-click-controller': HTMLGlClickControllerElement;
    'gl-draw-controller': HTMLGlDrawControllerElement;
    'gl-draw-toolbar': HTMLGlDrawToolbarElement;
    'gl-drawer-toggle': HTMLGlDrawerToggleElement;
    'gl-drawer': HTMLGlDrawerElement;
    'gl-facet': HTMLGlFacetElement;
    'gl-feature-add': HTMLGlFeatureAddElement;
    'gl-feature-buttons': HTMLGlFeatureButtonsElement;
    'gl-feature-list': HTMLGlFeatureListElement;
    'gl-field': HTMLGlFieldElement;
    'gl-form-controller': HTMLGlFormControllerElement;
    'gl-form-page': HTMLGlFormPageElement;
    'gl-form': HTMLGlFormElement;
    'gl-fullscreen': HTMLGlFullscreenElement;
    'gl-geocode-controller': HTMLGlGeocodeControllerElement;
    'gl-legend-item': HTMLGlLegendItemElement;
    'gl-legend': HTMLGlLegendElement;
    'gl-like-button': HTMLGlLikeButtonElement;
    'gl-like-controller': HTMLGlLikeControllerElement;
    'gl-map': HTMLGlMapElement;
    'gl-option': HTMLGlOptionElement;
    'gl-popup': HTMLGlPopupElement;
    'gl-remote-controller': HTMLGlRemoteControllerElement;
    'gl-style': HTMLGlStyleElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
