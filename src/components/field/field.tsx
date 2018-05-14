import { Component, Element, Event, EventEmitter, Listen, Method,
  Prop, State } from '@stencil/core';
import { toArray } from '../utils';
import { _t } from '../i18n/i18n';


@Component({
  styleUrl: 'field.scss',
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
  @State() visible: boolean = true;

  componentDidLoad() {
    this.handleFormFacet();
  }

  @Listen('body:glFormFacet')
  handleFormFacet(e?: CustomEvent) {
    let form = this.el.closest('gl-form');
    if (e && form.formId !== e.detail.form.formId) return;

    let facets = toArray(this.facets);
    if (!facets.length && !form.facet) {
      this.visible = true;
    } else if (facets.indexOf(form.facet) !== -1) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

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
    this.fieldValueChanged.emit({
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
    if (!this.visible) return null;

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
