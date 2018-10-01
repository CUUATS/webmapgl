import { Component, Method, Prop } from '@stencil/core';


@Component({
  tag: 'gl-like-controller'
})
export class LikeController {
  @Prop({mutable: true}) clientId: string;
  @Prop() keyPrefix: string = 'webmapgl.like';

  async componentWillLoad() {
    if (!this.clientId) {
      this.clientId = localStorage.getItem(this.keyPrefix + '.clientId');
      if (!this.clientId) {
        this.clientId = this.makeId(64);
        localStorage.setItem(this.keyPrefix + '.clientId', this.clientId);
      }
    }
  }

  @Method()
  async getLiked(feature: any): Promise<boolean> {
    let likes = this.getArray(feature.layer);
    return likes.indexOf(feature.id) !== -1;
  }

  @Method()
  async like(feature: any) {
    let likes = this.getArray(feature.layer);
    if (likes.indexOf(feature.id) === -1) likes.push(feature.id);
    this.setArray(feature.layer, likes);
  }

  @Method()
  async unlike(feature: any) {
    let likes = this.getArray(feature.layer);
    let idx = likes.indexOf(feature.id);
    if (idx !== -1) likes.splice(idx, 1);
    this.setArray(feature.layer, likes);
  }

  makeId(length: number) {
    var id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' +
      '0123456789';

    for (let i = 0; i < length; i++)
      id += chars.charAt(Math.floor(Math.random() * chars.length));

    return id;
  }

  getLayerKey(layer: string) {
    return this.keyPrefix + '|' + document.location.pathname + '|' +
      (layer || 'default');
  }

  getArray(layer: string) {
    let str = localStorage.getItem(this.getLayerKey(layer));
    if (!str) return [];
    return str.split(',').map((v) => parseInt(v)).filter((v) => !isNaN(v));
  }

  setArray(layer: string, values: number[]) {
    let str = values.filter((v) => !isNaN(v))
      .map((v) => v.toString()).join(',');
    localStorage.setItem(this.getLayerKey(layer), str);
  }
}
