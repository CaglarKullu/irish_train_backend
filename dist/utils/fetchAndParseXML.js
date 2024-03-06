import axios from 'axios';
import { parseStringPromise } from 'xml2js';
async function fetchAndParseXML(url) {
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
        return result.ArrayOfObjStation;
    }
    catch (error) {
        console.error('Error fetching or parsing XML:', error);
        throw error; // Rethrow to handle it in the calling context
    }
}
// Helper function to remove namespace prefixes (if present)
function removeNamespace(tagName) {
    return tagName.split(':').pop() || tagName;
}
export { fetchAndParseXML };
