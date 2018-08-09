/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
/* tslint:disable */

import '@stencil/core';

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
  interface HTMLElement {
    componentOnReady?: () => Promise<this | null>;
  }

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}

  namespace StencilComponents {

    interface GlApp {
      'label': string;
      'menu': boolean;
      'menuLabel': string;
    }

    interface GlBasemapSwitcher {

    }

    interface GlBasemaps {

    }

    interface GlClickController {
      'setClickable': (layer: string, clickable: boolean) => void;
    }

    interface GlDrawController {
      'enter': (options?: DrawOptions) => Promise<void>;
      'exit': () => Promise<void>;
      'getAll': () => any;
    }

    interface GlDrawToolbar {
      'cancelText': string;
      'color': Color;
      'confirmText': string;
      'label': string;
    }

    interface GlDrawerToggle {
      'buttonTitle': string;
      'icon': string;
    }

    interface GlDrawer {
      'drawerTitle': string;
      'open': boolean;
      'toggle': () => void;
    }

    interface GlFacet {
      'detail': boolean;
      'image': string;
      'label': string;
      'value': string;
      'widget': 'header' | 'item';
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

    interface GlFeatureButtons {
      'horizontal': 'start' | 'end' | 'center';
      'vertical': 'top' | 'bottom' | 'center';
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

    interface GlFormController {
      'create': (schema: string, feature: any, options?: FormOptions) => Promise<HTMLIonModalElement>;
    }

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

    interface GlFullscreen {

    }

    interface GlGeocodeController {
      'defaultClient': string;
      'forward': (options: ForwardGeocodeOptions, clientOptions?: any) => Promise<any>;
      'reverse': (options: ReverseGeocodeOptions, clientOptions?: any) => Promise<any>;
    }

    interface GlLegendItem {
      'image': string;
      'layers': string | string[];
      'toggle': boolean;
      'widget': 'divider' | 'item';
    }

    interface GlLegend {

    }

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

    interface GlLikeController {
      'clientId': string;
      'getLiked': (feature: any) => boolean;
      'keyPrefix': string;
      'like': (feature: any) => void;
      'unlike': (feature: any) => void;
    }

    interface GlMap {
      'easeTo': (options: any) => Promise<void>;
      'fitBounds': (bounds: any, options: any) => Promise<any>;
      'flyTo': (options: any) => Promise<void>;
      'getCenter': () => Promise<any>;
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
      'setCenter': (center: any, eventData: any) => Promise<any>;
      'setCursor': (cursor: string) => Promise<void>;
      'setLayoutProperty': (layerName: string, propName: string, propValue: any) => Promise<void>;
      'zoom': number;
    }

    interface GlOption {
      'image': string;
      'label': string;
      'value': any;
    }

    interface GlPopup {
      'closeKey': number;
      'component': string;
      'componentOptions': any;
      'isOpen': () => any;
      'layers': string[] | string;
      'removePopup': () => void;
    }

    interface GlRemoteController {
      'send': (options: RemoteOptions) => Promise<Response>;
    }

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


    interface HTMLGlAppElement extends StencilComponents.GlApp, HTMLStencilElement {}

    var HTMLGlAppElement: {
      prototype: HTMLGlAppElement;
      new (): HTMLGlAppElement;
    };
    

    interface HTMLGlBasemapSwitcherElement extends StencilComponents.GlBasemapSwitcher, HTMLStencilElement {}

    var HTMLGlBasemapSwitcherElement: {
      prototype: HTMLGlBasemapSwitcherElement;
      new (): HTMLGlBasemapSwitcherElement;
    };
    

    interface HTMLGlBasemapsElement extends StencilComponents.GlBasemaps, HTMLStencilElement {}

    var HTMLGlBasemapsElement: {
      prototype: HTMLGlBasemapsElement;
      new (): HTMLGlBasemapsElement;
    };
    

    interface HTMLGlClickControllerElement extends StencilComponents.GlClickController, HTMLStencilElement {}

    var HTMLGlClickControllerElement: {
      prototype: HTMLGlClickControllerElement;
      new (): HTMLGlClickControllerElement;
    };
    

    interface HTMLGlDrawControllerElement extends StencilComponents.GlDrawController, HTMLStencilElement {}

    var HTMLGlDrawControllerElement: {
      prototype: HTMLGlDrawControllerElement;
      new (): HTMLGlDrawControllerElement;
    };
    

    interface HTMLGlDrawToolbarElement extends StencilComponents.GlDrawToolbar, HTMLStencilElement {}

    var HTMLGlDrawToolbarElement: {
      prototype: HTMLGlDrawToolbarElement;
      new (): HTMLGlDrawToolbarElement;
    };
    

    interface HTMLGlDrawerToggleElement extends StencilComponents.GlDrawerToggle, HTMLStencilElement {}

    var HTMLGlDrawerToggleElement: {
      prototype: HTMLGlDrawerToggleElement;
      new (): HTMLGlDrawerToggleElement;
    };
    

    interface HTMLGlDrawerElement extends StencilComponents.GlDrawer, HTMLStencilElement {}

    var HTMLGlDrawerElement: {
      prototype: HTMLGlDrawerElement;
      new (): HTMLGlDrawerElement;
    };
    

    interface HTMLGlFacetElement extends StencilComponents.GlFacet, HTMLStencilElement {}

    var HTMLGlFacetElement: {
      prototype: HTMLGlFacetElement;
      new (): HTMLGlFacetElement;
    };
    

    interface HTMLGlFeatureAddElement extends StencilComponents.GlFeatureAdd, HTMLStencilElement {}

    var HTMLGlFeatureAddElement: {
      prototype: HTMLGlFeatureAddElement;
      new (): HTMLGlFeatureAddElement;
    };
    

    interface HTMLGlFeatureButtonsElement extends StencilComponents.GlFeatureButtons, HTMLStencilElement {}

    var HTMLGlFeatureButtonsElement: {
      prototype: HTMLGlFeatureButtonsElement;
      new (): HTMLGlFeatureButtonsElement;
    };
    

    interface HTMLGlFeatureListElement extends StencilComponents.GlFeatureList, HTMLStencilElement {}

    var HTMLGlFeatureListElement: {
      prototype: HTMLGlFeatureListElement;
      new (): HTMLGlFeatureListElement;
    };
    

    interface HTMLGlFieldElement extends StencilComponents.GlField, HTMLStencilElement {}

    var HTMLGlFieldElement: {
      prototype: HTMLGlFieldElement;
      new (): HTMLGlFieldElement;
    };
    

    interface HTMLGlFormControllerElement extends StencilComponents.GlFormController, HTMLStencilElement {}

    var HTMLGlFormControllerElement: {
      prototype: HTMLGlFormControllerElement;
      new (): HTMLGlFormControllerElement;
    };
    

    interface HTMLGlFormPageElement extends StencilComponents.GlFormPage, HTMLStencilElement {}

    var HTMLGlFormPageElement: {
      prototype: HTMLGlFormPageElement;
      new (): HTMLGlFormPageElement;
    };
    

    interface HTMLGlFormElement extends StencilComponents.GlForm, HTMLStencilElement {}

    var HTMLGlFormElement: {
      prototype: HTMLGlFormElement;
      new (): HTMLGlFormElement;
    };
    

    interface HTMLGlFullscreenElement extends StencilComponents.GlFullscreen, HTMLStencilElement {}

    var HTMLGlFullscreenElement: {
      prototype: HTMLGlFullscreenElement;
      new (): HTMLGlFullscreenElement;
    };
    

    interface HTMLGlGeocodeControllerElement extends StencilComponents.GlGeocodeController, HTMLStencilElement {}

    var HTMLGlGeocodeControllerElement: {
      prototype: HTMLGlGeocodeControllerElement;
      new (): HTMLGlGeocodeControllerElement;
    };
    

    interface HTMLGlLegendItemElement extends StencilComponents.GlLegendItem, HTMLStencilElement {}

    var HTMLGlLegendItemElement: {
      prototype: HTMLGlLegendItemElement;
      new (): HTMLGlLegendItemElement;
    };
    

    interface HTMLGlLegendElement extends StencilComponents.GlLegend, HTMLStencilElement {}

    var HTMLGlLegendElement: {
      prototype: HTMLGlLegendElement;
      new (): HTMLGlLegendElement;
    };
    

    interface HTMLGlLikeButtonElement extends StencilComponents.GlLikeButton, HTMLStencilElement {}

    var HTMLGlLikeButtonElement: {
      prototype: HTMLGlLikeButtonElement;
      new (): HTMLGlLikeButtonElement;
    };
    

    interface HTMLGlLikeControllerElement extends StencilComponents.GlLikeController, HTMLStencilElement {}

    var HTMLGlLikeControllerElement: {
      prototype: HTMLGlLikeControllerElement;
      new (): HTMLGlLikeControllerElement;
    };
    

    interface HTMLGlMapElement extends StencilComponents.GlMap, HTMLStencilElement {}

    var HTMLGlMapElement: {
      prototype: HTMLGlMapElement;
      new (): HTMLGlMapElement;
    };
    

    interface HTMLGlOptionElement extends StencilComponents.GlOption, HTMLStencilElement {}

    var HTMLGlOptionElement: {
      prototype: HTMLGlOptionElement;
      new (): HTMLGlOptionElement;
    };
    

    interface HTMLGlPopupElement extends StencilComponents.GlPopup, HTMLStencilElement {}

    var HTMLGlPopupElement: {
      prototype: HTMLGlPopupElement;
      new (): HTMLGlPopupElement;
    };
    

    interface HTMLGlRemoteControllerElement extends StencilComponents.GlRemoteController, HTMLStencilElement {}

    var HTMLGlRemoteControllerElement: {
      prototype: HTMLGlRemoteControllerElement;
      new (): HTMLGlRemoteControllerElement;
    };
    

    interface HTMLGlStyleElement extends StencilComponents.GlStyle, HTMLStencilElement {}

    var HTMLGlStyleElement: {
      prototype: HTMLGlStyleElement;
      new (): HTMLGlStyleElement;
    };
    

  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {
    'gl-app': JSXElements.GlAppAttributes;
    'gl-basemap-switcher': JSXElements.GlBasemapSwitcherAttributes;
    'gl-basemaps': JSXElements.GlBasemapsAttributes;
    'gl-click-controller': JSXElements.GlClickControllerAttributes;
    'gl-draw-controller': JSXElements.GlDrawControllerAttributes;
    'gl-draw-toolbar': JSXElements.GlDrawToolbarAttributes;
    'gl-drawer-toggle': JSXElements.GlDrawerToggleAttributes;
    'gl-drawer': JSXElements.GlDrawerAttributes;
    'gl-facet': JSXElements.GlFacetAttributes;
    'gl-feature-add': JSXElements.GlFeatureAddAttributes;
    'gl-feature-buttons': JSXElements.GlFeatureButtonsAttributes;
    'gl-feature-list': JSXElements.GlFeatureListAttributes;
    'gl-field': JSXElements.GlFieldAttributes;
    'gl-form-controller': JSXElements.GlFormControllerAttributes;
    'gl-form-page': JSXElements.GlFormPageAttributes;
    'gl-form': JSXElements.GlFormAttributes;
    'gl-fullscreen': JSXElements.GlFullscreenAttributes;
    'gl-geocode-controller': JSXElements.GlGeocodeControllerAttributes;
    'gl-legend-item': JSXElements.GlLegendItemAttributes;
    'gl-legend': JSXElements.GlLegendAttributes;
    'gl-like-button': JSXElements.GlLikeButtonAttributes;
    'gl-like-controller': JSXElements.GlLikeControllerAttributes;
    'gl-map': JSXElements.GlMapAttributes;
    'gl-option': JSXElements.GlOptionAttributes;
    'gl-popup': JSXElements.GlPopupAttributes;
    'gl-remote-controller': JSXElements.GlRemoteControllerAttributes;
    'gl-style': JSXElements.GlStyleAttributes;
    }
  }

  namespace JSXElements {

    export interface GlAppAttributes extends HTMLAttributes {
      'label'?: string;
      'menu'?: boolean;
      'menuLabel'?: string;
    }

    export interface GlBasemapSwitcherAttributes extends HTMLAttributes {

    }

    export interface GlBasemapsAttributes extends HTMLAttributes {

    }

    export interface GlClickControllerAttributes extends HTMLAttributes {
      'onGlFeatureClick'?: (event: CustomEvent) => void;
    }

    export interface GlDrawControllerAttributes extends HTMLAttributes {
      'onGlDrawCreate'?: (event: CustomEvent) => void;
      'onGlDrawDelete'?: (event: CustomEvent) => void;
      'onGlDrawEnter'?: (event: CustomEvent) => void;
      'onGlDrawExit'?: (event: CustomEvent) => void;
    }

    export interface GlDrawToolbarAttributes extends HTMLAttributes {
      'cancelText'?: string;
      'color'?: Color;
      'confirmText'?: string;
      'label'?: string;
      'onGlDrawCancel'?: (event: CustomEvent) => void;
      'onGlDrawConfirm'?: (event: CustomEvent) => void;
    }

    export interface GlDrawerToggleAttributes extends HTMLAttributes {
      'buttonTitle'?: string;
      'icon'?: string;
    }

    export interface GlDrawerAttributes extends HTMLAttributes {
      'drawerTitle'?: string;
      'open'?: boolean;
    }

    export interface GlFacetAttributes extends HTMLAttributes {
      'detail'?: boolean;
      'image'?: string;
      'label'?: string;
      'onGlFormFacet'?: (event: CustomEvent) => void;
      'value'?: string;
      'widget'?: 'header' | 'item';
    }

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

    export interface GlFeatureButtonsAttributes extends HTMLAttributes {
      'horizontal'?: 'start' | 'end' | 'center';
      'vertical'?: 'top' | 'bottom' | 'center';
    }

    export interface GlFeatureListAttributes extends HTMLAttributes {
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

    export interface GlFieldAttributes extends HTMLAttributes {
      'attribute'?: string;
      'image'?: string;
      'label'?: string;
      'onGlFieldValueChanged'?: (event: CustomEvent) => void;
      'required'?: boolean;
      'type'?: any;
      'widget'?: string;
    }

    export interface GlFormControllerAttributes extends HTMLAttributes {

    }

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

    export interface GlFullscreenAttributes extends HTMLAttributes {

    }

    export interface GlGeocodeControllerAttributes extends HTMLAttributes {
      'defaultClient'?: string;
      'onGlForwardGeocode'?: (event: CustomEvent) => void;
      'onGlReverseGeocode'?: (event: CustomEvent) => void;
    }

    export interface GlLegendItemAttributes extends HTMLAttributes {
      'image'?: string;
      'layers'?: string | string[];
      'toggle'?: boolean;
      'widget'?: 'divider' | 'item';
    }

    export interface GlLegendAttributes extends HTMLAttributes {

    }

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

    export interface GlLikeControllerAttributes extends HTMLAttributes {
      'clientId'?: string;
      'keyPrefix'?: string;
    }

    export interface GlMapAttributes extends HTMLAttributes {
      'latitude'?: number;
      'longitude'?: number;
      'maxzoom'?: number;
      'minzoom'?: number;
      'onGlStyleUpdated'?: (event: CustomEvent) => void;
      'zoom'?: number;
    }

    export interface GlOptionAttributes extends HTMLAttributes {
      'image'?: string;
      'label'?: string;
      'onGlOptionChanged'?: (event: CustomEvent) => void;
      'value'?: any;
    }

    export interface GlPopupAttributes extends HTMLAttributes {
      'closeKey'?: number;
      'component'?: string;
      'componentOptions'?: any;
      'layers'?: string[] | string;
    }

    export interface GlRemoteControllerAttributes extends HTMLAttributes {

    }

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
}
declare global { namespace JSX { interface StencilJSX {} } }

