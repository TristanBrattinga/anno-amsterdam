import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

export async function POST({ request }) {
  try {
    // Read the existing data from data.json
    const dataFilePath = path.join(process.cwd(), 'static', '/data/data.json');
    const existingData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

    // Parse the incoming data from the request and transform it
    const newData = await parseAndTransformData(request);

    // Check if there is an entry with the same data already
    const duplicateEntry = existingData.some(entry => entry._id === newData._id);

    if (duplicateEntry) {
      return json({ success: false, error: 'Duplicate entry' }, { status: 400 });
    }

    // Add the new entry to the existing data
    existingData.push(newData);

    // Write the updated data back to data.json
    fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2), 'utf-8');

    return json({ success: true });
  } catch (error) {
    console.error('Error adding entry to data.json:', error);
    return json({ success: false, error: 'Failed to add entry to data.json' }, { status: 500 });
  }
}

async function parseAndTransformData(request) {
  try {
    const rawData = await request.json();
    console.log('Raw data:', rawData); // Log raw data for debugging
    if (rawData.gebruiksdoelen === 'woonfunctie') {
      rawData.gebruiksdoelen = 'residential';
    } else if(rawData.gebruiksdoelen === 'overige gebruiksfunctie') {
      rawData.gebruiksdoelen = 'recreational';
    }
    else if(rawData.gebruiksdoelen === 'kantoorfunctie') {
        rawData.gebruiksdoelen = 'commercial';
    }
    else if(rawData.gebruiksdoelen === 'bijeenkomstfunctie' || rawData.gebruiksdoelen === 'recreatiefunctie') {
        rawData.gebruiksdoelen = 'recreational';
    }
    else if(rawData.gebruiksdoelen === 'onderwijsfunctie') {
        rawData.gebruiksdoelen = 'educational';
    }
    else if(rawData.gebruiksdoelen === 'industriefunctie'){
        rawData.gebruiksdoelen = 'industrial';
    }


    // Transform the incoming data to the desired format
    const transformedData = {
      _id: rawData.nummeraanduidingIdentificatie,
      location: {
        type: 'Point',
        coordinates: [rawData.Longitude, rawData.Latitude]
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
    throw new Error('Failed to parse and transform data');
  }
}


