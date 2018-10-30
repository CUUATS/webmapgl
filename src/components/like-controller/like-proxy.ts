import { LikeOptions } from './interface';

export class LikeProxy {
  feature: any;
  options: LikeOptions;

  constructor(feature: any, options: LikeOptions = {}) {
    this.feature = feature;
    if (!options.keyPrefix) options.keyPrefix = 'webmapgl.like';
    if (!options.clientId) {
      options.clientId = localStorage.getItem(options.keyPrefix + '.clientId');
      if (!options.clientId) {
        options.clientId = this.makeId(64);
        localStorage.setItem(options.keyPrefix + '.clientId', options.clientId);
      }
    }
    this.options = options;
  }

  public getClientId() {
    return this.options.clientId;
  }

  public isLiked(): boolean {
    let likes = this.getArray(this.feature.layer);
    return likes.indexOf(this.feature.id) !== -1;
  }

  public like() {
    let likes = this.getArray(this.feature.layer);
    if (likes.indexOf(this.feature.id) === -1) likes.push(this.feature.id);
    this.setArray(this.feature.layer, likes);
  }

  public unlike() {
    let likes = this.getArray(this.feature.layer);
    let idx = likes.indexOf(this.feature.id);
    if (idx !== -1) likes.splice(idx, 1);
    this.setArray(this.feature.layer, likes);
  }

  protected makeId(length: number) {
    var id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' +
      '0123456789';

    for (let i = 0; i < length; i++)
      id += chars.charAt(Math.floor(Math.random() * chars.length));

    return id;
  }

  protected getLayerKey(layer: string) {
    return this.options.keyPrefix + '|' + document.location.pathname + '|' +
      (layer || 'default');
  }

  protected getArray(layer: string) {
    let str = localStorage.getItem(this.getLayerKey(layer));
    if (!str) return [];
    return str.split(',').map((v) => parseInt(v)).filter((v) => !isNaN(v));
  }

  protected setArray(layer: string, values: number[]) {
    let str = values.filter((v) => !isNaN(v))
      .map((v) => v.toString()).join(',');
    localStorage.setItem(this.getLayerKey(layer), str);
  }
}
