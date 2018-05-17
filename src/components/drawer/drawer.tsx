import { Component, Method, Prop, State, Watch } from '@stencil/core';


@Component({
  styleUrl: 'drawer.scss',
  tag: 'gl-drawer'
})
export class Drawer {
  map?: HTMLGlMapElement;

  @State() content: string;

  @Prop({connect: 'gl-map'}) lazyMap!:
    HTMLGlMapElement;

  @Prop({mutable: true}) drawerTitle: string;
  @Prop({mutable: true}) open = false;

  @Watch('open')
  async openChanged() {
    this.map.resizeMap();
  }

  async componentWillLoad() {
    this.map = await this.lazyMap.componentOnReady();
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
