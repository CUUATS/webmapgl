import { Component, Element, Listen, Prop, State } from '@stencil/core';
import { _t } from '../i18n/i18n';


@Component({
  styleUrl: 'form-page.css',
  tag: 'gl-form-page'
})
export class FormPage {
  @Element() el: HTMLElement;

  @State() canSubmit = false;

  @Prop() backText: string = _t('webmapgl.form-page.back');
  @Prop() facets: any[];
  @Prop() fields: any[];
  @Prop() formFacet: string;
  @Prop() label: string;
  @Prop() root: boolean = false;
  @Prop() submitText: string = _t('webmapgl.form-page.submit');
  @Prop() cancelText: string = _t('webmapgl.form-page.cancel');

  componentDidLoad() {
    this.updateValidationStatus();
  }

  @Listen('body:glFormFeatureChanged')
  async updateValidationStatus() {
    if (this.el.querySelectorAll('gl-field').length === 0) {
      this.canSubmit = false;
    } else {
      this.canSubmit = (await this.validate()).length === 0;
    }
  }

  async validate() {
    let messages = await Promise.all(
        Array.from(this.el.querySelectorAll('gl-field'))
      .map(async (field) => await field.validate()));

    return messages.filter((message) => message !== null);
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
        image={facet.image} widget={facet.widget}></gl-facet>));
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

  hostData() {
    return {
      class: `gl-form-page-facet-${this.formFacet || 'none'}`
    };
  }

  render() {
    let small = screen.width <= 640;
    return ([
      <ion-header>
        <ion-toolbar color="primary">
          {(!this.root) ? <ion-buttons slot="start">
            <ion-nav-pop>
              <ion-button>
                <ion-icon slot={(small) ? 'icon-only' : 'start'}
                  name="arrow-back"></ion-icon>
                {(small) ? null : this.backText}
              </ion-button>
            </ion-nav-pop>
          </ion-buttons> : null }
          <ion-title>{this.label}</ion-title>
          <ion-buttons slot="end">
            <ion-button onClick={() => this.cancel()}>
              <ion-icon slot={(small) ? 'icon-only' : 'start'}
                name="close"></ion-icon>
              {(small) ? null : this.cancelText}
            </ion-button>
            <ion-button onClick={() => { if (this.canSubmit) this.submit(); }}
                disabled={!this.canSubmit}>
              <ion-icon slot={(small) ? 'icon-only' : 'start'}
                name="checkmark"></ion-icon>
              {(small) ? null : this.submitText}
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
