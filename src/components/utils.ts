export function getMap(el: HTMLElement) {
  while (el) {
    if (el.tagName === 'GL-MAP') return el;
    (el as any) = el.parentNode;
  }
}

export function addMapEventHandler(
    el: HTMLElement, eventName: string, handler: any) {
  let map = getMap(el);
  if (!map) return;
  map.addEventListener(eventName, handler);
}

export async function presentPopover(opts) {
  const popoverController = document.querySelector('ion-popover-controller');
  await popoverController.componentOnReady();
  const popoverElement = await popoverController.create(opts);
  return await popoverElement.present();
}
