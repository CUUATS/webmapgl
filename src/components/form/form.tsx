import { Component, Element, Event, EventEmitter, Listen, Method, Prop, Watch }
  from '@stencil/core';
import { toArray } from '../utils';

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

  componentDidLoad() {
    this.updateChildren();
  }

  @Listen('glFieldValueChanged')
  setValue(e) {
    if (!this.feature) return;
    this.feature.properties = this.feature.properties || {};
    this.feature.properties[e.detail.field.attribute] = e.detail.value;
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
      .map((field) => field.validate())
      .filter((message) => message !== null);
  }

  @Watch('facet')
  facetChanged() {
    this.updateChildren();
    this.glFormFacet.emit({
      facet: this.facet,
      form: this
    });
  }

  updateChildren() {
    let children: NodeListOf<HTMLGlFieldElement | HTMLGlFacetElement> =
      this.el.querySelectorAll('gl-field, gl-facet');

    Array.from(children).forEach((child) => {
      let facets = toArray(child.facets);
      if (!facets.length && !this.facet) {
        child.visible = true;
      } else if (facets.indexOf(this.facet) !== -1) {
        child.visible = true;
      } else {
        child.visible = false;
      }
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
