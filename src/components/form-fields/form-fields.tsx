import { Component, Element, Event, EventEmitter, Method,
  Prop } from '@stencil/core';
import { getThumbnail } from '../utils';
import { _t } from '../i18n/i18n';


@Component({
  tag: 'gl-form-fields'
})
export class FormFields {
  @Element() el: HTMLElement;
  @Event() fieldValueChanged: EventEmitter;
  @Prop() facet: string;
  private _values = [];
  private _messages = [];

  @Method()
  isValid() {
    for (let message of this._messages) if (message) return false;
    return true;
  }

  @Method()
  getValidationMessages() {
    return this._messages.filter((msg) => msg);
  }

  @Method()
  getValues() {
    return [...this._values];
  }

  validate(field, value) {
    if (field.required &&
        (value === undefined || value === null || value === ''))
      return _t('{field} is required.').replace('{field}', field.label);

    return null;
  }

  changed(field, value) {
    let validationMessage = this.validate(field, value)
    this._values[field._index] = value;
    this._messages[field._index] = validationMessage;
    this.fieldValueChanged.emit({
      field: field,
      value: value,
      validationMessage: validationMessage
    });
  }

  getWidget(field) {
    if (field.widget) return field.widget;
    if (field.type === 'boolean') return 'toggle';
    if (field.choices) return 'radio';
    return 'input';
  }

  getFields() {
    const form = this.el.closest('gl-form');
    let items = [];
    for (let i in form.fields) {
      let field = {...form.fields[i], _index: i};
      if (field.facets && field.facets.indexOf(this.facet) === -1) continue;
      this._messages[i] = this.validate(field, null);
      let widget = this.getWidget(field);
      if (widget === 'radio') {
        items.push(...this.getRadioField(field));
      } else if (widget === 'select') {
        items.push(this.getSelectField(field));
      } else {
        items.push(this.getInputField(field));
      }
    }
    return items;
  }

  getRadioField(field) {
    let items = field.choices.map((choice) => {
      return (
        <ion-item>
          {getThumbnail(choice)}
          <ion-label>{choice.label}</ion-label>
          <ion-radio
            onIonSelect={(e) => this.changed(field, e.detail.value)}
            value={choice.value}></ion-radio>
        </ion-item>
      );
    });
    return ([
      <ion-list-header>{field.label}</ion-list-header>,
      <ion-radio-group>
        {items}
      </ion-radio-group>
    ]);
  }

  getSelectField(field) {
    let options = field.choices.map((choice) => {
      return (
        <ion-select-option value={choice.value}>
          {choice.label}
        </ion-select-option>
      );
    });
    return (
      <ion-item>
        <ion-label>{field.label}</ion-label>,
        <ion-select onIonChange={(e) => this.changed(field, e.detail.value)}>
          {options}
        </ion-select>
      </ion-item>
    );
  }

  getInputField(field) {
    return (
      <ion-item>
        <ion-label position="floating">{field.label}</ion-label>
        <ion-input
          onIonInput={(e) => this.changed(field, (e.detail.target as any).value)}
          type="text"></ion-input>
      </ion-item>
    );
  }

  render() {
    return ([
      <ion-list>
        {this.getFields()}
      </ion-list>
    ]);
  }
}
