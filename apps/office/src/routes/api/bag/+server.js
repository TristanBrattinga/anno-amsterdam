import {BAG_API_KEY} from "$env/static/private";
import { json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
  const postcode = url.searchParams.get('postcode');
  const huisnummer = url.searchParams.get('huisnummer');
  const page = url.searchParams.get('page') || 1;
  const pageSize = url.searchParams.get('pageSize') || 20;

  if (!BAG_API_KEY) {
    return json({ error: 'BAG API Key not configured' }, { status: 500 });
  }
  const bagUrl = `https://api.bag.kadaster.nl/lvbag/individuelebevragingen/v2/adressenuitgebreid?postcode=${postcode}&huisnummer=${huisnummer}&page=${page}&pageSize=${pageSize}`;
  try {
    const response = await fetch(bagUrl, {
      method: 'GET',
      headers: {
        'accept': 'application/hal+json',
        'Accept-Crs': 'epsg:28992',
        'X-Api-Key': BAG_API_KEY
      }
    });

    if (!response.ok) {

      return json({ error: 'Failed to fetch from BAG API', response: response }, { status: response.status });
    }

    const data1 = await response.json();
    const data = data1._embedded.adressen[0]
    return json(data);
  } catch (error) {
    return json({ error: 'An error occurred' }, { status: 500 });
  }
};

