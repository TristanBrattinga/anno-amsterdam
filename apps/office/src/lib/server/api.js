import { BAG_API_KEY, API_BASE_URL, ORIGIN } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { normalizeURL } from '$utils';

// Function to normalize API base URL
const apiUrl = (path) => normalizeURL(API_BASE_URL) + path;

export const bagApi = {
    getBuildingByPostcodeAndNumber: async (postcode, huisnummer, page = 1, pageSize = 20) => {
        if (!BAG_API_KEY) {
            throw new Error('BAG API Key not configured');
        }
        const bagUrl = `https://api.bag.kadaster.nl/lvbag/individuelebevragingen/v2/adressenuitgebreid?postcode=${postcode}&huisnummer=${huisnummer}&page=${page}&pageSize=${pageSize}`;
        try {
            const res = await fetch(bagUrl, {
                method: 'GET',
                headers: {
                    'accept': 'application/hal+json',
                    'Accept-Crs': 'epsg:28992',
                    'X-Api-Key': BAG_API_KEY
                }
            });
            if (res.ok) {
                const data1 = await res.json();
                return data1._embedded.adressen[0];
            } else {
                 error(res.status, 'Failed to fetch from BAG API');
            }
        } catch (e) {
            throw error(500, e instanceof Error ? e.message : JSON.stringify(e));
        }
    },

    getBuildingBag: async (bag_id) => {
        if (!BAG_API_KEY) {
            throw new Error('BAG API Key not configured');
        }
        try {
            const res = await fetch(`https://api.bag.kadaster.nl/lvbag/individuelebevragingen/v2/adressenuitgebreid/${bag_id}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/hal+json',
                    'Accept-Crs': 'epsg:28992',
                    'X-Api-Key': BAG_API_KEY
                }
            });
            if (res.ok) {
                return await res.json();
            } else {
                error(res.status, 'Failed to fetch from BAG API');
            }
        } catch (e) {
            throw error(500, e instanceof Error ? e.message : JSON.stringify(e));
        }
    }
};

export const api = {
    getBuildings: async (limit = 100, offset = 0) => {
        try {
            const res = await fetch(apiUrl(`buildings/?limit=${limit}&offset=${offset}`));
            if (res.ok) {
                return await res.json();
            } else {
                throw error(res.status, await res.text());
            }
        } catch (e) {
            throw error(500, e instanceof Error ? e.message : JSON.stringify(e));
        }
    },

    createBuilding: async (building) => {
        try {
            const res = await fetch(apiUrl('buildings/'), {
                method: 'POST',
                headers: { origin: ORIGIN},
                body: JSON.stringify(building)
            });
            if (res.ok) {
                console.log(res.json)
                return await res.json();
            } else {
                throw error(res.status, await res.text());
            }
        } catch (e) {
            throw error(500, e instanceof Error ? e.message : JSON.stringify(e));
        }
    },

    getBuilding: async (id) => {
        try {
            const res = await fetch(apiUrl(`buildings/${id}`));
            if (res.ok) {
                return await res.json();
            } else {
                throw error(res.status, await res.text());
            }
        } catch (e) {
            throw error(500, e instanceof Error ? e.message : JSON.stringify(e));
        }
    },

    updateBuilding: async (id, building) => {
        try {
            const res = await fetch(apiUrl(`buildings/${id}`), {
                method: 'PUT',
                body: JSON.stringify(building)
            });
            if (res.ok) {
                return await res.json();
            } else {
                throw error(res.status, await res.text());
            }
        } catch (e) {
            throw error(500, e instanceof Error ? e.message : JSON.stringify(e));
        }
    },

    deleteBuilding: async (id) => {
        try {
            const res = await fetch(apiUrl(`buildings/${id}`), { method: 'DELETE' });
            if (res.ok) return;
            throw error(res.status, await res.text());
        } catch (e) {
            throw error(500, e instanceof Error ? e.message : JSON.stringify(e));
        }
    }
};
