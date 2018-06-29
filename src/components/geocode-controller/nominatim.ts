import { ForwardGeocodeOptions, ReverseGeocodeOptions, GeocodeResponse }
  from './geocode-interface';


export class NominatimClient {
  async forward(options: ForwardGeocodeOptions, clientOptions?: any) {
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

    return this.formatResponse(res, options.jobId, 'forward');
  }

  async reverse(options: ReverseGeocodeOptions, clientOptions?: any) {
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

    return this.formatResponse(res, options.jobId, 'reverse');
  }

  formatResponse(res: any, jobId: string, queryType: string) {
    console.log(res, jobId, queryType);
    return res.map((item) => {
      let gr: GeocodeResponse = {
        address: {
          name: item.address[item.type] ||
            item.address[item.type + '_number'] || null,
          street: item.address.road || null,
          city: item.address.city || null,
          county: item.address.county || null,
          state: item.address.state || null,
          country: item.address.country || null,
          postalcode: item.address.postcode || null
        },
        bbox: (item.boundingbox) ?
          item.boundingbox.map((coord) => parseFloat(coord)) : null,
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
