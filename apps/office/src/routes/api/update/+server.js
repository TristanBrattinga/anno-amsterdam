import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'static', '/data/data.json');

// Helper function to read the data file
function readDataFile() {
  try {
    const data = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data file:', error);
    throw new Error('Failed to read data file');
  }
}

// Helper function to write to the data file
function writeDataFile(data) {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to data file:', error);
    throw new Error('Failed to write to data file');
  }
}

// Helper function to parse and transform request data
async function parseAndTransformData(request) {
  try {
    const rawData = await request.json();

    // Transform the incoming data to the desired format
    return {
      _id: rawData.Nummeraanduidingidentificatie,
      location: {
        type: 'Point',
        coordinates: [rawData.Longitude, rawData.Latitude],
      },
      name: rawData.Naam,
      address: rawData.Adres,
      construction_year: rawData.Oorspronkelijk_bouwjaar,
      type_of_use: rawData.Gebruiksdoel || 'residential', // default to 'residential' if not provided
      tags: rawData.tags || [],
      description: rawData.description || '',
      image_urls: rawData.image || [], // default to an empty array if not provided
      timeline: rawData.timeline || [], // default to an empty array if not provided
      active: false, // default to false
      updated_at: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error parsing and transforming data:', error);
    throw new Error('Failed to parse and transform data');
  }
}

// API handler for POST requests
export async function POST({ request }) {
  try {
    // Read the existing data
    const existingData = readDataFile();

    // Parse and transform the incoming data
    const newData = await parseAndTransformData(request);

    // Check if the entry already exists
    const entryIndex = existingData.findIndex(entry => entry._id === newData._id);

    if (entryIndex !== -1) {
      // Update the existing entry
      existingData[entryIndex] = { ...existingData[entryIndex], ...newData };
    } else {
      // Add the new entry
      existingData.push(newData);
    }

    // Write the updated data back to the file
    writeDataFile(existingData);

    return json({ success: true });
  } catch (error) {
    console.error('Error processing request:', error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}
