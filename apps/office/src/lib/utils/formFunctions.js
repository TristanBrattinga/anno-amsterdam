export function parseAndTransformData(jsonData) {

    try {
        const rawData = jsonData;
        console.log('Raw data:', rawData); // Log raw data for debugging
        switch (rawData.gebruiksdoelen) {
            case 'woonfunctie':
                rawData.gebruiksdoelen = 'residential';
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

export function createTimeline(jsonData) {
    // Initialize an empty timeline array
    const timeline = [];

    // Iterate through the formData object
    for (const key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
            // Match the key to extract the index and type (year or description)
            const match = key.match(/timeline(Year|Description)(\d+)/);
            if (match) {
                console.log(`{$match} match`)
                const type = match[1].toLowerCase(); // 'year' or 'description'
                const index = match[2]; // The index number

                // Ensure the timeline object for this index exists
                if (!timeline[index]) {
                    timeline[index] = {};
                }

                // Assign the value to the appropriate property
                timeline[index][type] = jsonData[key];
            }
        }
    }

    // Remove any undefined items (if indexes were not sequential)
    console.log(timeline);
    return timeline.filter(entry => entry !== undefined);
}