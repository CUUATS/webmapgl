import { Component, Element, Event, EventEmitter, Listen, Method,
  Prop, State } from '@stencil/core';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-field'
})
export class Field {
  @Element() el: HTMLElement;

  @Event() fieldValueChanged: EventEmitter;

  @Prop() attribute: string;
  @Prop() facets: string | string[];
  @Prop() image: string;
  @Prop() label: string;
  @Prop() required: boolean = false;
  @Prop() type: any;
  @Prop() widget: string;

  @State() message: string;

  @Method()
  isValid() {
    return this.message === undefined;
  }

  @Method()
  getValue() {
    const form = this.el.closest('gl-form');
    return form.getFeatureValue(this.attribute);
  }

  getFacets() {
    return Array.isArray(this.facets) ?
      this.facets : (this.facets || '').split(',');
  }

  validate(value) {
    if (this.required &&
        (value === undefined || value === null || value === ''))
      return _t('{field} is required.')
        .replace('{field}', this.el.textContent);

    return null;
  }

  @Listen('optionChanged')
  optionChanged(e) {
    this.changed(e.detail);
  }

  changed(value) {
    this.message = this.validate(value);
    this.fieldValueChanged.emit({
      field: this,
      value: value,
      message: this.message
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

  render() {
    const form = this.el.closest('gl-form');
    const facets = this.getFacets();
    if (form.facet && facets.length && facets.indexOf(form.facet) === -1)
      return null;

    let items = [];
    if (this.widget === 'radio') {
      items.push(...this.getRadioField());
    } else if (this.widget === 'select') {
      items.push(this.getSelectField());
    } else {
      items.push(this.getInputField());
    }

    return items;
  }
}
