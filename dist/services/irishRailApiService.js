import { fetchAndParseXML } from '../utils/fetchAndParseXML.js';
const API_BASE_URL = 'http://api.irishrail.ie/realtime/realtime.asmx';
/**
 * Retrieves all stations of the specified type or all stations if no type is provided.
 *
 * @param {StationType | ''} stationType - the type of station to retrieve, defaults to an empty string
 * @return {Promise<ArrayOfObjStation>} an array of station objects
 */
export async function getAllStations(stationType = '') {
    const url = `${API_BASE_URL}/getAllStationsXML${stationType ? '_WithStationType' : ''}?StationType=${stationType}`;
    return fetchAndParseXML(url);
}
/**
 * Retrieves station data by name.
 *
 * @param {String} stationName - the name of the station
 * @param {number} numMins - the number of minutes for which to retrieve data (default is 90)
 * @return {Promise<any>} a promise that resolves to the parsed XML data
 */
export async function getStationDataByName(stationName, numMins = 90) {
    const url = `${API_BASE_URL}/getStationDataByNameXML?StationDesc=${stationName}&NumMins=${numMins}`;
    return fetchAndParseXML(url);
}
/**
 * Filter stations by latitude.
 *
 * @param {number} minLatitude - the minimum latitude for filtering
 * @return {Promise<any>} a promise that resolves to the filtered stations
 */
export async function filterStationsByLatitude(minLatitude) {
    const stations = await getAllStations();
    return stations.objStation.filter((station) => parseFloat(station.StationLatitude) > minLatitude);
}
/**
 * Filters stations by proximity using given latitude, longitude, and maximum distance.
 *
 * @param {number} latitude - The latitude of the location
 * @param {number} longitude - The longitude of the location
 * @param {number} maxDistanceKm - The maximum distance in kilometers
 * @return {Promise<any>} The filtered stations within the maximum distance
 */
export async function filterStationsByProximity(latitude, longitude, maxDistanceKm) {
    const stations = await getAllStations();
    return stations.objStation.filter((station) => {
        const stationLat = parseFloat(station.StationLatitude);
        const stationLon = parseFloat(station.StationLongitude);
        const distance = calculateDistance(latitude, longitude, stationLat, stationLon);
        return distance <= maxDistanceKm;
    });
}
/**
 * Calculates the distance between two geographical coordinates using the Haversine formula.
 *
 * @param {number} lat1 - The latitude of the first coordinate
 * @param {number} lon1 - The longitude of the first coordinate
 * @param {number} lat2 - The latitude of the second coordinate
 * @param {number} lon2 - The longitude of the second coordinate
 * @return {number} The distance between the two coordinates in kilometers
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
/**
 * Converts degrees to radians.
 *
 * @param {number} deg - The degree value to be converted to radians
 * @return {number} The corresponding radian value
 */
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}
/**
 * Retrieves a station by name.
 *
 * @param {string} stationName - the name of the station to retrieve
 * @return {Promise<Station | undefined>} the station object if found, undefined otherwise
 */
export async function getStationByName(stationName) {
    const stations = await getAllStations();
    const station = stations.objStation.find((station) => station.StationDesc.toLowerCase() === stationName.toLowerCase());
    return station;
}
export async function getCurrentTrains() {
    // Implementation
}
// Define more functions for other API endpoints...
