import { Component, Element, Listen, Prop, State } from '@stencil/core';
import { _t } from '../i18n/i18n';


@Component({
  styleUrl: 'form-page.scss',
  tag: 'gl-form-page'
})
export class FormPage {
  @Element() el: HTMLElement;

  @State() canSubmit = false;

  @Prop() backText: string = _t('Back');
  @Prop() facets: any[];
  @Prop() fields: any[];
  @Prop() label: string;
  @Prop() root: boolean = false;
  @Prop() submitText: string = _t('Save');
  @Prop() cancelText: string = _t('Cancel');

  componentDidLoad() {
    this.updateValidationStatus();
  }

  @Listen('glFieldValueChanged')
  async updateValidationStatus() {
    this.canSubmit = this.validate().length === 0;
  }

  validate() {
    return Array.from(this.el.querySelectorAll('gl-field'))
      .map((field) => field.validate())
      .filter((message) => message !== null);
  }

  cancel() {
    const form = this.el.closest('gl-form');
    form.cancel();
  }

  submit() {
    const form = this.el.closest('gl-form');
    form.submit();
  }

  renderFacets() {
    return this.facets.map((facet) =>
      (<gl-facet label={facet.label} value={facet.value}
        image={facet.image}></gl-facet>));
  }

  renderFields() {
    return this.fields.map((field) =>
      (<gl-field attribute={field.attribute} label={field.label}
        image={field.image} required={field.required} type={field.type}
        widget={field.widget}>{this.renderOptions(field.options)}</gl-field>));
  }

  renderOptions(options: any[]) {
    if (!options) return;
    return options.map((option) => (<gl-option image={option.image}
      label={option.label} value={option.value}></gl-option>));
  }

  render() {
    return ([
      <ion-header>
        <ion-toolbar color="primary">
          {(!this.root) ? <ion-buttons slot="start">
            <ion-nav-pop>
              <ion-button>
                <ion-icon slot="start" name="arrow-back"></ion-icon>
                {this.backText}
              </ion-button>
            </ion-nav-pop>
          </ion-buttons> : null }
          <ion-title>{this.label}</ion-title>
          <ion-buttons slot="end">
            <ion-button onClick={() => this.cancel()}>
              <ion-icon slot="start" name="close"></ion-icon>
              {this.cancelText}
            </ion-button>
            <ion-button onClick={() => this.submit()}
                disabled={!this.canSubmit}>
              <ion-icon slot="start" name="checkmark"></ion-icon>
              {this.submitText}
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,
      <ion-content>
        <ion-list>
          {this.renderFacets()}
          {this.renderFields()}
        </ion-list>
      </ion-content>
    ]);
  }
}