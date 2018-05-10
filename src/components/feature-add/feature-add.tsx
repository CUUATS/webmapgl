import { Component, Prop, State } from '@stencil/core';


@Component({
  // styleUrl: 'gl-popup.scss',
  tag: 'gl-feature-add'
})
export class FeatureAdd {
  drawCtrl?: HTMLGlDrawControllerElement;
  map?: HTMLGlMapElement;

  @Prop() confirmComponent: string = 'gl-draw-toolbar';
  @Prop() icon = 'add';
  @Prop() form: string;
  @Prop() layers: string | string[];
  @Prop({connect: 'gl-draw-controller'}) lazyDrawCtrl!:
    HTMLGlDrawControllerElement;
  @Prop({connect: 'gl-map'}) lazyMap!: HTMLGlMapElement;
  @Prop() url: string;

  @State() disabled: boolean = false;
  @State() drawing: boolean = false;

  async componentWillLoad() {
    this.drawCtrl = await this.lazyDrawCtrl.componentOnReady();
    this.map = await this.lazyMap.componentOnReady();
    document.addEventListener('drawEnter', () => this.disabled = true);
    document.addEventListener('drawExit', () => this.disabled = false);
    document.addEventListener('drawCancel', () => this.cancelDraw());
    document.addEventListener('drawConfirm', () => this.confirmDraw());
  }

  removeConfirm() {
    this.map.parentElement.querySelector(this.confirmComponent).remove();
  }

  async startDraw() {
    this.drawing = true;
    let confirm = document.createElement(this.confirmComponent);
    this.map.parentNode.insertBefore(confirm, this.map.nextSibling);
    this.drawCtrl.enter();
  }

  async cancelDraw() {
    if (!this.drawing) return;
    this.removeConfirm();
    this.drawCtrl.exit();
    this.drawing = false;
  }

  async confirmDraw() {
    if (!this.drawing) return;
    let features = this.drawCtrl.getAll();
    this.removeConfirm();
    this.drawCtrl.exit();

    // TODO: Open the form modal.
    console.log(features);
    this.drawing = false;
  }

  render() {
    if (!this.disabled) return (
      <ion-fab-button onClick={() => this.startDraw()}>
        <ion-icon name={this.icon}></ion-icon>
      </ion-fab-button>
    );
  }
}
