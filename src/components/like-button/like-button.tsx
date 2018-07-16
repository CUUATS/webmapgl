import { Component, Element, Event, EventEmitter, Prop, State, Watch }
  from '@stencil/core';


@Component({
  tag: 'gl-like-button'
})
export class LikeButton {
  likeCtrl?: HTMLGlLikeControllerElement;
  remoteCtrl?: HTMLGlRemoteControllerElement;

  @Element() el: HTMLGlLikeButtonElement;

  @State() count: number = 0;
  @State() liked: boolean = false;

  @Prop({connect: 'gl-like-controller'}) lazyLikeCtrl!:
    HTMLGlLikeControllerElement;
  @Prop({connect: 'gl-remote-controller'}) lazyRemoteCtrl!:
    HTMLGlRemoteControllerElement;

  @Prop() attribute: string = '_likes';
  @Prop() disabled: boolean = false;
  @Prop({mutable: true}) feature: any;
  @Prop() iconNo: string = 'star-outline';
  @Prop() iconYes: string = 'star';
  @Prop() method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' = 'POST';
  @Prop() requestMode: RequestMode;
  @Prop() token: string;
  @Prop() url: string;

  @Event() glLike: EventEmitter;

  async componentWillLoad() {
    this.likeCtrl = await this.lazyLikeCtrl.componentOnReady();
    this.remoteCtrl = await this.lazyRemoteCtrl.componentOnReady();
    this.setState();
  }

  @Watch('feature')
  setState() {
    if (this.feature) {
      this.count = this.feature.properties[this.attribute];
      this.liked = this.likeCtrl.getLiked(this.feature);
    }
  }

  async toggle() {
    this.liked = !this.liked;
    this.count += (this.liked) ? 1 : -1;
    if (this.feature && this.feature.properties)
      this.feature.properties[this.attribute] = this.count;
    (this.liked) ? this.likeCtrl.like(this.feature) :
      this.likeCtrl.unlike(this.feature);

    // Fail silently if request fails.
    let success = false;
    try {
      await this.remoteCtrl.send({
        url: this.url,
        feature: {
          type: 'Feature',
          properties: {
            action: (this.liked) ? 'like' : 'unlike',
            feature_id: this.feature.id,
            client_id: this.likeCtrl.clientId
          }
        },
        token: this.token,
        method: this.method,
        mode: this.requestMode
      });
      success = true;
    } catch(e) {}

    this.glLike.emit({
      success: success,
      feature: this.feature,
      action: (this.liked) ? 'like' : 'unlike',
      client_id: this.likeCtrl.clientId
    });
  }

  render() {
    return (
      <ion-button fill="clear"
          onClick={() => {if (!this.disabled) this.toggle(); }}
          disabled={this.disabled}>
        <ion-icon slot="start"
          name={(this.liked) ? this.iconYes : this.iconNo}></ion-icon>
        <span class="gl-like-button-count">{this.count}</span>
      </ion-button>
    );
  }
}
