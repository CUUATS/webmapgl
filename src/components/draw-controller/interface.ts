export interface DrawOptions {
  type?: 'point' | 'line' | 'polygon';
  multiple?: boolean;
  combine?: boolean;
  delete?: boolean;
  mode?: 'draw' | 'simple' | 'direct';
  styles?: any[];
}
