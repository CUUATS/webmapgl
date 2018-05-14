import { Component, Element, Event, EventEmitter, Listen, Method, Prop, Watch }
  from '@stencil/core';


@Component({
  tag: 'gl-form',
  styleUrl: 'form.scss'
})
export class Form {
  @Element() el: HTMLElement;

  @Event() glFormCancel: EventEmitter;
  @Event() glFormFacet: EventEmitter;
  @Event() glFormSubmit: EventEmitter;

  @Prop() facet: string;
  @Prop() feature: any;
  @Prop() formId: string = `gl-form-${formId++}`;

  @Listen('fieldValueChanged')
  setValue(e) {
    if (!this.feature) return;
    this.feature.properties = this.feature.properties || {};
    this.feature.properites[e.detail.field.attribute] = e.detail.value;
  }

  @Method()
  cancel() {
    this.glFormCancel.emit({
      formId: this.formId,
      feature: this.feature
    });
  }

  @Method()
  getValue(attribute: string) {
    if (!this.feature || !this.feature.properties) return;
    return this.feature.properties[attribute];
  }

  @Method()
  submit() {
    this.glFormSubmit.emit({
      formId: this.formId,
      feature: this.feature
    });
  }

  @Method()
  validate() {
    return Array.from(this.el.querySelectorAll('gl-field'))
      .map((field) => {
        let message = field.validate();
        if (message === null) return message;
        return `${field.label}: ${message}`;
      })
      .filter((message) => message !== null);
  }

  @Watch('facet')
  facetChanged() {
    this.glFormFacet.emit({
      facet: this.facet,
      form: this
    });
  }


  render() {
    if (!this.feature) return null;
    return (
      <ion-list>
        <slot />
      </ion-list>
    );
  }
}

let formId = 0;
