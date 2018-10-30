import { Component, Element, Event, EventEmitter, Prop, State, Watch }
  from '@stencil/core';
import { LikeProxy } from '../like-controller/like-proxy';


@Component({
  tag: 'gl-like-button'
})
export class LikeButton {
  @Element() el: HTMLGlLikeButtonElement;

  @State() count: number = 0;
  @State() liked: boolean = false;
  @State() proxy: LikeProxy;

  @Prop({connect: 'gl-like-controller'}) likeCtrl!:
    HTMLGlLikeControllerElement;
  @Prop({connect: 'gl-rest-controller'}) restCtrl!:
    HTMLGlRestControllerElement;

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
    await this.setState();
  }

  @Watch('feature')
  async setState() {
    if (this.feature) {
      this.count = this.feature.properties[this.attribute];
      this.proxy = await this.likeCtrl.create(this.feature);
      this.liked = this.proxy.isLiked();
    }
  }

  async toggle() {
    this.liked = !this.liked;
    this.count += (this.liked) ? 1 : -1;
    if (this.feature && this.feature.properties)
      this.feature.properties[this.attribute] = this.count;
    (this.liked) ? this.proxy.like() : this.proxy.unlike();

    // Fail silently if request fails.
    let success = false;
    let clientId = this.proxy.getClientId();
    try {
      await this.restCtrl.create({
        type: 'Feature',
        properties: {
          action: (this.liked) ? 'like' : 'unlike',
          feature_id: this.feature.id,
          client_id: clientId
        }
      }, {
        url: this.url,
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
      client_id: clientId
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
