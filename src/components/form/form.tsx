import { Component, Element, Event, EventEmitter, Listen, Method, Prop,
 } from '@stencil/core';


@Component({
  tag: 'gl-form'
})
export class Form {
  _schema: any;

  @Element() el: HTMLElement;

  @Event() glFormCancel: EventEmitter;
  @Event() glFormFeatureChanged: EventEmitter;
  @Event() glFormSubmit: EventEmitter;

  @Prop() cancelText: string;
  @Prop() feature: any;
  @Prop() formId: string = `gl-form-${formId++}`;
  @Prop() label: string;
  @Prop() schema: string;
  @Prop() submitText: string;

  async componentWillLoad() {
    let res = await fetch(this.schema);
    this._schema = await res.json();
  }

  componentDidLoad() {
    let options = {
      facets: this.filter(this._schema.facets),
      fields: this.filter(this._schema.fields),
      root: true
    };

    if (this.label) options['label'] = this.label;
    if (this.submitText) options['submitText'] = this.submitText;
    if (this.cancelText) options['cancelText'] = this.cancelText;

    this.el.querySelector('ion-nav').setRoot('gl-form-page', options);
  }

  @Listen('glFieldValueChanged')
  setValue(e) {
    if (!this.feature) return;
    this.feature.properties = this.feature.properties || {};
    this.feature.properties[e.detail.field.attribute] = e.detail.value;
    this.glFormFeatureChanged.emit({
      formId: this.formId,
      feature: this.feature
    });
  }

  @Listen('glFormFacet')
  handleFacet(e: CustomEvent) {
    let options = {
      facets: this.filter(this._schema.facets, e.detail.value),
      fields: this.filter(this._schema.fields, e.detail.value),
      label: e.detail.label
    };

    if (this.submitText) options['submitText'] = this.submitText;
    if (this.cancelText) options['cancelText'] = this.cancelText;

    this.el.querySelector('ion-nav').push('gl-form-page', options);
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

  filter(items: any[], formFacet?: string) {
    return items.filter((item) => {
      let facets = item.facets || [];
      if (!facets.length && !formFacet) return true;
      for (let facet of facets) {
        let escaped = facet.replace(/[.?+^$[\]\\(){}|-]/g, '\\$&');
        let re = new RegExp('^' + escaped.split('*').join('.*') + '$');
        if (re.test(formFacet)) return true;
      }
      return false;
    }).map((item) => {
      if (item.options) {
        let result = {...item};
        result.options = this.filter(item.options, formFacet);
        return result;
      }
      return item;
    });
  }

  render() {
    return (<ion-nav></ion-nav>);
  }
}

let formId = 0;
