import { redirect } from '@sveltejs/kit';
import { api } from '$lib/server';

export const actions = {
    default: async (event) => {
        let form_input = await event.request.formData();
        const jsonData = Object.fromEntries(form_input.entries());
        const transformedData = parseAndTransformData(jsonData);
        let newBuilding = null;
        try {
            newBuilding = await api.createBuilding(transformedData);

            console.log('Building created:', newBuilding);


        } catch (e) {
            console.error(e);
            }
            if (newBuilding) {
                throw redirect(303, `/import/${newBuilding.id}`);
            }
    }
};


function parseAndTransformData(jsonData) {

    try {
        const rawData = jsonData;
        console.log('Raw data:', rawData); // Log raw data for debugging
        switch (rawData.gebruiksdoelen) {
            case 'woonfunctie':
                rawData.gebruiksdoelen = 'residential';
                break;
            case 'overige gebruiksfunctie':
                rawData.gebruiksdoelen = 'recreational';
                break;
            case 'kantoorfunctie':
                rawData.gebruiksdoelen = 'commercial';
                break;
            case 'bijeenkomstfunctie':
            case 'recreatiefunctie':
                rawData.gebruiksdoelen = 'recreational';
                break;
            case 'onderwijsfunctie':
                rawData.gebruiksdoelen = 'educational';
                break;
            case 'industriefunctie':
                rawData.gebruiksdoelen = 'industrial';
                break;
        }

        // Transform the incoming data to the desired format
        const transformedData = {
            bag_id: rawData.nummeraanduidingIdentificatie,
            location: {
                type: 'Point',
                coordinates: [parseFloat(rawData.Longitude), parseFloat(rawData.Latitude)]
            },
            name: rawData.korteNaam,
            address: rawData.Adres,
            construction_year: rawData.oorspronkelijkBouwjaar,
            type_of_use: rawData.gebruiksdoelen || 'residential',
            tags: rawData.tags || [],
            description: rawData.description || '',
            image_urls: rawData.image || [],
            timeline: rawData.timeline || [],
            active: false,
            created_at: new Date().toISOString(),
        };

        return transformedData;
    } catch (error) {
        console.error('Error parsing and transforming data:', error);
        return null;
    }
}

