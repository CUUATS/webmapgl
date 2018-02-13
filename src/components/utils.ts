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
