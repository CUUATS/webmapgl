export async function presentPopover(opts) {
  const popoverController = document.querySelector('ion-popover-controller');
  await popoverController.componentOnReady();
  const popoverElement = await popoverController.create(opts);
  return await popoverElement.present();
}
