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

  setFacet() {
    this.glFormFacet.emit({
      label: this.label,
      value: this.value
    });
  }

  render() {
    return (
      <ion-item button={true} onClick={() => this.setFacet()}
          detail={this.detail}>
        {getThumbnail(this)}
        {this.label}
      </ion-item>
    );
  }
}
