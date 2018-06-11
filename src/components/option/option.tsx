import { Component, Element, Event, EventEmitter, Prop } from '@stencil/core';
import { getThumbnail } from '../utils';

@Component({
  tag: 'gl-option'
})
export class Option {
  @Element() el: HTMLElement;

  @Event() glOptionChanged: EventEmitter;

  @Prop() image: string;
  @Prop() label: string;
  @Prop() value: any;

  getRadio() {
    const field = this.el.closest('gl-field');
    const checked = field.getValue() === this.value;
    return (
      <ion-item text-wrap>
        {getThumbnail(this)}
        <ion-label>{this.label}</ion-label>
        <ion-radio onIonSelect={() => this.glOptionChanged.emit(this.value)}
          value={this.value} checked={checked}></ion-radio>
      </ion-item>
    );
  }

  getSelectOption() {
    return (
      <ion-select-option value={this.value}>
        {this.label}
      </ion-select-option>
    );
  }

  render() {
    let field = this.el.closest('gl-field');
    return (field.widget === 'radio') ?
      this.getRadio() : this.getSelectOption();
  }
}
