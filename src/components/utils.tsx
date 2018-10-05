export function getMap(id?: string) : HTMLGlMapElement {
  return document.querySelector((id) ? `gl-map#${id}`: 'gl-map');
}

export function getThumbnail(item) {
  if (item.image) return (
    <ion-thumbnail slot="start">
      <img src={item.image} />
    </ion-thumbnail>
  );
}

export function toArray(value: string | string[], sep=',') {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value.split(sep);
}
