export interface Address {
  name?: string;
  street?: string;
  city?: string;
  county?: string;
  state?: string;
  country?: string;
  postalcode?: string;
}

export interface Location {
  lon: number;
  lat: number;
};

export interface ForwardGeocodeOptions {
  address: string | Address;
  url: string;
  client?: string;
  bbox?: [number, number, number, number];
  jobId?: string;
  limit?: number;
  bounded?: boolean;
}

export interface ReverseGeocodeOptions {
  location: Location;
  url: string;
  client?: string;
  jobId?: string;
}

export interface GeocodeResponse {
  address: Address;
  bbox: [number, number, number, number];
  client?: any;
  display: string;
  jobId: string;
  location: Location;
  polygon: any;
}
