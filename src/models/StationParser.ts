
interface ObjStation {
    StationDesc: string;
    StationAlias?: string;
    StationLatitude: string; // Kept as string to match your XML, but consider converting to number if appropriate
    StationLongitude: string; // Kept as string for the same reason as Latitude
    StationCode: string;
    StationId: string; // Assuming ID is a string; adjust if it's actually a numeric type
  }
  
  interface ArrayOfObjStation {
    objStation: ObjStation[];
  }
  
  export class StationParser {
    private stations: ObjStation[];
  
    constructor(stationData: ArrayOfObjStation) {
      this.stations = stationData.objStation;
    }
  
    public getAllStations(): ObjStation[] {
      return this.stations;
    }
   public findStationByName(name: string): ObjStation | undefined {
      return this.stations.find(station => station.StationDesc === name);
    }
  
    public filterStationsByLatitude(minLatitude: number): ObjStation[] {
      return this.stations.filter(station => parseFloat(station.StationLatitude) > minLatitude);
    }
  
    public listStationsWithIDs(): { id: string; name: string }[] {
      return this.stations.map(station => ({
        id: station.StationId,
        name: station.StationDesc
      }));
    }
  
    public findStationsWithinLatitudeRange(minLatitude: number, maxLatitude: number): ObjStation[] {
      return this.stations.filter(station => {
        const lat = parseFloat(station.StationLatitude);
        return lat >= minLatitude && lat <= maxLatitude;
      });
    }
  
    public filterStationsByProximity(latitude: number, longitude: number, maxDistanceKm: number): ObjStation[] {
      const earthRadiusKm = 6371; // Earth's radius in kilometers
  
      const toRadians = (degrees: number) => degrees * Math.PI / 180;
      const distanceBetweenCoordinates = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
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
  
    public findStationsWithinLatLongRange(minLatitude: number, maxLatitude: number, minLongitude: number, maxLongitude: number): ObjStation[] {
      return this.stations.filter(station => {
        const lat = parseFloat(station.StationLatitude);
        const lon = parseFloat(station.StationLongitude);
        return lat >= minLatitude && lat <= maxLatitude && lon >= minLongitude && lon <= maxLongitude;
      });
    }
  }
  