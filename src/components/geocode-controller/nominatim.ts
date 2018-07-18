import { ForwardGeocodeOptions, ReverseGeocodeOptions, GeocodeResponse }
  from './geocode-interface';


export class NominatimClient {
  async forward(options: ForwardGeocodeOptions, clientOptions: any = {}) {
    let params = {
      format: 'jsonv2',
      addressdetails: clientOptions.addressdetails || '1'
    };

    if (clientOptions.countrycodes)
      params['countrycodes'] = clientOptions.countrycodes;

    if (typeof options.address === 'string') {
      params['q'] = options.address;
    } else {
      Object.assign(params, options.address);
    }

    if (options.bbox) params['viewbox'] = options.bbox.join(',');
    if (options.bounded) params['bounded'] = '1';
    if (options.limit) params['limit'] = options.limit;

    let res = await fetch(this.addParams(options.url, params), {
      mode: clientOptions.mode || 'cors'
    });
    let json = await res.json();

    return this.formatResponse(json, options.jobId);
  }

  async reverse(options: ReverseGeocodeOptions, clientOptions: any = {}) {
    let params = {
      format: 'jsonv2',
      addressdetails: clientOptions.addressdetails || '1',
      zoom: clientOptions.zoom || '18'
    };

    params['lon'] = options.location.lon.toString();
    params['lat'] = options.location.lat.toString();

    let res = await fetch(this.addParams(options.url, params), {
      mode: clientOptions.mode || 'cors'
    });
    let json = await res.json();

    return this.formatResponse(json, options.jobId);
  }

  formatResponse(res: any, jobId: string) {
    return res.map((item) => {
      let bbox = null;
      if (item.boundingbox) {
        let coords = item.boundingbox.map((coord) => parseFloat(coord));
        bbox = [coords[2], coords[0], coords[3], coords[1]];
      }
      let gr: GeocodeResponse = {
        address: {
          name: item.address[item.type] || item.address[item.category] || null,
          housenumber: item.address.house_number || null,
          street: item.address.road || null,
          city: item.address.city || null,
          county: item.address.county || null,
          state: item.address.state || null,
          country: item.address.country || null,
          countrycode: item.address.country_code || null,
          postalcode: item.address.postcode || null
        },
        bbox: bbox,
        client: {
          osm_id: item.osm_id || null,
          osm_type: item.osm_type || null,
          category: item.category || null,
          type: item.type || null,
          importance: item.importance || null,
          place_id: item.place_id || null,
          place_rank: item.place_rank || null
        },
        display: item.display_name || null,
        jobId: jobId,
        location: {
          lon: parseFloat(item.lon),
          lat: parseFloat(item.lat)
        },
        polygon: item.geojson || null
      };
      return gr;
    });
  }

  addParams(endpoint: string, params: any) {
    let url = new URL(endpoint);
    Object.keys(params)
      .forEach(key => url.searchParams.append(key, params[key]));
    return url.toString();
  }
}
