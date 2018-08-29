export interface RemoteOptions {
  url: string;
  feature: any;
  token?: string;
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  mode?: RequestMode;
}
