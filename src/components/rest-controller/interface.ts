export interface RestOptions {
  url: string;
  token?: string;
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  mode?: RequestMode;
}
