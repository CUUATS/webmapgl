import { Component, Element, Event, EventEmitter, Listen, Method,
  Prop, State } from '@stencil/core';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-field'
})
export class Field {
  @Element() el: HTMLElement;

  @Event() glFieldValueChanged: EventEmitter;

  @State() message: string;

  @Prop() attribute: string;
  @Prop() image: string;
  @Prop() label: string;
  @Prop() required: boolean = false;
  @Prop() type: any;
  @Prop() widget: string;

  @Listen('glOptionChanged')
  optionChanged(e) {
    this.changed(e.detail);
  }

  _getValue() {
    const form = this.el.closest('gl-form');
    if (!form.feature || !form.feature.properties) return;
    return form.feature.properties[this.attribute];
  }

  @Method()
  async isValid() {
    return this.validate() === null;
  }

  @Method()
  async getValue() {
    return this._getValue();
  }

  @Method()
  async validate() {
    const value = await this.getValue();
    if (this.required &&
        (value === undefined || value === null || value === ''))
      return _t('webmapgl.field.required', {field: this.label});

    return null;
  }

  changed(value) {
    this.glFieldValueChanged.emit({
      field: this,
      value: value
    });
  }

  getRadioField() {
    return ([
      <ion-list-header>{this.label}</ion-list-header>,
      <ion-radio-group>
        <slot />
      </ion-radio-group>
    ]);
  }

  getSelectField() {
    return (
      <ion-item>
        <ion-label>{this.label}</ion-label>,
        <ion-select onIonChange={(e) => this.changed(e.detail.value)}
            value={this.getValue()}>
          <slot />
        </ion-select>
      </ion-item>
    );
  }

  getTextareaField() {
    return (
      <ion-item text-wrap>
        <ion-label position="floating">{this.label}</ion-label>
        <ion-textarea
          onIonInput={(e) => this.changed((e.detail.target as any).value)}
          value={this._getValue() || ''}></ion-textarea>
      </ion-item>
    );
  }

  getInputField() {
    return (
      <ion-item text-wrap>
        <ion-label position="floating">{this.label}</ion-label>
        <ion-input
          onIonInput={(e) => this.changed((e.detail.target as any).value)}
          type="text" value={this._getValue()}></ion-input>
      </ion-item>
    );
  }

  render() {
    if (this.widget === 'radio') {
      return this.getRadioField();
    } else if (this.widget === 'select') {
      return this.getSelectField();
    } else if (this.widget == 'textarea') {
      return this.getTextareaField();
    } else {
      return this.getInputField();
    }
  }
}
