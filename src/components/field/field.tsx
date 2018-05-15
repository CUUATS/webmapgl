import { Component, Element, Event, EventEmitter, Listen, Method,
  Prop, State } from '@stencil/core';
import { _t } from '../i18n/i18n';


@Component({
  styleUrl: 'field.scss',
  tag: 'gl-field'
})
export class Field {
  @Element() el: HTMLElement;

  @Event() glFieldValueChanged: EventEmitter;

  @Prop() attribute: string;
  @Prop() facets: string | string[];
  @Prop() image: string;
  @Prop() label: string;
  @Prop() required: boolean = false;
  @Prop() type: any;
  @Prop() visible: boolean = true;
  @Prop() widget: string;

  @State() message: string;

  @Listen('optionChanged')
  optionChanged(e) {
    this.changed(e.detail);
  }

  @Method()
  isValid() {
    return this.validate() === null;
  }

  @Method()
  getValue() {
    const form = this.el.closest('gl-form');
    return form.getValue(this.attribute);
  }

  @Method()
  validate() {
    const value = this.getValue();
    if (this.required &&
        (value === undefined || value === null || value === ''))
      return _t('{field} is required.')
        .replace('{field}', this.el.textContent);

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

  getInputField() {
    return (
      <ion-item>
        <ion-label position="floating">{this.label}</ion-label>
        <ion-input
          onIonInput={(e) => this.changed((e.detail.target as any).value)}
          type="text" value={this.getValue()}></ion-input>
      </ion-item>
    );
  }

  hostData() {
    return {
      class: {
        'gl-visible': this.visible
      }
    };
  }

  render() {
    if (this.widget === 'radio') {
      return this.getRadioField();
    } else if (this.widget === 'select') {
      return this.getSelectField();
    } else {
      return this.getInputField();
    }
  }
}
