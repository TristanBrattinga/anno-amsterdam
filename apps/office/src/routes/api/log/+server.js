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
    const duplicateEntry = existingData.some(entry =>
      entry._id === newData._id
    );

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

    // Transform the incoming data to the desired format
    const transformedData = {
      _id: rawData.Nummeraanduidingidentificatie,
      location: {
        type: 'Point',
        coordinates: [rawData.Longitude, rawData.Latitude]
      },
      name: rawData.Naam,
      address: rawData.Adres,
      construction_year: rawData.Oorspronkelijk_bouwjaar,
      type_of_use: rawData.Gebruiksdoel || 'residential', // default to 'residential' if not provided ("residential" "commercial" "industrial" "educational" "recreational")
      tags: rawData.tags || [],
      description: rawData.description || '',
      image_urls: rawData.image || [], // default to an empty array if not provided
      timeline: rawData.timeline || [], // default to an empty array if not provided
      active: false, // default to false
    };

    return transformedData;
  } catch (error) {
    console.error('Error parsing and transforming data:', error);
    throw new Error('Failed to parse and transform data');
  }
}
