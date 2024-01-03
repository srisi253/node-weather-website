const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3Jpc2kyNTMiLCJhIjoiY2xxbW40N3ZrMWxybzJpczNtbXJodGM2ZSJ9.il67gWZ00h7jNWnx7Bw3wg&limit=1';

    try {
        request({ url, json: true }, (error, response) => {
            if (error) {
                callback('Unable to connect to the weather service', undefined);
            } else if (!response.body || response.body.features.length === 0) {
                callback('Unable to find location. Try another search.', undefined);
            } else {
                const { body } = response;
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                });
            }
        });
    } catch (error) {
        callback('An unexpected error occurred.', undefined);
    }
}

module.exports = geocode;
