import { Component, Method, Prop, State } from '@stencil/core';


@Component({
  styleUrl: 'gl-drawer.scss',
  tag: 'gl-drawer'
})
export class GLDrawer {
  @Prop({mutable: true}) drawerTitle: string;
  @Prop({mutable: true}) open = false;
  @State() content: string;

  @Method()
  setContent(content, title?) {
    this.content = content;
    if (title) this.drawerTitle = title;
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
      <ion-content innerHTML={this.content}></ion-content>
    ]);
  }
}
