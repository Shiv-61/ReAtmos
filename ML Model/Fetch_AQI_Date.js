const token = "a9cdc68cda4ad88d3377ea30f8f7d0669f84f741";
const customIP = "103.212.158.106"; // Replace with the custom IP you want to check

// Step 1: Get Latitude & Longitude for the custom IP
// We use 'ip-api.com' (Free, no key required) for this example
fetch(`http://ip-api.com/json/${customIP}`)
  .then((response) => response.json())
  .then((geoData) => {
    if (geoData.status === "fail") {
      throw new Error(`IP Lookup failed: ${geoData.message}`);
    }

    const lat = geoData.lat;
    const lon = geoData.lon;
    console.log(
      `Location detected: ${geoData.city}, ${geoData.country} (${lat}, ${lon})`
    );

    // Step 2: Get AQI for those coordinates
    // Notice the syntax: geo:lat;lon
    const waqiUrl = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${token}`;

    return fetch(waqiUrl);
  })
  .then((response) => response.json())
  .then((aqiData) => {
    if (aqiData.status === "ok") {
      console.log(`--- AQI Data for ${customIP} ---`);
      console.log(`Station: ${aqiData.data.city.name}`);
      console.log(`AQI: ${aqiData.data.aqi}`);
      console.log(`Dominant Pollutant: ${aqiData.data.dominentpol}`);
    } else {
      console.log("WAQI Error:", aqiData.data);
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
