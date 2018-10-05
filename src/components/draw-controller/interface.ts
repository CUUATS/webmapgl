export interface DrawOptions {
  combine?: boolean;
  delete?: boolean;
  mapId?: string;
  mode?: 'draw' | 'simple' | 'direct';
  multiple?: boolean;
  styles?: any[];
  toolbarLabel?: string;
  type?: 'point' | 'line' | 'polygon';
}
