class StationParser {
    constructor(stationData) {
        this.stations = stationData.ArrayOfObjStation.objStation;
    }

    findStationByName(name) {
        return this.stations.find(station => station.StationDesc === name);
    }

    // Implement additional methods as needed
}

module.exports = StationParser;
