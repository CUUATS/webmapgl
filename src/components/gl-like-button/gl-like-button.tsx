import { Component, Prop, State } from '@stencil/core';


@Component({
  tag: 'gl-like-button'
})
export class GLLikeButton {
  likeCtrl?: HTMLGlLikeControllerElement;

  @Prop({connect: 'gl-like-controller'}) lazyLikeCtrl!:
    HTMLGlLikeControllerElement;
  @Prop() feature: any;
  @Prop() iconNo: string = 'star-outline';
  @Prop() iconYes: string = 'star';

  @State() count: number = 0;
  @State() liked: boolean = false;

  async componentWillLoad() {
    this.likeCtrl = await this.lazyLikeCtrl.componentOnReady();
    this.count = this.likeCtrl.getCount(this.feature);
    this.liked = this.likeCtrl.getLiked(this.feature);
  }

  async toggle() {
    this.liked = !this.liked;
    this.count += (this.liked) ? 1 : -1;
    (this.liked) ? this.likeCtrl.like(this.feature) :
      this.likeCtrl.unlike(this.feature);
  }

  render() {

    return (
      <ion-button fill="clear" onClick={() => this.toggle()}>
        <ion-icon slot="start"
          name={(this.liked) ? this.iconYes : this.iconNo}></ion-icon>
        <span class="gl-like-button-count">{this.count}</span>
      </ion-button>
    );
  }
}
