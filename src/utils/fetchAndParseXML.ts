import axios from 'axios';
import { parseStringPromise } from 'xml2js';

// Define an interface for the function's return type if you know the structure of the XML data
// For example, if your XML data is converting to a specific JSON format, you can define that structure here
// This is a basic and very generic example; you should replace it with your actual data structure
interface ObjStation {
    StationDesc: string;
    StationAlias?: string; // Optional since some tags are empty
    StationLatitude: number;
    StationLongitude: number;
    StationCode: string;
    StationId: number;
  }
  
  interface ArrayOfObjStation {
    objStation: ObjStation[];
  }

  async function fetchAndParseXML(url: string): Promise<any> {
    try {
      const response = await axios.get(url, { responseType: 'text' });
      const xmlData = response.data;
      // Use xml2js to parse the XML data
      const result = await parseStringPromise(xmlData, {
        explicitArray: false,
        // Necessary due to the XML namespace that may prevent straightforward parsing
        tagNameProcessors: [removeNamespace],
        ignoreAttrs: true // Ignore attributes like xmlns:xsi, etc.
      });
      // Assuming the root element directly contains the objStation array
      return result.ArrayOfObjStation as ArrayOfObjStation;
    } catch (error) {
      console.error('Error fetching or parsing XML:', error);
      throw error; // Rethrow to handle it in the calling context
    }
  }
  
  // Helper function to remove namespace prefixes (if present)
  function removeNamespace(tagName: string): string {
    return tagName.split(':').pop() || tagName;
  }
  
  export { fetchAndParseXML };
