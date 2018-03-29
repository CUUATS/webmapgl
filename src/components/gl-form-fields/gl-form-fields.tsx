import { Component, Element, Prop } from '@stencil/core';


@Component({
  tag: 'gl-form-fields'
})
export class GLFormFields {
  @Element() el: HTMLElement;
  @Prop() facet: string;

  getWidget(field) {
    if (field.widget) return field.widget;
    if (field.type === 'boolean') return 'toggle';
    if (field.choices) return 'radio';
    return 'input';
  }

  getFields() {
    const form = this.el.closest('gl-form');
    let items = [];
    for (let field of form.fields) {
      if (field.facets && field.facets.indexOf(this.facet) === -1) continue;
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
          <ion-label>{choice.label}</ion-label>
          <ion-radio value={choice.value}></ion-radio>
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
        <ion-select>
          {options}
        </ion-select>
      </ion-item>
    );
  }

  getInputField(field) {
    return (
      <ion-item>
        <ion-label floating>{field.label}</ion-label>
        <ion-input type="text"></ion-input>
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
