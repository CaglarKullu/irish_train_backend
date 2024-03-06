import { fetchAndParseXML } from '../utils/fetchAndParseXML';
const API_BASE_URL = 'http://api.irishrail.ie/realtime/realtime.asmx';
export async function getAllStations(stationType = '') {
    const url = `${API_BASE_URL}/getAllStationsXML${stationType ? '_WithStationType' : ''}?StationType=${stationType}`;
    return fetchAndParseXML(url);
}
async function getStationDataByName(stationName, numMins = 90) {
    const url = `${API_BASE_URL}/getStationDataByNameXML?StationDesc=${stationName}&NumMins=${numMins}`;
    return fetchAndParseXML(url);
}
// Define more functions for other API endpoints...
module.exports = {
    getAllStations,
    getStationDataByName
    // Export other functions...
};
