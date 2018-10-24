import { Component, Method, Prop, State } from '@stencil/core';


@Component({
  styleUrl: 'drawer.css',
  tag: 'gl-drawer'
})
export class Drawer {
  map?: HTMLGlMapElement;

  @State() content: string;

  @Prop({connect: 'gl-map'}) lazyMap!:
    HTMLGlMapElement;

  @Prop({mutable: true}) drawerTitle: string;
  @Prop({mutable: true}) open = false;

  async componentWillLoad() {
    this.map = await this.lazyMap.componentOnReady();
  }

  componentDidUpdate() {
    this.map.resizeMap();
  }

  @Method()
  toggle() {
    this.open = !this.open;
  }

  hostData() {
    return {
      class: {
        'gl-drawer-closed': !this.open,
        'gl-drawer-open': this.open
      }
    };
  }

  render() {
    return ([
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="end">
            <ion-button title="Close" onClick={() => {this.open = false;}}>
              <ion-icon slot="icon-only" name="close"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-title>{this.drawerTitle}</ion-title>
        </ion-toolbar>
      </ion-header>,
      <ion-content><slot /></ion-content>
    ]);
  }
}
