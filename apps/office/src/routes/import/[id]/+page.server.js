import path from "path";
import fs from "fs";
import Papa from "papaparse";

export async function load({ params }) {
  try {
    const dataFilePath = path.join(process.cwd(), 'static', 'data', 'data.json');
    const csvFilePath = path.join(process.cwd(), 'static', 'data', 'bag-database.csv');

    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    const ownMatch = data.find((item) => item._id === params.id);
    // Fetch and parse CSV file
    const csvText = fs.readFileSync(csvFilePath, 'utf-8');
    let bagData;
    Papa.parse(csvText, {
      header: true,
      complete: function (results) {
        bagData = results.data;
      },
      error: function (error) {
        console.error("Error parsing CSV:", error);
      },
    });

    const match = bagData.find((item) => item.Nummeraanduidingidentificatie === params.id);
    // Find corresponding entry in bagData using match._id or Nummeraanduidingidentificatie
    console.log(match)

    return { match, ownMatch  }; // Return the matched data and parsed CSV data
  } catch (error) {
    console.error("Error loading data:", error);
    return { match: null, bagData: null }; // Return null or an empty object if there's an error
  }
}
