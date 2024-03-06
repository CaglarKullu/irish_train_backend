import { StationType } from './types';
import {fetchAndParseXML} from '../utils/fetchAndParseXML'; 

const API_BASE_URL = 'http://api.irishrail.ie/realtime/realtime.asmx';

export interface Station   {
  StationDesc: string;
  StationAlias?: string;
  StationLatitude: string; 
  StationLongitude: string;
  StationCode: string;
  StationId: string;
}

export async function getAllStations(stationType: StationType | '' = ''): Promise<any> {
    const url = `${API_BASE_URL}/getAllStationsXML${stationType ? '_WithStationType' : ''}?StationType=${stationType}`;
    return fetchAndParseXML(url);
}
export async function getStationDataByName(stationName: String, numMins = 90) {
    const url = `${API_BASE_URL}/getStationDataByNameXML?StationDesc=${stationName}&NumMins=${numMins}`;
    return fetchAndParseXML(url);
}
export async function filterStationsByLatitude(minLatitude: number): Promise<any> {
  const stations = await getAllStations();
  return stations.objStation.filter((station:Station) => parseFloat(station.StationLatitude) > minLatitude);
}

export async function filterStationsByProximity(latitude: number, longitude: number, maxDistanceKm: number): Promise<any> {
  const stations = await getAllStations();
  return stations.objStation.filter((station:Station)  => {
      const stationLat = parseFloat(station.StationLatitude);
      const stationLon = parseFloat(station.StationLongitude);
      const distance = calculateDistance(latitude, longitude, stationLat, stationLon);
      return distance <= maxDistanceKm;
  });
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function getStationByName(stationName: string): Promise<Station | undefined> {
  const stations = await getAllStations();
  const station = stations.find((station: Station) => station.StationDesc.toLowerCase() === stationName.toLowerCase());
  return station;
}
function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}
export async function getCurrentTrains(): Promise<any> {
  // Implementation
}
// Define more functions for other API endpoints...

module.exports = {
  getAllStations,
  getStationDataByName,
  getCurrentTrains
  // Export other functions...
};
