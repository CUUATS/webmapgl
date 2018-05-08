import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'gl-feature-list-item'
})
export class FeatureListItem {
  @Prop() template: any;
  @Prop() feature: any;
  @Prop() layer: string;
  @Prop() like: boolean = true;

  render() {
    let content = [];
    const props = this.feature.properties;
    const template = this.template;

    if (template.image)
      content.push(
        <ion-avatar><img src={template.image(props)} /></ion-avatar>);

    if (template.title) content.push(<h2>{template.title(props)}</h2>);
    if (template.body) content.push(
      <div class="gl-feature-list-item-content"
        innerHTML={template.body(props)}></div>
    );

    if (this.like) content.push(
      <gl-like-button slot="end" feature-id={this.feature.id}>
      </gl-like-button>);

    return (
      <ion-item>{content}</ion-item>
    );
  }
}
