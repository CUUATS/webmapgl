export async function presentModal(contentEl: HTMLElement) {
  const modalController = document.querySelector('ion-modal-controller');
  await modalController.componentOnReady();

  const modalElement = await modalController.create({
    component: contentEl
  });
  modalElement.present();
}

export async function presentPopover(opts) {
  const popoverController = document.querySelector('ion-popover-controller');
  await popoverController.componentOnReady();
  const popoverElement = await popoverController.create(opts);
  return await popoverElement.present();
}

export function eachStyleJSON(fn: Function) {
  return Promise.all(
    Array.from(document.querySelectorAll('gl-style'))
      .map(async (style) => {
        await style.componentOnReady();
        let json = await style.getJSON();
        if (json) return fn(json, style);
      })
  );
}

export function eachStyleMetadata(key: string, fn: Function) {
  return eachStyleJSON(async (json, style) => {
    let metadata = json.metadata;
    if (!metadata) return;
    let meta = metadata['webmapgl:' + key];
    if (meta) return fn(meta, json, style);
  });
}

export class Hold {
  public release: Function;
  public promise: Promise<void>;
  constructor() {
    this.promise = new Promise((resolve) => {
      this.release = resolve;
    });
  }
}
