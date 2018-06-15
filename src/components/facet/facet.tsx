import { Component, Element, Event, EventEmitter, Prop } from '@stencil/core';
import { getThumbnail } from '../utils';


@Component({
  tag: 'gl-facet'
})
export class Facet {
  @Element() el: HTMLGlFacetElement;

  @Event() glFormFacet: EventEmitter;

  @Prop() detail: boolean = true;
  @Prop() image: string;
  @Prop() label: string;
  @Prop() value: string;
  @Prop() widget: 'header' | 'item' = 'item';

  setFacet() {
    this.glFormFacet.emit({
      label: this.label,
      value: this.value
    });
  }

  render() {
    if (this.widget === 'header')
      return (<ion-list-header>{this.label}</ion-list-header>);

    return (
      <ion-item button={true} onClick={() => this.setFacet()}
          detail={this.detail} text-wrap>
        {getThumbnail(this)}
        <ion-label>{this.label}</ion-label>
      </ion-item>
    );
  }
}
