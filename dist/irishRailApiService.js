"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStations = void 0;
const fetchAndParseXML_1 = __importDefault(require("../utils/fetchAndParseXML")); // Ensure fetchAndParseXML is also converted to TS
const API_BASE_URL = 'http://api.irishrail.ie/realtime/realtime.asmx';
async function getAllStations(stationType = '') {
    const url = `${API_BASE_URL}/getAllStationsXML${stationType ? '_WithStationType' : ''}?StationType=${stationType}`;
    return (0, fetchAndParseXML_1.default)(url);
}
exports.getAllStations = getAllStations;
async function getStationDataByName(stationName, numMins = 90) {
    const url = `${API_BASE_URL}/getStationDataByNameXML?StationDesc=${stationName}&NumMins=${numMins}`;
    return (0, fetchAndParseXML_1.default)(url);
}
// Define more functions for other API endpoints...
module.exports = {
    getAllStations,
    getStationDataByName
    // Export other functions...
};
