class StationParser {
    constructor(stationData) {
        this.stations = stationData.ArrayOfObjStation.objStation;
    }

    findStationByName(name) {
        return this.stations.find(station => station.StationDesc === name);
    }

    filterStationsByLatitude(minLatitude) {
        return this.stations.filter(station => parseFloat(station.StationLatitude) > minLatitude);
    }

    listStationsWithIDs() {
        return this.stations.map(station => ({
            id: station.StationId,
            name: station.StationDesc
        }));
    }

    findStationsWithinLatitudeRange(minLatitude, maxLatitude) {
        return this.stations.filter(station => {
            const lat = parseFloat(station.StationLatitude);
            return lat > minLatitude && lat < maxLatitude;
        });
    }

    filterStationsByProximity(latitude, longitude, maxDistanceKm) {
        const earthRadiusKm = 6371; // Earth's radius in kilometers

        const toRadians = degrees => degrees * Math.PI / 180;
        const distanceBetweenCoordinates = (lat1, lon1, lat2, lon2) => {
            const dLat = toRadians(lat2 - lat1);
            const dLon = toRadians(lon2 - lon1);

            const a = 
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return earthRadiusKm * c;
        };

        return this.stations.filter(station => {
            const stationLat = parseFloat(station.StationLatitude);
            const stationLon = parseFloat(station.StationLongitude);
            const distance = distanceBetweenCoordinates(latitude, longitude, stationLat, stationLon);
            return distance <= maxDistanceKm;
        });
    }
}

module.exports = StationParser;

