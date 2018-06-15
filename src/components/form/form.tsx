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
    let page = this.createFormPage(this.label);
    this.el.querySelector('ion-nav').setRoot(page);
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
    let page = this.createFormPage(e.detail.label, e.detail.value);
    this.el.querySelector('ion-nav').push(page);
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

  createFormPage(label?: string, formFacet?: string) {
    let page = document.createElement('gl-form-page');
    page.formFacet = formFacet;
    page.facets = this.filter(this._schema.facets, formFacet);
    page.fields = this.filter(this._schema.fields, formFacet);
    page.root = !formFacet;

    if (label) page.label = label;
    if (this.submitText) page.submitText = this.submitText;
    if (this.cancelText) page.cancelText = this.cancelText;

    return page;
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
