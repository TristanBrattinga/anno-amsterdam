// src/routes/api/proxy/+server.js

import { json, text } from '@sveltejs/kit';

export const GET = async ({ url }) => {
    const coordinate1 = url.searchParams.get('coordinate1');
    const coordinate2 = url.searchParams.get('coordinate2');
    const format = url.searchParams.get('format') || 'text';

    const externalUrl = `http://www.regiolab-delft.nl/road_mapping/rd_wgs84.cgi?coordinate1=${coordinate1}&coordinate2=${coordinate2}&format=${format}&retrieve=Submit+query`;

    try {
        const response = await fetch(externalUrl, {
            method: 'GET',
        });

        if (!response.ok) {
            return text('Failed to fetch from external API', { status: response.status });
        }

        const data = await response.text(); // Get plain text response
        return text(data);
    } catch (error) {
        return text('An error occurred', { status: 500 });
    }
};
