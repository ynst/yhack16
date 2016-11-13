/**
 * Code sample for accessing Location Intelligence GeoLife API. This java scripts functions demonstrates the capability of Location Intelligence GeoLife API 
 * with the XML and JSON format.
 */


var LOCATION_INTELLIGENCE_SERVER_URL="https://api.pitneybowes.com/location-intelligence/geolife/v1/demographics/";

var fuck = false;
/**
 * Returns GeoLife Variables by address in XML or JSON formats
 * @param responseType
 * @param address
 * @param filter
 * @param profile
 * @param country
 */
function getGeoLifeByAddress(responseType, address, filter, profile, country){
	var xhr = new XMLHttpRequest();
	var apiUrl = 'byaddress?address=' + address;
	if (filter!= null && filter != undefined){
		apiUrl += '&filter=' + filter;
	}
	if (profile!= null && profile != undefined){
		apiUrl += '&profile=' + profile;
	}
	if (country!= null && country != undefined){
		apiUrl += '&country=' + country;
	}
    apiUrl += '&dataType=json';
	xhr.open('GET', LOCATION_INTELLIGENCE_SERVER_URL + apiUrl);
	if (responseType=='XML'){
		xhr.setRequestHeader('Content-type', 'application/xml');
		xhr.setRequestHeader('Accept', 'application/xml');
	}
	else if (responseType=='JSON'){
		xhr.setRequestHeader('Content-type', 'application/json');
		xhr.setRequestHeader('Accept', 'application/json');
	}
    xhr.setRequestHeader('Authorization','Bearer vDfbowthiMAPdTTi12XiAUVpCq2S');

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            processResponse(xhr.responseText);
        }
    }
	xhr.send(null);
	return true;		
}
var json_obj;
function processResponse(responseText){
   console.log(responseText);
    json_obj = JSON.parse(responseText);
   // console.log(json_obj["boundaries"]);
    fuck = true;
}



