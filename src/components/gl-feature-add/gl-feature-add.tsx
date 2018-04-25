import { Component, Prop, State } from '@stencil/core';
import { eachStyleMetadata } from '../utils';


@Component({
  // styleUrl: 'gl-popup.scss',
  tag: 'gl-feature-add'
})
export class GLFeatureAdd {
  @Prop() horizontal: 'start' | 'center' | 'end' = 'end';
  @Prop() icon = 'add';
  @Prop() vertical: 'bottom' | 'center' | 'top' = 'bottom';
  @State() behaviors: any[] = [];
  @State() enabled = true;
  private _drawCtrl: HTMLGlDrawControllerElement;
  private _drawToolbar: HTMLGlDrawToolbarElement;

  componentDidLoad() {
    this.update();
    document.querySelector('gl-map')
      .addEventListener('styleUpdated', this.update.bind(this));
    this._drawCtrl = document.querySelector('gl-draw-controller');
    this._drawCtrl.addEventListener('drawEnter', () => this.enabled = false);
    this._drawCtrl.addEventListener('drawExit', () => this.enabled = true);
    this._drawToolbar = document.querySelector('gl-draw-toolbar');
    this._drawToolbar.addEventListener('drawCancel', () => this.cancelDraw());
    this._drawToolbar.addEventListener('drawConfirm', () => this.confirmDraw());
  }

  async update() {
    let behaviors = [];
    await eachStyleMetadata('behaviors', (meta, json) => {
      meta.forEach((item) => {
        if (item.type !== 'add-feature') return;
        behaviors.push({
          ...item,
          form: (json.metadata['webmapgl:forms'] || {})[item.form]
        });
      });
    });
    this.behaviors = behaviors;
  }

  showActionSheet() {
    if (this.behaviors.length > 1) {
      // TODO: Handle layer choice.
    } else if (this.behaviors.length === 1) {
      this.startDraw(this.behaviors[0]);
    }
  }

  async startDraw(behavior) {
    await this._drawCtrl.componentOnReady();
    this._drawCtrl.enter({}, behavior);
  }

  async cancelDraw() {
    await this._drawCtrl.componentOnReady();
    this._drawCtrl.exit();
  }

  async confirmDraw() {
    await this._drawCtrl.componentOnReady();
    this._drawCtrl.exit();
  }

  render() {
    if (this.enabled && this.behaviors.length) return (
      <ion-fab vertical={this.vertical} horizontal={this.horizontal}>
        <ion-fab-button onClick={() => this.showActionSheet()}>
          <ion-icon name={this.icon}></ion-icon>
        </ion-fab-button>
      </ion-fab>
    );
  }
}
