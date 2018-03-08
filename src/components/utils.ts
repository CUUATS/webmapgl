export async function presentPopover(opts) {
  const popoverController = document.querySelector('ion-popover-controller');
  await popoverController.componentOnReady();
  const popoverElement = await popoverController.create(opts);
  return await popoverElement.present();
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
