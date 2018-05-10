import { default as dot } from 'dot';

export class Hold {
  public release: Function;
  public promise: Promise<void>;
  constructor() {
    this.promise = new Promise((resolve) => {
      this.release = resolve;
    });
  }
}

export function getThumbnail(item) {
  if (item.image) return (
    <ion-thumbnail slot="start">
      <img src={item.image} />
    </ion-thumbnail>
  );
}

export function compileTemplates(templateObj: any) {
  let compiled = {};
  for (let prop in templateObj) {
    compiled[prop] = dot.template(
      templateObj[prop], {...dot.templateSettings, varname: 'properties'});
  }
  return compiled;
}

export function toArray(value: string | string[], sep=',') {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value.split(sep);
}
