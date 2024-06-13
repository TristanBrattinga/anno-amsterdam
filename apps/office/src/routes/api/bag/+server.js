import { bagApi } from '$lib/server/api.js';
import { json } from '@sveltejs/kit';

export const GET = async ({ url }) => {
  const postcode = url.searchParams.get('postcode');
  const huisnummer = url.searchParams.get('huisnummer');
  const bag_id = url.searchParams.get('bag_id');

  if (postcode && huisnummer) {
    try {
      const data = await bagApi.getBuildingByPostcodeAndNumber(postcode, huisnummer);
      return json(data);
    } catch (err) {
      return json({ error: err.message }, { status: 500 });
    }
  } else if (bag_id) {
    try {
      const data = await bagApi.getBuildingBag(bag_id);
      return json(data);
    } catch (err) {
      return json({ error: err.message }, { status: 500 });
    }
  } else {
    return json({ error: 'Missing parameters' }, { status: 400 });
  }
};
